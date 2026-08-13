(() => {
  const STORAGE_KEY = 'cs209a-qq-farm-v1';
  const GROWTH_MS = 10_000;
  const initialState = { coins: 40, plots: Array(16).fill(null), selected: null };
  let state;
  try { state = { ...initialState, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; } catch { state = { ...initialState }; }
  if (!Array.isArray(state.plots) || state.plots.length !== 16) state.plots = Array(16).fill(null);
  const board = document.querySelector('#farm-board');
  const coins = document.querySelector('#coin-count');
  const status = document.querySelector('#farm-status');
  const progress = document.querySelector('#farm-progress');
  const setStatus = text => { status.textContent = text; };
  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const getPlotState = plot => !plot ? 'empty' : Date.now() - plot.plantedAt >= GROWTH_MS ? 'ripe' : 'growing';
  function renderFarm() {
    let planted = 0; board.innerHTML = '';
    state.plots.forEach((plot, index) => {
      const plotState = getPlotState(plot); if (plot) planted += 1;
      const button = document.createElement('button');
      button.className = `plot ${plotState}${state.selected === index ? ' selected' : ''}`;
      button.type = 'button'; button.setAttribute('role', 'gridcell');
      button.setAttribute('aria-label', `地块 ${index + 1}，${plotState === 'empty' ? '空地' : plotState === 'growing' ? '作物生长中' : '作物成熟可收获'}`);
      if (plotState === 'empty') button.innerHTML = '<span class="crop">🟫</span>空地';
      else if (plotState === 'growing') { const remaining = Math.max(0, Math.ceil((GROWTH_MS - (Date.now() - plot.plantedAt)) / 1000)); button.innerHTML = `<span class="crop">🌱</span>生长中 <span class="timer">${remaining}s</span>`; }
      else button.innerHTML = '<span class="crop">🌻</span>可收获';
      button.addEventListener('click', () => { state.selected = index; save(); renderFarm(); setStatus(`已选中第 ${index + 1} 块土地`); }); board.appendChild(button);
    });
    coins.textContent = state.coins; progress.textContent = `${planted} / 16 已种植`;
  }
  document.querySelector('#plant-btn').addEventListener('click', () => { if (state.selected === null) return setStatus('请先选择一块空地'); if (state.plots[state.selected]) return setStatus('这块地已被占用，请选择空地'); if (state.coins < 5) return setStatus('金币不足，收获作物后再试'); state.coins -= 5; state.plots[state.selected] = { plantedAt: Date.now() }; save(); renderFarm(); setStatus(`已在第 ${state.selected + 1} 块土地种下种子，10 秒后成熟`); });
  document.querySelector('#harvest-btn').addEventListener('click', () => { if (state.selected === null) return setStatus('请先选择一块成熟的土地'); if (getPlotState(state.plots[state.selected]) !== 'ripe') return setStatus('作物尚未成熟，请稍候'); state.plots[state.selected] = null; state.coins += 12; save(); renderFarm(); setStatus('收获成功！获得 12 金币'); });
  document.querySelector('#reset-btn').addEventListener('click', () => { state = { coins: 40, plots: Array(16).fill(null), selected: null }; save(); renderFarm(); setStatus('农场已重新开始'); });
  renderFarm(); window.setInterval(renderFarm, 500);
})();
