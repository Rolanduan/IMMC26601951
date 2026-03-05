# 🐛 LaTeX 编译错误诊断和修复指南

## 🔍 快速诊断步骤

### 第一步：检查常见编译错误

请在 Overleaf 中查看编译日志（Logs 区域），寻找以下错误模式：

---

## 🚨 常见错误及修复方案

### 错误 1: `! Undefined control sequence`

**可能原因：**
- 命令拼写错误
- 包未加载

**常见位置和修复：**

```latex
❌ 错误示例：
\textcolor{red}{...}  % 如果 xcolor 包未加载

✅ 修复：main.tex 第 18 行已有：
\usepackage{xcolor}
```

---

### 错误 2: `! File `pgfplots.sty' not found`

**症状：**
```
! LaTeX Error: File `pgfplots.sty' not found.
l.27 \usepackage{pgfplots}
```

**修复：**
1. 确认编译器设置为 **XeLaTeX** 或 **LuaLaTeX**
2. 不要使用 pdfLaTeX

**操作：**
```
Menu (左上角) → Settings → Compiler → 选择 XeLaTeX → Save
```

---

### 错误 3: `! Package pgfplots Error: compat level not set`

**症状：**
```
! Package pgfplots Error: This document requires a newer version of pgfplots.
```

**修复：** 已在 main.tex 添加：
```latex
\pgfplotsset{compat=1.18}
```

---

### 错误 4: `! Missing $ inserted`

**症状：**
```
! Missing $ inserted.
<inserted text>
                $
l.50 \sum_{i} x_{i}
```

**原因：** 数学符号在文本模式中

**检查这些位置：**
- sections/02_model.tex (有很多数学公式)
- sections/03_solution.tex
- sections/04_results.tex

**修复示例：**
```latex
❌ 错误：
We use P_i = w ∘ R_i to measure protection.

✅ 修复：
We use $P_i = \mathbf{w} \circ \mathbf{R}_i$ to measure protection.
```

---

### 错误 5: `! Extra }, or forgotten $`

**症状：**
```
! Extra }, or forgotten $.
l.100 ... text }
```

**修复：** 检查数学模式是否正确闭合

```latex
❌ 错误：
$P_i = \mathbf{w} \circ \mathbf{R}_i$ (缺少一个 $)

✅ 修复：
$P_i = \mathbf{w} \circ \mathbf{R}_i$
```

---

### 错误 6: `! Missing } inserted`

**症状：**
```
! Missing } inserted.
<inserted text>
                }
l.50 \begin{equation}
```

**原因：** 环境未正确闭合

**检查：**
- 所有 `\begin{...}` 必须有对应的 `\end{...}`
- 特别检查 `equation`, `itemize`, `enumerate`, `frame`

---

### 错误 7: `! Table line width exceeded`

**症状：**
```
! LaTeX Error: Something went wrong with the table or equation.
```

**修复：** 检查表格列宽

**问题表格可能位置：**
- sections/01_introduction.tex 第 67-81 行（结果对比表）

**修复方案：**
```latex
❌ 如果表格太宽：
\begin{tabular}{lcccc}  % 4 列可能太宽

✅ 修复为：
\begin{tabular}{lccc}   % 减少一列或使用 tabular*
或
\begin{tabularx}{\textwidth}{lXXX}  % 自动调整宽度
```

---

### 错误 8: `! Reference undefined`

**症状：**
```
LaTeX Warning: Reference `fig:framework' on page X undefined
```

**原因：** 图表标签未定义或引用错误

**检查：**
1. sections/fig_framework.tex 中是否有 `\label{fig:framework}`？
2. sections/01_introduction.tex 是否正确引用？

**修复：** 确保定义在引用之前：
```latex
% 在 sections/01_introduction.tex 中
\input{sections/fig_framework}  % 先包含文件
Fig.~\ref{fig:framework}         % 再引用
```

---

### 错误 9: TikZ/pgfplots 语法错误

**症状：**
```
! Package pgfplots Error: Could not read plot file
```

**检查图表代码：**
- sections/03_solution.tex（适应度收敛图）
- sections/05_robustness.tex（情景树、帕累托前沿）
- sections/06_validation.tex（对抗响应曲线）

**常见 TikZ 错误：**
```latex
❌ 错误：
\draw[arrow] (0,0) -- (1,1);  % 如果 arrow 样式未定义

✅ 修复：
\draw[->, >=stealth] (0,0) -- (1,1);
```

---

### 错误 10: `! Missing \begin{document}`

**症状：**
```
! LaTeX Error: Missing \begin{document}.
```

**原因：** 内容在 `\begin{document}` 之前

**修复：** 确保所有内容都在文档环境中

---

## 🔧 特定文件检查

### 检查 sections/01_introduction.tex

**可能问题：**
1. 表格列数过多（4 列可能超出页边距）
2. `\textcolor{red}{...}` 需要确保 xcolor 包已加载

**快速修复：**
```latex
% 如果表格报错，尝试：
\begin{table}[h]
\centering
\small  % 缩小字体
\resizebox{\textwidth}{!}{  % 自动缩放到页宽
\begin{tabular}{lccc}
...
\end{tabular}
}
\end{table}
```

---

### 检查 sections/fig_framework.tex

**这是关键文件！** 包含六层架构图

**如果报错，可能是：**
1. TikZ 语法错误
2. 坐标计算错误
3. 库未加载

**快速测试：**
```latex
% 临时注释掉图表
% \input{sections/fig_framework}

% 如果编译成功，说明问题在图表文件中
```

---

### 检查数学公式

**高风险文件：**
- sections/02_model.tex（86 对 begin/end）
- sections/03_solution.tex（60 对 begin/end）
- sections/04_results.tex（62 对 begin/end）
- sections/05_robustness.tex（60 对 begin/end）
- sections/06_validation.tex（84 对 begin/end）

**数学公式常见错误：**
```latex
❌ 错误：
\mathbf{w} · R_i  % · 可能需要显式空格或 \cdot

✅ 修复：
\mathbf{w} \circ \mathbf{R}_i  % 使用 \circ 符号
```

---

## 💡 快速修复技巧

### 技巧 1：二分法定位错误

1. 注释掉一半内容
2. 尝试编译
3. 如果成功，错误在被注释的部分
4. 如果失败，错误在未被注释的部分

### 技巧 2：简化图表

如果 TikZ 图表报错：
```latex
% 临时替换为简单占位符
\begin{figure}[h]
\centering
\fbox{Framework Diagram (temporarily disabled)}
\caption{Six-layer framework}
\end{figure}
```

### 技巧 3：检查括号匹配

搜索以下模式：
- `[` 和 `]`
- `{` 和 `}`
- `\begin{` 和 `\end{`

---

## 📋 完整修复检查清单

按顺序检查每一项：

```
□ 编译器设置为 XeLaTeX
□ main.tex 编译成功
□ 逐个添加 section 文件：
  ☑ sections/00_summary_sheet.tex
  ☑ sections/01_introduction.tex
  ☑ sections/02_model.tex
  ☑ sections/03_solution.tex
  ☑ sections/04_results.tex
  ☑ sections/05_robustness.tex
  ☑ sections/06_validation.tex
  ☑ sections/07_conclusion.tex
  ☑ sections/letter_to_immc.tex
  ☑ sections/fig_framework.tex
□ 所有图表显示正确
□ 所有方程编号正确
```

---

## 🆘 如果仍然无法编译

### 临时解决方案：最小可编译版本

创建一个简化版本进行测试：

```latex
\documentclass[10pt,a4paper]{article}
\usepackage{amsmath,amssymb}
\usepackage{booktabs}
\usepackage{geometry}
\geometry{top=2cm,bottom=2cm,left=1.8cm,right=1.8cm}

\title{Test Document}
\author{IMMC26601951}
\date{\today}

\begin{document}

\maketitle

\section{Test}
This is a test document to verify basic LaTeX setup.

\section{Math Test}
Test equation: $E = mc^2$

\section{Table Test}
\begin{table}[h]
\centering
\begin{tabular}{lcc}
\toprule
A & B & C \\
\midrule
1 & 2 & 3 \\
\bottomrule
\end{tabular}
\end{table}

\end{document}
```

如果这个简化版本能编译，说明基础设置正确，问题在具体文件中。

---

## 📞 如何向我报告错误

如果您看到编译错误，请提供：

1. **完整的错误消息**
   ```
   ! LaTeX Error: ...
   l.XXX ...  (行号)
   ```

2. **错误所在的文件**
   - main.tex 还是 sections/xxx.tex

3. **编译器设置**
   - XeLaTeX, LuaLaTeX, 还是 pdfLaTeX

4. **错误日志的前 20 行**
   - 从 Logs 区域复制

有了这些信息，我可以精确定位和修复问题！

---

**📌 更新时间:** 2026-03-05
**🎯 目标:** 让您的论文在 Overleaf 上成功编译
