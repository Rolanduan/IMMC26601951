# 🚀 超简单 Overleaf 恢复步骤
## 3 分钟解决，保证成功

---

## 📋 第一步：打开 Overleaf 并清空项目

1. 打开：https://www.overleaf.com/project/69a82876035a02b80e03195d
2. 如果有旧文件，**全部删除**（点击每个文件右侧的 "..." → Delete）

---

## 📋 第二步：设置编译器（必须先做！）

1. 点击左上角 **"Menu"** 按钮
2. 选择 **"Settings"**
3. 找到 **"Compiler"** 下拉菜单
4. 选择：✅ **XeLaTeX**
5. 点击 **"Save"** 按钮
6. 关闭设置窗口

**⚠️ 这一步最重要！不设置 XeLaTeX 会编译失败！**

---

## 📋 第三步：创建 main.tex

1. 点击左上角 **"New File"** 按钮
2. 文件名输入：`main.tex`
3. 复制以下内容，粘贴到编辑器：

```latex
\documentclass[10pt,a4paper]{article}

% ============================================================================
% PACKAGES
% ============================================================================
\usepackage[top=2cm, bottom=2cm, left=1.8cm, right=1.8cm]{geometry}
\usepackage{amsmath,amssymb,amsthm}
\usepackage{booktabs}
\usepackage{xcolor}

% CRITICAL: pgfplots for scientific figures
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}
\usepgfplotslibrary{fillbetween}
\usepgfplotslibrary{statistics}

% CRITICAL: TikZ with all required libraries
\usepackage{tikz}
\usetikzlibrary{shapes,arrows,positioning,fit,calc,shadows,trees,matrix}
\usetikzlibrary{decorations.pathreplacing,decorations.markings}
\usetikzlibrary{arrows.meta,backgrounds}
\usetikzlibrary{intersections,through}

% CRITICAL: Load hyperref LAST
\usepackage[colorlinks=true,linkcolor=blue,citecolor=blue,urlcolor=blue]{hyperref}

% ============================================================================
% DOCUMENT INFO
% ============================================================================
\title{Protecting Wildlife at Scale:\\Strategic Resource Allocation for Etosha National Park}
\author{Team IMMC26601951\\Control Number: IMMC26601951}
\date{March 6, 2026}

\begin{document}

\maketitle

\section{Introduction}

We present a six-layer mathematical framework for optimizing wildlife protection in Etosha National Park, Namibia—a 22,935 km$^2$ reserve facing persistent poaching threats with limited resources.

\subsection{Key Results}

Our optimization demonstrates substantial improvements over uniform distribution:

\begin{table}[h]
\centering
\small
\begin{tabular}{lccc}
\toprule
\textbf{Metric} & \textbf{Uniform} & \textbf{Strategic} & \textbf{Improvement} \\
\midrule
High-Priority Species Protection & 62\% & \textbf{89\%} & +27 pp \\
Critical Area Coverage & 58\% & \textbf{94\%} & +36 pp \\
Threat Detection Rate & 55\% & \textbf{81\%} & +26 pp \\
Ranger Efficiency & 180 km$^2$/ranger & \textbf{320 km$^2$/ranger} & +78\% \\
\bottomrule
\end{tabular}
\end{table}

\subsection{Six-Layer Framework}

\begin{enumerate}
    \item \textbf{AHP-Fuzzy Protection Definition}: Quantifies conservation priorities
    \item \textbf{Graph-Theoretic Spatial Network}: Models accessibility and response times
    \item \textbf{Integer Programming (MILP)}: Optimizes resource allocation
    \item \textbf{Dynamic Programming + Queueing}: Analyzes temporal patterns and staffing
    \item \textbf{Monte Carlo Simulation}: Tests robustness under uncertainty
    \item \textbf{Game-Theoretic Deterrence}: Models adversarial adaptation
\end{enumerate}

\section{Model}

We define multi-dimensional protection as:

\begin{equation}
P_i = 0.50 \times \text{Ecology}_i + 0.30 \times \text{Threat}_i + 0.15 \times \text{Operations}_i + 0.05 \times \text{Seasonality}_i
\label{eq:protection}
\end{equation}

The optimization problem:

\begin{equation}
\max_{x_{ijk},y_{ij},z_{ik}} \sum_{i \in \mathcal{Z}} \pi_i \cdot P_i
\label{eq:objective}
\end{equation}

subject to budget, personnel, and coverage constraints.

\section{Results}

Optimal deployment requires 127 rangers (31\% reduction from baseline) with 3-shift rotation, achieving 89\% species protection and 94\% area coverage.

Monte Carlo validation (10,000 trials): System protection 90.8\% $\pm$ 2.4\%, 95\% CI [86.2\%, 94.9\%].

\section{Conclusion}

Our framework demonstrates that priority-based strategic allocation outperforms uniform distribution by 27-36 percentage points across all conservation metrics while using 31\% fewer personnel.

\end{document}
```

4. 点击 **"Save"** 按钮（或按 Ctrl+S）

---

## 📋 第四步：测试编译

1. 点击页面左上角的 **"Recompile"** 按钮
2. 等待 10-20 秒

**✅ 如果成功：**
- PDF 自动显示（约 1-2 页）
- 右下角 Logs 显示 "Output written"

**❌ 如果失败：**
- 检查编译器是否设置为 XeLaTeX（第二步）
- 查看红色错误消息

---

## 📋 第五步：上传完整文件（可选）

如果测试成功，现在上传完整论文：

### 5.1 创建 sections/ 文件夹

1. 在左侧文件列表，点击 **"New Folder"**
2. 命名：`sections`

### 5.2 上传本地文件

从本地文件夹复制粘贴：
```
d:\BaiduSyncdisk\为明相关\2. 国际部\学术体系\数学建模\IMMC26601951\sections\
```

需要上传的 10 个文件：
```
00_summary_sheet.tex
01_introduction.tex
02_model.tex
03_solution.tex
04_results.tex
05_robustness.tex
06_validation.tex
07_conclusion.tex
fig_framework.tex
letter_to_immc.tex
```

**操作方法：**
1. 在 sections/ 文件夹中点击 **"New File"**
2. 输入文件名（例如：01_introduction.tex）
3. 从本地打开对应的 .tex 文件
4. 复制全部内容（Ctrl+A, Ctrl+C）
5. 粘贴到 Overleaf（Ctrl+V）
6. 点击 **"Save"**
7. 重复以上步骤，直到 10 个文件全部上传

### 5.3 更新 main.tex

用完整的 main.tex 替换测试版本：

1. 打开本地文件：`main.tex`
2. 复制全部内容
3. 在 Overleaf 中，删除 main.tex 的测试内容
4. 粘贴完整的 main.tex 内容
5. 点击 **"Save"**
6. 点击 **"Recompile"**

### 5.4 上传 references.bib

1. 在根目录创建 **"New File"**
2. 命名：`references.bib`
3. 从本地复制内容，粘贴，保存

---

## ✅ 验证成功

完整上传后检查：

```
✅ 文件列表：12 个文件
  - main.tex
  - references.bib
  - sections/00_summary_sheet.tex
  - sections/01_introduction.tex
  - sections/02_model.tex
  - sections/03_solution.tex
  - sections/04_results.tex
  - sections/05_robustness.tex
  - sections/06_validation.tex
  - sections/07_conclusion.tex
  - sections/fig_framework.tex
  - sections/letter_to_immc.tex

✅ 编译器：XeLaTeX

✅ PDF 生成：约 28 页

✅ 图表显示：7 个图表
```

---

## 🎯 快速参考

### 本地文件位置
```
d:\BaiduSyncdisk\为明相关\2. 国际部\学术体系\数学建模\IMMC26601951\
```

### Overleaf 项目
```
https://www.overleaf.com/project/69a82876035a02b80e03195d
```

### GitHub 仓库
```
https://github.com/Rolanduan/IMMC26601951
```

---

## 💡 提示

1. **编译器设置最重要** - 必须是 XeLaTeX！
2. **先测试小文件** - 用简化版 main.tex 测试编译
3. **逐步上传** - 一次上传一个文件，每次都编译测试
4. **复制粘贴最保险** - 虽然慢但不会失败

---

**⏱️ 预计时间：**
- 测试版本：2 分钟
- 完整版本：10-15 分钟（需要复制粘贴 12 个文件）

**🎯 优点：**
- ✅ 不依赖 GitHub 集成功能
- ✅ 100% 可行
- ✅ 完全手动控制
- ✅ 出错容易排查

**💪 现在就开始吧！第一步：设置编译器为 XeLaTeX！**
