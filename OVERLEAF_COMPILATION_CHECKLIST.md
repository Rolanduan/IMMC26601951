# 📋 Overleaf 编译检查清单
## IMMC26601951 - Etosha National Park Protection

**上传后立即检查以下项目：**

---

## 🔍 第一阶段：包依赖检查（编译前）

### ✅ 检查 main.tex 中的关键包
```latex
% 必须包含的包：
\usepackage{pgfplots}                    ← 必需！
\pgfplotsset{compat=1.18}                ← 必需！
\usepgfplotslibrary{fillbetween}         ← 必需！（置信区间）
\usepgfplotslibrary{statistics}          ← 必需！（统计图表）

\usepackage{tikz}                        ← 必需！
\usetikzlibrary{shapes,arrows,positioning,fit,calc,shadows,trees,matrix}
\usetikzlibrary{decorations.pathreplacing,decorations.markings}
\usetikzlibrary{arrows.meta,backgrounds}
\usetikzlibrary{intersections,through}   ← 新增！

\usepackage{hyperref}                    ← 推荐（超链接）
```

### ❌ 如果缺少 pgfplots，会出现：
```
! LaTeX Error: File `pgfplots.sty' not found.
```
**解决:** 在 Overleaf 中，Menu → Settings → Compiler 选择 **XeLaTeX** 或 **LuaLaTeX**

---

## 📊 第二阶段：图表渲染检查（编译后）

### ✅ 应该正确显示的 7 个图表

| # | 图表名称 | 位置 | 检查要点 |
|---|---------|------|---------|
| 1 | **六层框架图** | Introduction (Fig. 1) | 6 层彩色框，箭头，反馈循环 |
| 2 | **多阶段决策层次** | Solution Method | 5 级决策树，时间注释 |
| 3 | **适应度收敛曲线** | Solution Method | 4 条曲线 + 95% 置信带 |
| 4 | **区域覆盖率对比** | Results | 分组柱状图，改进注释 |
| 5 | **情景树分析** | Robustness | 树形图，概率标注，侧边面板 |
| 6 | **帕累托前沿** | Robustness | 3 条曲线，最优点标注 |
| 7 | **对抗响应曲线** | Validation | 威慑区域，纳什均衡点 |

### ❌ 如果图表显示为空白或错误：
```
! Package pgfplots Error: Could not read plot file
```
**可能原因:**
1. pgfplots 版本问题 → 设置 `\pgfplotsset{compat=1.18}`
2. 坐标数据错误 → 检查 `\addplot coordinates {}`
3. 库缺失 → 添加 `\usepgfplotslibrary{fillbetween}`

---

## 🔢 第三阶段：方程编号检查

### ✅ 应该连续编号的方程

**Model Construction (Section 2):**
```
Equation (1):  Pairwise comparison matrix
Equation (2):  AHP weight calculation
Equation (3):  Consistency verification
Equation (4):  Etosha weights
Equation (5):  Fuzzy protection evaluation ⭐
Equation (6):  Membership function
Equation (7):  Protection level classification
Equation (8):  Species priority
Equation (9):  Protection gap
Equation (10): Priority ranking
Equation (11): Accessibility matrix
Equation (12): Response time
Equation (13)-(15): Decision variables
Equation (16): Multi-objective optimization
Equation (17)-(19): Resource constraints
Equation (20): Coverage requirement
Equation (21)-(22): Temporal constraints
Equation (23): Budget constraint
Equation (24): Weighted protection ⭐
Equation (25): Gap minimization
```

**检查方法:**
- 所有引用应该像 `Equation (5)` 或 `Eq. (5)`
- 点击引用应该跳转到正确的方程
- 所有方程编号应该连续，无跳跃

---

## 📝 第四阶段：交叉引用检查

### ✅ 测试所有引用链接

**在 PDF 中点击以下引用，应该正确跳转：**

1. **图表引用**
   - [ ] `Fig.~\ref{fig:framework}` → 跳转到六层架构图
   - [ ] 所有其他 `\ref{fig:...}` 引用

2. **方程引用**
   - [ ] `Equation~\ref{eq:fuzzy_protection}` → 跳转到 Eq. (5)
   - [ ] `Equation~\ref{eq:weighted_protection}` → 跳转到 Eq. (24)
   - [ ] 所有其他 `\ref{eq:...}` 引用

3. **表格引用**
   - [ ] 所有 `\ref{tab:...}` 引用

### ❌ 如果引用显示为 `??`
**原因:** 标签未定义或拼写错误
**解决:** 检查 `\label{...}` 和 `\ref{...}` 是否一致

---

## 🎯 第五阶段：内容完整性检查

### ✅ 必需内容清单

**摘要页 (1 页)**
- [ ] Problem Understanding
- [ ] Our Approach (6-layer framework)
- [ ] Key Results table
- [ ] Key Recommendations
- [ ] Control Number: IMMC26601951

**绪论 (2 页)**
- [ ] 问题背景和挑战
- [ ] 六层框架图 (Fig. 1)
- [ ] 关键结果预览
- [ ] 创新贡献声明

**模型构建 (4-5 页)**
- [ ] 4.1 保护定义 (AHP + 模糊评价)
- [ ] 4.2 空间表示 (图论)
- [ ] 4.3 资源分配 (MILP)
- [ ] 25 个方程，清晰推导

**求解方法 (3-4 页)**
- [ ] 整数规划核心
- [ ] 动态规划时序
- [ ] GA 求解器参数表
- [ ] 收敛性图 (95% 置信带)

**结果分析 (3-4 页)**
- [ ] 排队模型 (M/M/c)
- [ ] 人员推断 (127 护林员)
- [ ] 覆盖率对比图
- [ ] 物种保护表

**鲁棒性 (3-4 页)**
- [ ] 蒙特卡洛模拟 (10,000 次)
- [ ] 情景树图
- [ ] 帕累托前沿图
- [ ] 资源变异 ±30%

**验证 (3-4 页)**
- [ ] 博弈论验证 (Stackelberg)
- [ ] 对抗响应曲线图
- [ ] 跨洲验证 (4 大洲)
- [ ] 5 折交叉验证

**结论 (2 页)**
- [ ] 5 点贡献
- [ ] 5 点建议
- [ ] 局限性说明
- [ ] 未来工作

---

## 🚨 常见编译错误及解决

### 错误 1: `! Package pgfplots Error: compat level not set`
```
! Package pgfplots Error: This document requires a newer version of pgfplots.
```
**解决:** 已在 main.tex 添加 `\pgfplotsset{compat=1.18}`

### 错误 2: `! Package pgfplots Error: Could not read plot file`
```
! Package pgfplots Error: Could not read plot file [filename]
```
**解决:** 检查 `\addplot coordinates {}` 中的数据格式

### 错误 3: `! Undefined control sequence \draw`
```
! Undefined control sequence \draw
l.100 \draw[dashed] (axis cs:0, 4.7)
```
**解决:** 已添加完整的 TikZ 库到 main.tex

### 错误 4: `! Reference undefined`
```
LaTeX Warning: Reference `eq:protection' on page X undefined
```
**解决:** 已修复所有断开的引用

### 错误 5: `! Missing $ inserted`
```
! Missing $ inserted.
<inserted text>
                $
l.50 \sum_{i} x_{i}
```
**解决:** 确保所有数学符号在 `$ ... $` 或 `\( ... \)` 中

---

## 📤 Overleaf 上传步骤

### 第一步：创建新项目
1. 访问 https://www.overleaf.com
2. 点击 "New Project" → "Upload Project"
3. 选择 **XeLaTeX** 或 **LuaLaTeX** 编译器

### 第二步：上传文件
```
必须上传的文件（11 个）:
✅ main.tex
✅ sections/00_summary_sheet.tex
✅ sections/01_introduction.tex
✅ sections/02_model.tex
✅ sections/03_solution.tex
✅ sections/04_results.tex
✅ sections/05_robustness.tex
✅ sections/06_validation.tex
✅ sections/07_conclusion.tex
✅ sections/letter_to_immc.tex
✅ sections/fig_framework.tex

可选文件:
📁 figures/*.png（如果已在 Overleaf 生成就不需要）
```

### 第三步：编译
1. 点击 "Recompile" 按钮
2. 等待编译完成（约 10-30 秒）
3. 检查 "Logs" 是否有错误

### 第四步：验证
1. 下载生成的 PDF
2. 逐项检查本清单的所有项目
3. 确认所有图表、方程、引用正确

---

## ✅ 最终验证清单

编译成功后，逐项确认：

**PDF 基本信息**
- [ ] 文件大小合理（< 10 MB）
- [ ] 页数合理（20-25 页）
- [ ] 封面标题正确
- [ ] 控制号显示：IMMC26601951

**图表检查**
- [ ] Fig. 1: 六层框架图清晰可见
- [ ] Fig. 2: 多阶段决策层次清晰
- [ ] Fig. 3: 适应度收敛曲线（含置信带）
- [ ] Fig. 4: 覆盖率对比柱状图
- [ ] Fig. 5: 情景树分析图
- [ ] Fig. 6: 帕累托前沿图
- [ ] Fig. 7: 对抗响应曲线图

**数学检查**
- [ ] 所有方程编号连续
- [ ] 所有数学符号清晰
- [ ] 所有分数显示正确
- [ ] 所有希腊字母正确

**格式检查**
- [ ] 页边距一致
- [ ] 字体大小一致
- [ ] 行距一致
- [ ] 表格格式规范

**内容检查**
- [ ] 无拼写错误
- [ ] 无语法错误
- [ ] 无逻辑矛盾
- [ ] 无数据不一致

---

## 🎓 提交前最终确认

```
□ 所有图表正确显示
□ 所有方程编号连续
□ 所有引用链接有效
□ 无编译错误
□ 无编译警告
□ 控制号正确
□ 日期正确
□ 摘要页完整
□ 结论页完整
□ 给评委的信完整
```

**如果以上所有项都打勾 ✅，则可以提交！**

---

**检查清单版本:** v1.0
**最后更新:** 2026-03-05
**适用项目:** IMMC26601951
