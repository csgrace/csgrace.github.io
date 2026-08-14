import numpy as np
import random
import time
from math import sqrt, log

# ================== 配置开关（逐项可关闭测试差异） ==================
ENABLE_DYNAMIC_CORNER      = True
ENABLE_DYNAMIC_FLIP_WEIGHT = True
ENABLE_MOBILITY_EVAL       = True
ENABLE_FRONTIER_EVAL       = True
ENABLE_PARITY_EVAL         = True
ENABLE_MOVE_CACHE          = True
ENABLE_ROLLOUT_EARLY_STOP  = True
ENABLE_AB_ITERATIVE        = True
ENABLE_PHASED_PROG_BIAS    = True

# ================== 常量与参数 ==================
COLOR_BLACK = -1
COLOR_WHITE = 1
COLOR_NONE  = 0
random.seed(0)

DIRECTIONS = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]

HARD_LIMIT_SECONDS = 5.0
TIME_BUFFER = 0.20

UCB_C_EARLY = 1.6
UCB_C_MID   = 1.2
UCB_C_LATE  = 0.8

PROG_BIAS_K_BASE = 0.40  # 基础强度（后面按阶段缩放）

ROLLOUT_EPS_EARLY = 0.10
ROLLOUT_EPS_MID   = 0.06
ROLLOUT_EPS_LATE  = 0.03

POS_MAT = np.array([
    [200, -40,  20,  10,  10,  20, -40, 200],
    [-40, -80,  -5,  -5,  -5,  -5, -80, -40],
    [ 20,  -5,  15,   5,   5,  15,  -5,  20],
    [ 10,  -5,   5,   0,   0,   5,  -5,  10],
    [ 10,  -5,   5,   0,   0,   5,  -5,  10],
    [ 20,  -5,  15,   5,   5,  15,  -5,  20],
    [-40, -80,  -5,  -5,  -5,  -5, -80, -40],
    [200, -40,  20,  10,  10,  20, -40, 200]
], dtype=int)

# 原始启发式系数（会被动态调整）
MOVE_ORDER_CORNER_BONUS_BASE = 15
MOVE_ORDER_X_PENALTY = 25
MOVE_ORDER_C_PENALTY = 10
FLIP_WEIGHT_ORDER_BASE = -5

ENDGAME_EMPTIES_THRESHOLD = 10
AB_MAX_DEPTH = 4
AB_SOLVE_EMPTIES = 6

ROLLOUT_MAX_PLIES = 32  # 限制单次 rollout 步数

# Rollout 评价早停阈值（少子胜：若己方子明显过多 -> 负；己方明显更少 -> 正）
EVAL_LEAD_MARGIN = 10

# 每 N 步/着法检查一次时间，减少系统调用
TIME_CHECK_INTERVAL = 5

class Node:
    __slots__ = ("board","player","parent","move","children","untried_moves","N","W")
    def __init__(self, board, player, parent=None, move=None, untried_moves=None):
        self.board = board
        self.player = player
        self.parent = parent
        self.move = move
        self.children = {}
        self.untried_moves = untried_moves if untried_moves is not None else []
        self.N = 0
        self.W = 0.0

class AI:
    def __init__(self, chessboard_size, color, time_out):
        self.chessboard_size = chessboard_size
        self.color = color
        self.time_out = time_out
        self.candidate_list = []
        self.deadline = 0.0
        self.ucb_c = 1.2
        self.rollout_eps = 0.06

        n = chessboard_size
        self._corners = {(0,0),(0,n-1),(n-1,0),(n-1,n-1)}
        self._tt = None
        self._move_cache = {}  # (hash, color) -> list of moves

        # 统计辅助（可选调试输出）
        self._ab_calls = 0
        self._move_cache_hits = 0
        self._move_cache_queries = 0

    # ================= rules & helpers =================
    def _board_hash(self, board):
        # 简化 hash：使用 Python 内置 hash 对 bytes；避免存整对象
        return hash(board.tobytes())

    def get_valid_moves(self, board, color):
        h = self._board_hash(board)
        key = (h, color)
        if ENABLE_MOVE_CACHE:
            self._move_cache_queries += 1
            if key in self._move_cache:
                self._move_cache_hits += 1
                return self._move_cache[key]

        moves = []
        empties = np.argwhere(board == COLOR_NONE)
        if empties.size == 0:
            if ENABLE_MOVE_CACHE:
                self._move_cache[key] = moves
            return moves

        n = board.shape[0]
        opp = -color
        # 扫空位 + 邻接对手快速过滤
        for i, j in empties:
            neigh_has_opp = False
            for dx, dy in DIRECTIONS:
                x, y = i + dx, j + dy
                if 0 <= x < n and 0 <= y < n and board[x, y] == opp:
                    neigh_has_opp = True
                    break
            if not neigh_has_opp:
                continue
            if self.is_valid_move(board, int(i), int(j), color, opp):
                moves.append((int(i), int(j)))

        if ENABLE_MOVE_CACHE:
            # 控制缓存大小
            if len(self._move_cache) > 40000:
                self._move_cache.clear()
            self._move_cache[key] = moves
        return moves

    def is_valid_move(self, board, i, j, me, opp):
        n = board.shape[0]
        for dx, dy in DIRECTIONS:
            x, y = i + dx, j + dy
            if not (0 <= x < n and 0 <= y < n):
                continue
            if board[x, y] != opp:
                continue
            while 0 <= x < n and 0 <= y < n and board[x, y] == opp:
                x += dx
                y += dy
            if 0 <= x < n and 0 <= y < n and board[x, y] == me:
                return True
        return False

    def apply_move(self, board, move, color):
        if move is None:
            return board.copy()
        n = board.shape[0]
        opp = -color
        i, j = move
        new_board = board.copy()
        new_board[i, j] = color
        for dx, dy in DIRECTIONS:
            x, y = i + dx, j + dy
            if not (0 <= x < n and 0 <= y < n):
                continue
            if new_board[x, y] != opp:
                continue
            path = []
            while 0 <= x < n and 0 <= y < n and new_board[x, y] == opp:
                path.append((x, y))
                x += dx
                y += dy
            if 0 <= x < n and 0 <= y < n and new_board[x, y] == color and path:
                for (fx, fy) in path:
                    new_board[fx, fy] = color
        return new_board

    def count_flips(self, board, move, color):
        if move is None:
            return 0
        n = board.shape[0]
        opp = -color
        i, j = move
        total = 0
        for dx, dy in DIRECTIONS:
            x, y = i + dx, j + dy
            if not (0 <= x < n and 0 <= y < n):
                continue
            if board[x, y] != opp:
                continue
            cnt = 0
            while 0 <= x < n and 0 <= y < n and board[x, y] == opp:
                cnt += 1
                x += dx
                y += dy
            if 0 <= x < n and 0 <= y < n and board[x, y] == color and cnt > 0:
                total += cnt
        return total

    def is_terminal(self, board):
        if not np.any(board == COLOR_NONE):
            return True
        return (len(self.get_valid_moves(board, COLOR_BLACK)) == 0 and
                len(self.get_valid_moves(board, COLOR_WHITE)) == 0)

    # ================ heuristics ===================
    def corner_x_c_flags(self, n, i, j):
        corner = (i == 0 and j == 0) or (i == 0 and j == n - 1) or (i == n - 1 and j == 0) or (i == n - 1 and j == n - 1)
        x_positions = [(1,1),(1,n-2),(n-2,1),(n-2,n-2)]
        is_x = (i, j) in x_positions
        c_positions = [(0,1),(1,0),(0,n-2),(1,n-1),(n-1,1),(n-2,0),(n-2,n-1),(n-1,n-2)]
        is_c = (i, j) in c_positions
        return corner, is_x, is_c

    def dynamic_weights(self, empties, total):
        ratio = empties / max(1,total)
        # 角落奖励与翻子权重动态调整
        if not ENABLE_DYNAMIC_CORNER and not ENABLE_DYNAMIC_FLIP_WEIGHT:
            return MOVE_ORDER_CORNER_BONUS_BASE, FLIP_WEIGHT_ORDER_BASE
        # 早期减少角落奖励，避免过早稳定；比率>0.45
        if ratio > 0.45:
            corner_bonus = MOVE_ORDER_CORNER_BONUS_BASE * 0.4 if ENABLE_DYNAMIC_CORNER else MOVE_ORDER_CORNER_BONUS_BASE
            flip_w = FLIP_WEIGHT_ORDER_BASE * 1.6 if ENABLE_DYNAMIC_FLIP_WEIGHT else FLIP_WEIGHT_ORDER_BASE
        elif ratio > 0.20:
            corner_bonus = MOVE_ORDER_CORNER_BONUS_BASE * 0.7 if ENABLE_DYNAMIC_CORNER else MOVE_ORDER_CORNER_BONUS_BASE
            flip_w = FLIP_WEIGHT_ORDER_BASE * 1.2 if ENABLE_DYNAMIC_FLIP_WEIGHT else FLIP_WEIGHT_ORDER_BASE
        else:
            corner_bonus = MOVE_ORDER_CORNER_BONUS_BASE * 1.1 if ENABLE_DYNAMIC_CORNER else MOVE_ORDER_CORNER_BONUS_BASE
            flip_w = FLIP_WEIGHT_ORDER_BASE * 0.8 if ENABLE_DYNAMIC_FLIP_WEIGHT else FLIP_WEIGHT_ORDER_BASE
        return corner_bonus, flip_w

    def quick_move_score(self, board, move, color):
        if move is None: return -10.0
        n = board.shape[0]
        i, j = move
        empties = int(np.count_nonzero(board == COLOR_NONE))
        corner_bonus, flip_w = self.dynamic_weights(empties, n*n)

        flips = self.count_flips(board, move, color)
        corner, is_x, is_c = self.corner_x_c_flags(n, i, j)

        score = flip_w * flips
        if corner: score += corner_bonus
        if is_x:   score -= MOVE_ORDER_X_PENALTY
        if is_c:   score -= MOVE_ORDER_C_PENALTY

        if n == 8:
            score += 0.02 * POS_MAT[i, j]
        return score

    def order_moves(self, board, color, moves):
        scored = [(self.quick_move_score(board, mv, color), mv) for mv in moves]
        scored.sort(key=lambda x: x[0], reverse=True)
        return [m for _, m in scored]

    # Frontier: 邻接空位的己方棋子数；Mobility: 双方合法着法差
    def mobility_frontier(self, board, root_color):
        me = root_color
        opp = -root_color
        me_moves = len(self.get_valid_moves(board, me))
        opp_moves = len(self.get_valid_moves(board, opp))
        # frontier 统计
        empties = np.argwhere(board == COLOR_NONE)
        frontier_me = 0
        frontier_opp = 0
        n = board.shape[0]
        for i, j in empties:
            for dx, dy in DIRECTIONS:
                x, y = i + dx, j + dy
                if 0 <= x < n and 0 <= y < n:
                    v = board[x, y]
                    if v == me:
                        frontier_me += 1
                    elif v == opp:
                        frontier_opp += 1
        return me_moves, opp_moves, frontier_me, frontier_opp

    def parity_factor(self, board):
        empties = int(np.count_nonzero(board == COLOR_NONE))
        # 奇偶：末局若空位为偶/奇对最后下子顺序影响。简单映射成微小偏置
        return 0.1 if (empties % 2 == 1) else -0.1

    def evaluate(self, board, root_color):
        me = root_color
        opp = -root_color
        me_discs = int(np.count_nonzero(board == me))
        opp_discs = int(np.count_nonzero(board == opp))
        base = 0
        if me_discs < opp_discs: base = 1
        elif me_discs > opp_discs: base = -1
        else: base = 0

        # 复合评价叠加（保持 [-3,+3] 近似范围，再截断到 [-1,1]）
        if ENABLE_MOBILITY_EVAL or ENABLE_FRONTIER_EVAL or ENABLE_PARITY_EVAL:
            me_moves, opp_moves, frontier_me, frontier_opp = self.mobility_frontier(board, root_color)
            mobility_score = 0
            if ENABLE_MOBILITY_EVAL:
                # 希望对手走得多？（对手多走 -> 我更容易保持少子）实际需谨慎，这里给少量正向
                mobility_score += (opp_moves - me_moves) * 0.03
            if ENABLE_FRONTIER_EVAL:
                # 自己 frontiers 少更好
                mobility_score += (frontier_opp - frontier_me) * 0.01
            if ENABLE_PARITY_EVAL:
                mobility_score += self.parity_factor(board) * 0.2
            composite = base + mobility_score
            # 压缩到 [-1,1]
            if composite > 1: composite = 1
            if composite < -1: composite = -1
            return composite
        return base

    def phase_params(self, empties, total):
        ratio = empties / max(1,total)
        if ratio > 0.45:
            return UCB_C_EARLY, ROLLOUT_EPS_EARLY, "early"
        if ratio > 0.15:
            return UCB_C_MID, ROLLOUT_EPS_MID, "mid"
        return UCB_C_LATE, ROLLOUT_EPS_LATE, "late"

    # ========== Alpha-Beta ==========
    def alpha_beta(self, board, color, root_color, alpha, beta, depth, depth_limit, solve_to_terminal):
        self._ab_calls += 1
        if time.time() >= self.deadline:
            return self.evaluate(board, root_color)
        key = None
        if self._tt is not None:
            key = (self._board_hash(board), color, depth_limit - depth, solve_to_terminal)
            val = self._tt.get(key)
            if val is not None:
                return val

        if self.is_terminal(board):
            val = self.evaluate(board, root_color)
            if key is not None: self._tt[key] = val
            return val

        if (not solve_to_terminal) and depth >= depth_limit:
            val = self.evaluate(board, root_color)
            if key is not None: self._tt[key] = val
            return val

        moves = self.get_valid_moves(board, color)
        if not moves:
            opp_moves = self.get_valid_moves(board, -color)
            if not opp_moves:
                val = self.evaluate(board, root_color)
                if key is not None: self._tt[key] = val
                return val
            val = -self.alpha_beta(board, -color, root_color, -beta, -alpha, depth+1, depth_limit, solve_to_terminal)
            if key is not None: self._tt[key] = val
            return val

        ordered = self.order_moves(board, color, moves)

        best = -2
        for idx, mv in enumerate(ordered):
            if idx % TIME_CHECK_INTERVAL == 0 and time.time() >= self.deadline:
                break
            nb = self.apply_move(board, mv, color)
            v = -self.alpha_beta(nb, -color, root_color, -beta, -alpha, depth+1, depth_limit, solve_to_terminal)
            if v > best: best = v
            if best > alpha: alpha = best
            if alpha >= beta: break

        if best == -2:
            best = self.evaluate(board, root_color)

        if self._tt is not None:
            if len(self._tt) > 30000: self._tt.clear()
            self._tt[key] = best
        return best

    # ========== MCTS 部分 ==========
    def ucb_score(self, parent_N, child_N, child_avg, prog_bias):
        if child_N == 0:
            explore = float('inf')
        else:
            explore = self.ucb_c * sqrt(max(0.0, log(max(1.0,parent_N))) / child_N)
        return child_avg + explore + prog_bias

    def progressive_bias_scale(self, phase):
        if not ENABLE_PHASED_PROG_BIAS:
            return 1.0
        if phase == "early": return 1.15
        if phase == "mid":   return 1.0
        return 0.75  # late 降低偏置

    def select(self, node, root_color, phase):
        scale = self.progressive_bias_scale(phase)
        while True:
            if time.time() >= self.deadline:
                return node
            if self.is_terminal(node.board) or len(node.untried_moves) > 0:
                return node
            best = None
            best_score = -1e9
            parentN = max(1,node.N)
            for mv, ch in node.children.items():
                avg = (ch.W / ch.N) if ch.N > 0 else 0.0
                sign = 1.0 if node.player == root_color else -1.0
                value = sign * avg
                h = self.quick_move_score(node.board, mv, node.player)
                prog = PROG_BIAS_K_BASE * scale * (h / 100.0) / (ch.N + 1)
                s = self.ucb_score(parentN, ch.N, value, prog)
                if s > best_score:
                    best_score = s
                    best = ch
            node = best

    def expand(self, node):
        if len(node.untried_moves) == 0:
            return node
        if len(node.untried_moves) >= 3 and random.random() > 0.15:
            ordered = self.order_moves(node.board, node.player, node.untried_moves)
            move = ordered[0]
        else:
            move = random.choice(node.untried_moves)
        node.untried_moves.remove(move)
        nb = self.apply_move(node.board, move, node.player)
        next_player = -node.player
        next_moves = self.get_valid_moves(nb, next_player)
        if len(next_moves) == 0:
            opp_moves = self.get_valid_moves(nb, -next_player)
            if len(opp_moves) == 0:
                untried = []
            else:
                untried = [None]
        else:
            untried = list(next_moves)
        child = Node(nb, next_player, parent=node, move=move, untried_moves=untried)
        node.children[move] = child
        return child

    def simulate(self, node, root_color):
        board = node.board.copy()
        cur = node.player
        n = board.shape[0]
        empties = int(np.count_nonzero(board == COLOR_NONE))
        total = n*n
        _, eps, phase = self.phase_params(empties, total)
        eps = self.rollout_eps if hasattr(self, "rollout_eps") else eps

        # 末局使用（迭代）alpha-beta
        solve_to_terminal = (empties <= AB_SOLVE_EMPTIES)
        if empties <= ENDGAME_EMPTIES_THRESHOLD:
            if ENABLE_AB_ITERATIVE and solve_to_terminal:
                # 迭代深化：最多两层尝试
                best_val = self.alpha_beta(board, cur, root_color, -1, 1, 0, min(3, empties), False)
                if time.time() < self.deadline and abs(best_val) != 1 and empties <= 6:
                    deeper = self.alpha_beta(board, cur, root_color, -1, 1, 0, min(AB_MAX_DEPTH, empties), True)
                    return deeper
                return best_val
            depth_limit = min(AB_MAX_DEPTH, empties) if not solve_to_terminal else empties + 1
            return self.alpha_beta(board, cur, root_color, -1, 1, 0, depth_limit, solve_to_terminal)

        steps = 0
        while True:
            if steps % TIME_CHECK_INTERVAL == 0 and time.time() >= self.deadline:
                return self.evaluate(board, root_color)
            if steps >= ROLLOUT_MAX_PLIES:
                return self.evaluate(board, root_color)

            # 早停（分差巨大）
            if ENABLE_ROLLOUT_EARLY_STOP:
                me_discs = int(np.count_nonzero(board == root_color))
                opp_discs = int(np.count_nonzero(board == -root_color))
                diff = opp_discs - me_discs  # 少子胜：diff 大是好事
                if diff >= EVAL_LEAD_MARGIN:
                    return 1
                if -diff >= EVAL_LEAD_MARGIN:
                    return -1

            moves = self.get_valid_moves(board, cur)
            if not moves:
                opp_moves = self.get_valid_moves(board, -cur)
                if not opp_moves:
                    return self.evaluate(board, root_color)
                cur = -cur
                steps += 1
                continue

            if random.random() < eps:
                mv = random.choice(moves)
            else:
                ordered = self.order_moves(board, cur, moves)
                mv = ordered[0] if len(ordered)==1 else random.choice(ordered[:2])
            board = self.apply_move(board, mv, cur)
            cur = -cur
            steps += 1

    def backprop(self, leaf, result):
        nd = leaf
        while nd is not None:
            nd.N += 1
            nd.W += result
            nd = nd.parent

    def mcts_search(self, root_board, root_color):
        root_moves = self.get_valid_moves(root_board, root_color)
        if not root_moves:
            opp_moves = self.get_valid_moves(root_board, -root_color)
            if not opp_moves:
                return None
            root_untried = [None]
        else:
            root_untried = list(root_moves)
        root = Node(root_board.copy(), root_color, None, None, root_untried)

        empties = int(np.count_nonzero(root_board == COLOR_NONE))
        total = self.chessboard_size * self.chessboard_size
        _, _, phase = self.phase_params(empties, total)

        while time.time() < self.deadline:
            leaf = self.select(root, root_color, phase)
            if time.time() >= self.deadline:
                break
            if len(leaf.untried_moves) > 0 and not self.is_terminal(leaf.board):
                leaf = self.expand(leaf)
            result = self.simulate(leaf, root_color)
            if time.time() >= self.deadline:
                self.backprop(leaf, result)
                break
            self.backprop(leaf, result)

        best_move = None
        bestN = -1
        for mv, ch in root.children.items():
            if ch.N > bestN:
                bestN = ch.N
                best_move = mv

        if best_move is None and root_moves:
            corner_moves = [m for m in root_moves if m in self._corners]
            if corner_moves:
                best_move = corner_moves[0]
            else:
                flips = [(m, self.count_flips(root_board, m, root_color)) for m in root_moves]
                flips.sort(key=lambda x: x[1])
                best_move = flips[0][0]

        return best_move

    def go(self, chessboard):
        self.candidate_list.clear()
        start = time.time()
        allowed = min(float(self.time_out), HARD_LIMIT_SECONDS)
        self.deadline = start + max(0.05, allowed - TIME_BUFFER)

        self._tt = {}
        if ENABLE_MOVE_CACHE:
            self._move_cache.clear()
        self._ab_calls = 0
        self._move_cache_hits = 0
        self._move_cache_queries = 0

        me = self.color
        valid = self.get_valid_moves(chessboard, me)
        for m in valid:
            self.candidate_list.append(m)
        if not valid:
            return

        empties = int(np.count_nonzero(chessboard == COLOR_NONE))
        total = self.chessboard_size * self.chessboard_size
        self.ucb_c, self.rollout_eps, _ = self.phase_params(empties, total)

        best = self.mcts_search(chessboard, me)

        if best is None:
            corner_moves = [m for m in valid if m in self._corners]
            if corner_moves:
                best = corner_moves[0]
            else:
                flips = [(m, self.count_flips(chessboard, m, me)) for m in valid]
                flips.sort(key=lambda x: x[1])
                best = flips[0][0]

        self.candidate_list.append(best)