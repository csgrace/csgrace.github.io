import time
import argparse
import os
import tempfile
from pathlib import Path
import logging

_joblib_tmp = Path(tempfile.gettempdir()) / "joblib_temp"
try:
    _joblib_tmp.mkdir(parents=True, exist_ok=True)
    os.environ.setdefault("JOBLIB_TEMP_FOLDER", str(_joblib_tmp))
except Exception:
    _fallback = Path.cwd() / ".joblib_temp"
    _fallback.mkdir(parents=True, exist_ok=True)
    os.environ.setdefault("JOBLIB_TEMP_FOLDER", str(_fallback))
# 强制 matplotlib 使用非 GUI 后端，避免在无显示环境或 Windows/tkinter 上出错
import matplotlib
matplotlib.use("Agg")

import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings("ignore")
import numpy as np
import pandas as pd

from typing import Tuple, Dict, Any, Optional, List
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import (
    train_test_split, StratifiedKFold, GridSearchCV, learning_curve
)
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score, roc_auc_score,
    confusion_matrix, classification_report, RocCurveDisplay
)

from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.neural_network import MLPClassifier

try:
    from xgboost import XGBClassifier
    HAS_XGBOOST = True
except Exception:
    HAS_XGBOOST = False
from sklearn.ensemble import HistGradientBoostingClassifier
import joblib

warnings.filterwarnings("ignore")

DEFAULT_COLS = [
    "age", "workclass", "fnlwgt", "education", "education.num",
    "marital.status", "occupation", "relationship", "race", "sex",
    "capital.gain", "capital.loss", "hours.per.week", "native.country"
]

COLUMN_NORMALIZATION_MAP = {
    "education_num": "education.num",
    "marital_status": "marital.status",
    "capital_gain": "capital.gain",
    "capital_loss": "capital.loss",
    "hours_per_week": "hours.per.week",
    "native_country": "native.country",
}

def parse_args():
    p = argparse.ArgumentParser(description="Adult Census Income Classification Project")

    script_dir = Path(__file__).resolve().parent
    default_train = str(script_dir / "traindata.csv")
    default_label = str(script_dir / "trainlabel.txt")
    default_test = str(script_dir / "testdata.csv")

    p.add_argument("--train", default=default_train, type=str, help=f"Path to traindata.csv (default: {default_train})")
    p.add_argument("--label", default=default_label, type=str, help=f"Path to trainlabel.txt (default: {default_label})")
    p.add_argument("--test", default=default_test, type=str, help=f"Path to testdata.csv (default: {default_test})")
    p.add_argument("--outdir", default="./outputs", type=str, help="Directory to save outputs")
    p.add_argument("--seed", default=42, type=int, help="Random seed")
    p.add_argument("--models", default="all", type=str,
                   help="all | fast | logistic | svm | rf | gb | knn | dt | mlp | xgb")
    p.add_argument("--n_jobs", default=-1, type=int, help="Parallel jobs for CV where applicable")
    return p.parse_args()

def ensure_output_dir(outdir: str):
    os.makedirs(outdir, exist_ok=True)
    os.makedirs(os.path.join(outdir, "plots"), exist_ok=True)
    os.makedirs(os.path.join(outdir, "artifacts"), exist_ok=True)

def standardize_column_names(df: pd.DataFrame) -> pd.DataFrame:
    cols = []
    for c in df.columns:
        c2 = c.strip()
        c2 = c2.replace(" ", ".").replace("-", ".").replace("/", ".")
        if c2 in COLUMN_NORMALIZATION_MAP:
            c2 = COLUMN_NORMALIZATION_MAP[c2]
        cols.append(c2)
    df.columns = cols
    return df

def load_data(train_path: str, label_path: str, test_path: str) -> Tuple[pd.DataFrame, np.ndarray, pd.DataFrame]:
    train_df = pd.read_csv(train_path)
    test_df = pd.read_csv(test_path)

    train_df = standardize_column_names(train_df)
    test_df = standardize_column_names(test_df)

    for df in (train_df, test_df):
        for k, v in COLUMN_NORMALIZATION_MAP.items():
            if k in df.columns and v not in df.columns:
                df.rename(columns={k: v}, inplace=True)

    missing_train = [c for c in DEFAULT_COLS if c not in train_df.columns]
    missing_test = [c for c in DEFAULT_COLS if c not in test_df.columns]
    if missing_train or missing_test:
        print("警告：缺少期望的列名")
        print("训练集缺列：", missing_train)
        print("测试集缺列：", missing_test)

    with open(label_path, "r", encoding="utf-8") as f:
        labels = [line.strip() for line in f if len(line.strip()) > 0]
    y = np.array(list(map(int, labels)))

    if len(y) != len(train_df):
        raise ValueError(f"Label 数量({len(y)})与训练样本数({len(train_df)})不一致")

    return train_df, y, test_df

def build_preprocessor(df: pd.DataFrame) -> ColumnTransformer:
    numeric_features = []
    categorical_features = []
    for c in df.columns:
        if c in ["age", "fnlwgt", "education.num", "capital.gain", "capital.loss", "hours.per.week"]:
            numeric_features.append(c)
        else:
            categorical_features.append(c)

    if "income" in numeric_features:
        numeric_features.remove("income")
    if "income" in categorical_features:
        categorical_features.remove("income")

    numeric_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])
    categorical_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
    ])
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numeric_features),
            ("cat", categorical_transformer, categorical_features),
        ],
        remainder="drop"
    )
    return preprocessor

def get_models(seed: int, selection: str = "all") -> Dict[str, Any]:
    models = {
        "logistic": LogisticRegression(penalty="l2", solver="lbfgs", max_iter=2000, C=1.0, random_state=seed),
        "svm": SVC(kernel="rbf", C=2.0, gamma="scale", probability=True, random_state=seed),
        "rf": RandomForestClassifier(
            n_estimators=300, max_depth=None, min_samples_split=2, min_samples_leaf=1, random_state=seed, n_jobs=-1
        ),
        "gb": GradientBoostingClassifier(learning_rate=0.05, n_estimators=250, max_depth=3, random_state=seed),
        "hgb": HistGradientBoostingClassifier(
            max_iter=250, learning_rate=0.05, max_depth=3, random_state=seed
        ),
        "knn": KNeighborsClassifier(n_neighbors=25, weights="distance", p=2),
        "dt": DecisionTreeClassifier(max_depth=None, random_state=seed),
        "mlp": MLPClassifier(
            hidden_layer_sizes=(128, 64), activation="relu", solver="adam",
            alpha=1e-4, learning_rate_init=1e-3, max_iter=300, early_stopping=True,
            n_iter_no_change=10, random_state=seed, verbose=False
        ),
    }
    if HAS_XGBOOST:
        models["xgb"] = XGBClassifier(
            n_estimators=500, max_depth=6, learning_rate=0.05, subsample=0.8, colsample_bytree=0.8,
            reg_lambda=1.0, objective="binary:logistic", eval_metric="logloss",
            random_state=seed, n_jobs=-1
        )
    return models

def plot_feature_correlations(df: pd.DataFrame, outdir: str):
    num_df = df.select_dtypes(include=[np.number])
    if num_df.shape[1] >= 2:
        plt.figure(figsize=(8, 6))
        sns.heatmap(num_df.corr(), cmap="coolwarm", annot=False)
        plt.title("Numeric Feature Correlation (Train)")
        plt.tight_layout()
        plt.savefig(os.path.join(outdir, "plots", "train_numeric_correlations.png"), dpi=150)
        plt.close()

def plot_class_balance(y: np.ndarray, outdir: str):
    plt.figure(figsize=(4, 3))
    vals, cnts = np.unique(y, return_counts=True)
    sns.barplot(x=[str(v) for v in vals], y=cnts, palette="pastel")
    plt.title("Train Label Distribution")
    plt.xlabel("Label")
    plt.ylabel("Count")
    plt.tight_layout()
    plt.savefig(os.path.join(outdir, "plots", "train_label_distribution.png"), dpi=150)
    plt.close()

def plot_learning_curve(model, X, y, outdir: str, name: str, seed: int):
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=seed)
    sizes, train_scores, val_scores = learning_curve(
        model, X, y, cv=cv, scoring="accuracy", n_jobs=-1,
        train_sizes=np.linspace(0.1, 1.0, 6), shuffle=True, random_state=seed
    )
    plt.figure(figsize=(6, 4))
    plt.plot(sizes, train_scores.mean(axis=1), "o-", label="Training Acc")
    plt.plot(sizes, val_scores.mean(axis=1), "o-", label="CV Acc")
    plt.title(f"Learning Curve - {name}")
    plt.xlabel("Training Examples")
    plt.ylabel("Accuracy")
    plt.legend()
    plt.grid(alpha=0.3)
    plt.tight_layout()
    plt.savefig(os.path.join(outdir, "plots", f"{name}_learning_curve.png"), dpi=150)
    plt.close()

def evaluate_and_plot(model, X, y, outdir: str, name: str, split: str) -> Dict[str, Any]:
    y_pred = model.predict(X)
    if hasattr(model, "predict_proba"):
        y_proba = model.predict_proba(X)[:, 1]
    elif hasattr(model, "decision_function"):
        scores = model.decision_function(X)
        m, M = scores.min(), scores.max()
        y_proba = (scores - m) / (M - m + 1e-9)
    else:
        y_proba = None

    acc = accuracy_score(y, y_pred)
    prec = precision_score(y, y_pred, zero_division=0)
    rec = recall_score(y, y_pred, zero_division=0)
    f1 = f1_score(y, y_pred, zero_division=0)
    auc = roc_auc_score(y, y_proba) if y_proba is not None else np.nan

    cm = confusion_matrix(y, y_pred)
    plt.figure(figsize=(5, 4))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
    plt.title(f"Confusion Matrix - {name} [{split}] (Acc={acc:.3f}, F1={f1:.3f})")
    plt.xlabel("Predicted")
    plt.ylabel("True")
    plt.tight_layout()
    cm_path = os.path.join(outdir, "plots", f"{name}_{split}_confusion_matrix.png")
    plt.savefig(cm_path, dpi=150)
    plt.close()

    roc_path = None
    if y_proba is not None:
        plt.figure(figsize=(5, 4))
        RocCurveDisplay.from_predictions(y, y_proba)
        plt.title(f"ROC Curve - {name} [{split}] (AUC={auc:.3f})")
        plt.tight_layout()
        roc_path = os.path.join(outdir, "plots", f"{name}_{split}_roc.png")
        plt.savefig(roc_path, dpi=150)
        plt.close()

    rep_path = os.path.join(outdir, "artifacts", f"{name}_{split}_classification_report.txt")
    with open(rep_path, "w") as f:
        f.write(classification_report(y, y_pred))

    return {
        "acc": acc, "prec": prec, "rec": rec, "f1": f1, "auc": auc,
        "cm_path": cm_path, "roc_path": roc_path, "report_path": rep_path
    }

def hyperparameter_tuning(
    name: str, base_estimator, preprocessor, X_train, y_train, outdir: str, seed: int, n_jobs: int
) -> Optional[Tuple[Pipeline, float]]:
    pipe = Pipeline(steps=[("preprocessor", preprocessor), ("clf", base_estimator)])

    if name == "rf":
        param_grid = {
            "clf__n_estimators": [300, 600],
            "clf__max_depth": [None, 12, 20],
            "clf__min_samples_split": [2, 5],
            "clf__min_samples_leaf": [1, 2],
        }
    elif name == "gb":
        param_grid = {
            "clf__n_estimators": [250, 400],
            "clf__learning_rate": [0.05, 0.1],
            "clf__max_depth": [3, 4],
        }
    elif name == "svm":
        param_grid = {
            "clf__C": [1.0, 2.0, 4.0],
            "clf__gamma": ["scale", 0.01, 0.001],
            "clf__kernel": ["rbf"],
        }
    elif name == "logistic":
        param_grid = {
            "clf__C": [0.5, 1.0, 2.0],
            "clf__penalty": ["l2"],
        }
    elif name == "knn":
        param_grid = {
            "clf__n_neighbors": [15, 25, 35],
            "clf__weights": ["distance", "uniform"],
        }
    elif name == "dt":
        param_grid = {
            "clf__max_depth": [None, 10, 20, 30],
            "clf__min_samples_split": [2, 5, 10],
        }
    elif name == "mlp":
        param_grid = {
            "clf__hidden_layer_sizes": [(128, 64), (256, 128)],
            "clf__alpha": [1e-4, 1e-3],
            "clf__learning_rate_init": [1e-3, 3e-4],
        }
    elif name == "xgb" and HAS_XGBOOST:
        param_grid = {
            "clf__n_estimators": [400, 600, 800],
            "clf__max_depth": [4, 6, 8],
            "clf__learning_rate": [0.05, 0.1],
            "clf__subsample": [0.8, 1.0],
            "clf__colsample_bytree": [0.8, 1.0],
        }
    else:
        return None

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=seed)
    grid = GridSearchCV(
        estimator=pipe, param_grid=param_grid, scoring="accuracy",
        n_jobs=n_jobs, cv=cv, verbose=1, refit=True
    )
    t0 = time.time()
    grid.fit(X_train, y_train)
    tuning_time = time.time() - t0

    cv_path = os.path.join(outdir, "artifacts", f"{name}_gridsearch_results.csv")
    pd.DataFrame(grid.cv_results_).to_csv(cv_path, index=False)
    with open(os.path.join(outdir, "artifacts", f"{name}_best_params.txt"), "w") as f:
        f.write(str(grid.best_params_) + "\n")
        f.write("Best CV Accuracy: {:.4f}\n".format(grid.best_score_))
    with open(os.path.join(outdir, "artifacts", f"{name}_tuning_time.txt"), "w") as f:
        f.write(f"{tuning_time:.4f}\n")
    return grid.best_estimator_, tuning_time

def main():
    args = parse_args()
    ensure_output_dir(args.outdir)
    print("加载数据...")
    train_df, y_all, test_df = load_data(args.train, args.label, args.test)

    print("生成基础图表...")
    plot_feature_correlations(train_df, args.outdir)
    plot_class_balance(y_all, args.outdir)

    # 划分数据：先 80/20 -> internal test
    print("划分数据集：train/val/internal-test...")
    X_train_dev, X_test_int, y_train_dev, y_test_int = train_test_split(
        train_df, y_all, test_size=0.2, stratify=y_all, random_state=args.seed
    )
    # 再对 train_dev 划分 80/20 -> train/val
    X_train, X_val, y_train, y_val = train_test_split(
        X_train_dev, y_train_dev, test_size=0.2, stratify=y_train_dev, random_state=args.seed
    )
    print(f"数据比例 -> train: {len(X_train)} ({len(X_train)/len(train_df):.1%}), "
          f"val: {len(X_val)} ({len(X_val)/len(train_df):.1%}), "
          f"internal-test: {len(X_test_int)} ({len(X_test_int)/len(train_df):.1%})")
    preprocessor = build_preprocessor(train_df)
    base_estimators = get_models(args.seed, args.models)
    all_rows: List[Dict[str, Any]] = []

    for name, est in base_estimators.items():
        print(f"\n[Base] 训练模型: {name}")
        model = Pipeline(steps=[("preprocessor", preprocessor), ("clf", est)])
        try:
            plot_learning_curve(model, X_train, y_train, args.outdir, name=f"{name}_base", seed=args.seed)
        except Exception as e:
            print(f"学习曲线失败 {name}_base: {e}")
        t0 = time.time()
        model.fit(X_train, y_train)
        train_time_base = time.time() - t0
        train_metrics = evaluate_and_plot(model, X_train, y_train, args.outdir, name=f"{name}_base", split="train")
        val_metrics = evaluate_and_plot(model, X_val, y_val, args.outdir, name=f"{name}_base", split="val")
        test_metrics = evaluate_and_plot(model, X_test_int, y_test_int, args.outdir, name=f"{name}_base", split="internal_test")
        print(f"[{name}_base] Train Acc: {train_metrics['acc']:.4f} | "
              f"Val Acc: {val_metrics['acc']:.4f} | "
              f"Internal-Test Acc: {test_metrics['acc']:.4f}")

        all_rows.append({
            "name": f"{name}_base",
            "acc_train": train_metrics["acc"],
            "acc_val": val_metrics["acc"],
            "acc_internal_test": test_metrics["acc"],
            "f1_val": val_metrics["f1"],
            "f1_internal_test": test_metrics["f1"],
            "auc_val": val_metrics["auc"],
            "auc_internal_test": test_metrics["auc"],
            "train_time": float(f"{train_time_base:.4f}"),
            "tuning_time": float("nan")
        })

    for name, est in base_estimators.items():
        print(f"\n[Tuning] 调参与评估: {name}")
        tuned_result = hyperparameter_tuning(
            name=name, base_estimator=est, preprocessor=preprocessor,
            X_train=X_train, y_train=y_train, outdir=args.outdir, seed=args.seed, n_jobs=args.n_jobs
        )
        if tuned_result is None:
            print(f"{name} 未进行调参（无网格或不可用）。")
            continue
        tuned, tuning_time = tuned_result

        # 生成调参热图 ：基于保存的 gridsearch CSV
        try:
            cv_path = os.path.join(args.outdir, "artifacts", f"{name}_gridsearch_results.csv")
            if os.path.exists(cv_path):
                plot_grid_results(name, args.outdir)
        except Exception as e:
            print(f"绘制 {name} 超参图失败：{e}")

        # 学习曲线（tuned）
        try:
            plot_learning_curve(tuned, X_train, y_train, args.outdir, name=f"{name}_tuned", seed=args.seed)
        except Exception as e:
            print(f"学习曲线失败 {name}_tuned: {e}")

        t0 = time.time()
        tuned.fit(X_train, y_train)
        refit_time = time.time() - t0
        train_metrics = evaluate_and_plot(tuned, X_train, y_train, args.outdir, name=f"{name}_tuned", split="train")
        val_metrics = evaluate_and_plot(tuned, X_val, y_val, args.outdir, name=f"{name}_tuned", split="val")
        test_metrics = evaluate_and_plot(tuned, X_test_int, y_test_int, args.outdir, name=f"{name}_tuned",
                                         split="internal_test")
        print(f"[{name}_tuned] Train Acc: {train_metrics['acc']:.4f} | "
              f"Val Acc: {val_metrics['acc']:.4f} | "
              f"Internal-Test Acc: {test_metrics['acc']:.4f}")

        joblib.dump(tuned, os.path.join(args.outdir, "artifacts", f"{name}_tuned_model.joblib"))
        all_rows.append({
            "name": f"{name}_tuned",
            "acc_train": train_metrics["acc"],
            "acc_val": val_metrics["acc"],
            "acc_internal_test": test_metrics["acc"],
            "f1_val": val_metrics["f1"],
            "f1_internal_test": test_metrics["f1"],
            "auc_val": val_metrics["auc"],
            "auc_internal_test": test_metrics["auc"],
            "train_time": float(f"{refit_time:.4f}"),
            "tuning_time": float(f"{tuning_time:.4f}")
        })
    summary_df = pd.DataFrame(all_rows)
    summary_path = os.path.join(args.outdir, "artifacts", "summary_metrics.csv")
    summary_df.to_csv(summary_path, index=False)
    try:
        df_rt = summary_df.dropna(subset=["train_time"])
        plt.figure(figsize=(8, 4))
        sns.barplot(x="name", y="train_time", data=df_rt.sort_values("train_time", ascending=False), palette="mako")
        plt.xticks(rotation=45, ha="right")
        plt.ylabel("Train time (s)")
        plt.xlabel("")
        plt.tight_layout()
        plt.savefig(os.path.join(args.outdir, "plots", "train_time_comparison.png"), dpi=150)
        plt.close()
    except Exception as e:
        print(f"生成 train_time_comparison 图失败：{e}")
    print("\n=== 模型性能汇总（按 internal-test accuracy 降序）===")
    if not summary_df.empty:
        print(summary_df.sort_values("acc_internal_test", ascending=False).to_string(index=False))
    else:
        print("无结果，请检查前面是否所有模型均失败。")

    # 选择最优（internal-test acc 最大）
    if not summary_df.empty:
        best_idx = summary_df["acc_internal_test"].idxmax()
        best_name = summary_df.loc[best_idx, "name"]
        print(f"\n最优模型：{best_name} | Internal-Test Acc = {summary_df.loc[best_idx, 'acc_internal_test']:.4f}")

        best_model_path = os.path.join(args.outdir, "artifacts", f"{best_name}_model.joblib")
        if not os.path.exists(best_model_path):
            base_key = best_name.replace("_base", "").replace("_tuned", "")
            tuned_flag = best_name.endswith("_tuned")
            if base_key in base_estimators:
                est = base_estimators[base_key]
                if tuned_flag:
                    model = joblib.load(os.path.join(args.outdir, "artifacts", f"{base_key}_tuned_model.joblib"))
                else:
                    model = Pipeline(steps=[("preprocessor", preprocessor), ("clf", est)])
                    model.fit(pd.concat([X_train, X_val]), np.concatenate([y_train, y_val]))
                joblib.dump(model, best_model_path)

        print("在全量训练集上重训练最优模型并对测试集预测...")
        best_model = joblib.load(best_model_path)
        best_model.fit(train_df, y_all)

        test_pred = best_model.predict(test_df).astype(int)
        pred_path = os.path.join(args.outdir, "predictions.txt")
        with open(pred_path, "w") as f:
            for v in test_pred:
                f.write(f"{v}\n")
        print(f"预测已保存：{pred_path}")

        try:
            clf = best_model.named_steps.get("clf", None)
            if clf is not None and hasattr(clf, "feature_importances_"):
                ohe = best_model.named_steps["preprocessor"].named_transformers_["cat"].named_steps["onehot"]
                cat_features = best_model.named_steps["preprocessor"].transformers_[1][2]
                num_features = best_model.named_steps["preprocessor"].transformers_[0][2]
                ohe_names = list(ohe.get_feature_names_out(cat_features))
                feature_names = list(num_features) + ohe_names
                importances = clf.feature_importances_
                idx = np.argsort(importances)[::-1][:20]
                plt.figure(figsize=(8, 6))
                sns.barplot(x=importances[idx], y=np.array(feature_names)[idx], orient="h", palette="viridis")
                plt.title(f"Top 20 Feature Importances - {best_name}")
                plt.xlabel("Importance")
                plt.ylabel("Feature")
                plt.tight_layout()
                plt.savefig(os.path.join(args.outdir, "plots", f"{best_name}_feature_importance.png"), dpi=150)
                plt.close()
        except Exception as e:
            print(f"特征重要性绘图失败：{e}")
    print("\n完成！所有图表与文件在：", args.outdir)

def plot_grid_results(name: str, outdir: str):
    import math
    cv_path = os.path.join(outdir, "artifacts", f"{name}_gridsearch_results.csv")
    if not os.path.exists(cv_path):
        return
    df = pd.read_csv(cv_path)
    if "param_clf__n_estimators" in df.columns and "mean_test_score" in df.columns:
        try:
            agg = df.groupby("param_clf__n_estimators")["mean_test_score"].mean().reset_index()
            plt.figure(figsize=(6, 4))
            plt.plot(agg["param_clf__n_estimators"].astype(int), agg["mean_test_score"], "o-")
            plt.xlabel("n_estimators")
            plt.ylabel("CV mean accuracy")
            plt.title(f"{name}: n_estimators vs CV accuracy")
            plt.grid(alpha=0.3)
            plt.tight_layout()
            plt.savefig(os.path.join(outdir, "plots", f"{name}_grid_n_estimators.png"), dpi=150)
            plt.close()
        except Exception:
            pass
    if "param_clf__learning_rate" in df.columns and "param_clf__max_depth" in df.columns and "mean_test_score" in df.columns:
        try:
            piv = df.pivot_table(index="param_clf__max_depth", columns="param_clf__learning_rate", values="mean_test_score", aggfunc="mean")
            plt.figure(figsize=(6, 4))
            sns.heatmap(piv.astype(float), annot=True, fmt=".3f", cmap="viridis")
            plt.xlabel("learning_rate")
            plt.ylabel("max_depth")
            plt.title(f"{name}: grid CV mean accuracy")
            plt.tight_layout()
            plt.savefig(os.path.join(outdir, "plots", f"{name}_grid_heatmap.png"), dpi=150)
            plt.close()
        except Exception:
            pass

if __name__ == "__main__":
    main()