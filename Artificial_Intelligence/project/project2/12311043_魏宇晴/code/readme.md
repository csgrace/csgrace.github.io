# CS303 Project 2 — Adult Census Income Classification

This repository contains `project2.py`, a reproducible pipeline for the Adult Census Income binary classification task. It supports multiple models (Decision Tree, KNN, SVM, MLP, Random Forest, Gradient Boosting, optional XGBoost), performs a consistent train/validation/internal-test split, logs metrics and plots, and produces final predictions.

If you place the required data files (`traindata.csv`, `trainlabel.txt`, `testdata.csv`) in the same folder as `project2.py`, you can run the script directly without additional configuration.

---

## 1. Environment setup

### Python version
- Recommended: Python 3.8 or higher

### Required libraries
The code imports the following third‑party libraries (with minimum versions):
- numpy (>= 1.19)
- pandas (>= 1.0)
- scikit-learn (>= 1.2; for OneHotEncoder sparse_output and HistGradientBoostingClassifier)
- matplotlib (>= 3.0)
- seaborn (>= 0.10)
- joblib (>= 1.0)
- Optional: xgboost (>= 1.0; if you want to include XGBoost in the model suite)

System libraries used (come with Python):
- argparse, os, tempfile, pathlib, logging, warnings

### Quick install (recommended minimal environment)

Create and activate a virtual environment (optional but recommended):
- Using venv:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
```

Install the required packages:
```bash
pip install numpy pandas scikit-learn matplotlib seaborn joblib
```

Optional (only if you want XGBoost):
```bash
pip install xgboost
```

Notes:
- If `xgboost` is not installed, the script will automatically skip XGBoost models.
- Matplotlib is set to use a non‑GUI backend (`Agg`), so plots are saved to files and do not require a display.

---

## 2. How to run

### Easiest way (files in the same folder)
If `project2.py`, `traindata.csv`, `trainlabel.txt`, and `testdata.csv` are all in the same directory:
```bash
python project2.py
```
The script uses these defaults automatically:
- `--train` = `./traindata.csv`
- `--label` = `./trainlabel.txt`
- `--test` = `./testdata.csv`
- `--outdir` = `./outputs`
- `--seed` = `42`
- `--models` = `all`
- `--n_jobs` = `-1` (use all CPU cores where applicable)

This is ideal for “click‑to‑run” in IDEs or double‑click execution if your environment associates `.py` files with Python.

### Custom paths and options
You can override defaults via command line:
```bash
python project2.py \
  --train /path/to/traindata.csv \
  --label /path/to/trainlabel.txt \
  --test /path/to/testdata.csv \
  --outdir ./my_outputs \
  --seed 123 \
  --models all \
  --n_jobs 4
```

Available `--models` values include:
- `all` (includes all models: logistic, svm, rf, gb, hgb, knn, dt, mlp, xgb)
- Note: `xgb` requires `xgboost` installed; otherwise it is skipped. `hgb` is sklearn's built-in HistGradientBoostingClassifier (always available).
---

## 3. What the script does

- Normalizes common column name variants (e.g., `education.num`, `capital.gain`, `hours.per.week`) and warns if expected columns are missing.
- Splits training data:
  - 80/20 into internal test
  - Then 80/20 on the remaining train for train/val
  - Final proportions: train ≈ 64%, val ≈ 16%, internal‑test ≈ 20%
- Builds a preprocessing pipeline:
  - Numeric: median imputation + standard scaling
  - Categorical: most‑frequent imputation + one‑hot encoding
- Trains base models and performs grid search tuning (where defined).
- Evaluates on train/val/internal‑test; saves metrics, confusion matrices, ROC curves, learning curves.
- Selects the best model by internal‑test accuracy, retrains on the full training set, and generates predictions for `testdata.csv`.

---

## 4. Outputs

By default, results are written to `./outputs/`:
- `plots/`
  - Correlation heatmap, learning curves, confusion matrices, ROC curves, training time comparison, feature importances (for applicable models), and hyperparameter tuning plots (e.g., heatmaps or line plots for grid search results)
- `artifacts/`
  - Saved tuned models (`*.joblib`)
  - Grid‑search results (`*_gridsearch_results.csv`), best params (`*_best_params.txt`), tuning time (`*_tuning_time.txt`)
  - Classification reports (`*_classification_report.txt`)
  - `summary_metrics.csv` (aggregate metrics across models)
- Root output file:
  - `predictions.txt` (line‑wise integer predictions for the test set)

---

## 5. Troubleshooting

- ImportError: Install missing packages with pip as described above.
- Model skipped: If `xgboost` is not installed, XGBoost models are automatically skipped with a warning. Install via `pip install xgboost` if needed.
- Label/data length mismatch: Ensure `trainlabel.txt` contains exactly one integer label (0/1) per line and the number of lines equals the number of rows in `traindata.csv`.
- Runtime/memory concerns:
  - Reduce `--n_jobs`
  - Limit `--models` (e.g., `--models gb,rf`)
  - Adjust grid sizes inside the script if necessary
- Plots not showing on screen: This is expected with the `Agg` backend; check the `.png` files under `./outputs/plots/`.

