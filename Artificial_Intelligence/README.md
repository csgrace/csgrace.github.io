# Artificial Intelligence (CS303) 🤖

A structured collection of lecture slides, lab exercises, projects, and study materials for SUSTech CS303 Artificial Intelligence.  
From classic search and logic to modern machine learning and neural networks, this repo brings together everything you need to learn AI. 🚀

## Quick Links 🔗
- Lectures & Slides: [lecture/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lecture) 📚  
- Labs & Practice: [lab/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lab) 🧪  
- Projects: [project/](https://github.com/csgrace/Artificial_Intelligence/tree/main/project) 🧩  
- Study Roadmap: [AI_roadmap.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/AI_roadmap.pdf) 🗺️  
- Course Syllabus: [cs303.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/cs303.pdf) 📄

---

## Repository Structure 🗂️

### Lectures (Core Topics) 🎓
Explore foundational to advanced AI concepts with weekly PDFs:
- Course Overview: [Lec0_Course Information.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec0_Course%20Information.pdf) 🧭
- Introduction: [Lec1_Intorduction.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec1_Intorduction.pdf) 🌟
- Intelligent Agents: [Lec2_Intelligent Agents.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec2_Intelligent%20Agents.pdf) 🕵️
- Search (Uninformed & Informed):  
  - [Lec3_Search & Uninformed Search.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec3_Search%20%26%20Uninformed%20Search.pdf) 🔎  
  - [Lec4_Informed Search.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec4_Informed%20Search.pdf) 🗺️
- Adversarial Search: [Lec5_Adversarial Search.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec5_Adversarial%20Search.pdf) ♟️
- Constraint Satisfaction Problems: [Lec6_CSP.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec6_CSP.pdf) 🧩
- Local Search: [Lec7_Local Search.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec7_Local%20Search.pdf) 🔧
- Logic: [Lec8_Logic.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec8_Logic.pdf) 📐
- Machine Learning Concepts: [Lec9_Machine Learning Concepts.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec9_Machine%20Learning%20Concepts.pdf) 📊
- Regression Models: [Lec10_Linear Regression & Logistic Regression.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec10_Linear%20Regression%20%26%20Logistic%20Regression.pdf) 📈
- Support Vector Machines: [Lec11_Support Vector Machines.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec11_Support%20Vector%20Machines.pdf) 🧭
- Perceptron & Neural Networks: [Lec12_Perceptron & Neural Networks.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec12_Perceptron%20%26%20Neural%20Networks.pdf) 🧠
- Decision Trees & Naive Bayes: [Lec13_Decision Tree & Naive Bayes.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec13_Decision%20Tree%20%26%20Naive%20Bayes.pdf) 🌳🕊️
- Ensemble Methods & Clustering: [Lec14_Ensemble & Clustering.pdf](https://github.com/csgrace/Artificial_Intelligence/blob/main/lecture/Lec14_Ensemble%20%26%20Clustering.pdf) 🧱🔗

Notes (CN): [上古笔记/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lecture/%E4%B8%8A%E5%8F%A4%E7%AC%94%E8%AE%B0), [笔记/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lecture/%E7%AC%94%E8%AE%B0) 📝

---

### Labs (Hands-on Practice) 🧪
Step-by-step exercises for applying AI concepts:
- Lab series: [lab1/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lab/lab1) → [lab14/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lab/lab14)  
- Intermediate modules include: [lab2/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lab/lab2), [lab3/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lab/lab3), [lab5/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lab/lab5), [lab6&7/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lab/lab6%267), [lab8/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lab/lab8), [lab9/](https://github.com/csgrace/Artificial_Intelligence/tree/main/lab/lab9)  
Ideal for reinforcing search algorithms, optimization, logic, and ML workflows. 🔁

---

### Projects (Applied AI) 🧩

#### Project 1 — Othello/Reversi AI ♟️
- Goal: Implement a strong Othello (Reversi) playing agent.
- Core methods:
  - Alpha–Beta search with iterative deepening ⏱️
  - Rollout-based evaluation with UCB (MCTS-style) exploration constants
  - Heuristic evaluation: positional weight matrix, mobility, frontier, parity
  - Dynamic strategy: corner prioritization, X/C-square penalties, flip-weight tuning
  - Practical optimizations: move ordering, caching, early-stop in rollouts
- Time management: hard time cap per move (approx. 5s) with a safety buffer.
- Folder: [project/project1/](https://github.com/csgrace/Artificial_Intelligence/tree/main/project/project1)

Tip: Start from `game.py` to see search switches (e.g., `ENABLE_AB_ITERATIVE`, `UCB_C_*`, rollout epsilon) and the positional matrix.

---

#### Project 2 — Adult Census Income Prediction 📊
- Task: Binary classification of annual income (Adult Census Income dataset: “>50K” vs “<=50K”).
- Pipeline highlights:
  - Data handling: column normalization, imputations, one-hot encoding for categoricals, scaling for numericals
  - Models: Logistic Regression, SVM, Random Forest, Gradient Boosting, HistGradientBoosting, KNN, Decision Tree, MLP, optional XGBoost
  - Training: fixed train/valid/internal-test split; parallel jobs; reproducible seeds
  - Evaluation: accuracy, precision, recall, F1, ROC-AUC; confusion matrix and ROC plots; predictions saved to files
  - CLI defaults: expects `traindata.csv`, `trainlabel.txt`, `testdata.csv` colocated with `project2.py`
- Quick start:
  - Place data files next to `project2.py`, then run:
    - `python project2.py`
- Folders:
  - Project root: [project/project2/](https://github.com/csgrace/Artificial_Intelligence/tree/main/project/project2)
  - Code and detailed guide: [project2/code/readme.md](https://github.com/csgrace/Artificial_Intelligence/blob/main/project/project2/12311043_%E9%AD%8F%E5%AE%87%E6%B8%85/code/readme.md)


---


Happy learning and building intelligent systems! ✨🤖
