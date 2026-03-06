# 🔗 GitHub 到 Overleaf 自动同步设置指南
## IMMC26601951 项目

---

## 🎯 目标

将 GitHub 仓库 https://github.com/Rolanduan/IMMC26601951 自动同步到 Overleaf 项目
https://www.overleaf.com/project/69a82876035a02b80e03195d

---

## 📋 方法一：使用 Overleaf 的 GitHub 集成（推荐）

### 第一步：打开 Overleaf 项目

1. 访问：https://www.overleaf.com/project/69a82876035a02b80e03195d
2. 登录您的 Overleaf 账户

### 第二步：连接 GitHub 仓库

1. 在 Overleaf 项目页面，点击左上角 **"Menu"** 按钮
2. 在菜单中找到 **"GitHub"** 选项
3. 点击 **"Link a GitHub repository"** 或 **"Connect to GitHub"**

### 第三步：授权 Overleaf 访问 GitHub

1. 如果是第一次使用，Overleaf 会要求您授权访问 GitHub
2. 点击 **"Authorize Overleaf"** 按钮
3. 登录您的 GitHub 账户（如果未登录）
4. 授权 Overleaf 访问您的仓库

### 第四步：选择要同步的仓库

1. 在仓库列表中找到 **"IMMC26601951"** 仓库
2. 或者直接输入仓库地址：`Rolanduan/IMMC26601951`
3. 点击 **"Link"** 或 **"Connect"**

### 第五步：设置同步选项

#### 选项 A：自动同步（需要 Overleaf Premium 或 Overleaf Professional 计划）

如果您的账户支持自动同步：
- ✅ 勾选 **"Auto-sync"** 选项
- 选择同步方向：
  - **GitHub → Overleaf**（推荐）：GitHub 更新自动推送到 Overleaf
  - **Overleaf → GitHub**：Overleaf 更新自动推送到 GitHub
  - **双向同步**：两边都更新时合并

#### 选项 B：手动同步（免费账户）

如果使用免费账户：
- 点击 **"Sync from GitHub"** 按钮：从 GitHub 拉取最新更改
- 点击 **"Push to GitHub"** 按钮：将 Overleaf 更改推送到 GitHub

### 第六步：首次同步

1. 选择 **"Fetch from GitHub"** 或 **"Pull from GitHub"**
2. Overleaf 会从 GitHub 导入所有文件
3. 确认导入成功

### 第七步：设置编译器（重要！）

导入后，确保编译器设置为 **XeLaTeX**：
1. Menu → Settings → Compiler
2. 选择：✅ **XeLaTeX**
3. 点击 Save

---

## 📋 方法二：重新创建项目并导入（备选）

如果现有项目有问题，可以创建新项目：

### 第一步：在 Overleaf 创建新项目

1. 访问 https://www.overleaf.com
2. 点击 **"New Project"**
3. 选择 **"Import from GitHub"**

### 第二步：输入 GitHub 仓库地址

```
https://github.com/Rolanduan/IMMC26601951
```

或者输入：`Rolanduan/IMMC26601951`

### 第三步：设置编译器

1. 创建项目后，立即设置编译器
2. Menu → Settings → Compiler → **XeLaTeX**

---

## 🔄 日常使用工作流

### 工作流 A：在 GitHub 编辑，同步到 Overleaf

```
1. 本地编辑 LaTeX 文件
   ↓
2. Git commit → Push 到 GitHub
   ↓
3. Overleaf 点击 "Sync from GitHub"
   ↓
4. 在 Overleaf 编译查看 PDF
```

### 工作流 B：在 Overleaf 编辑，同步到 GitHub

```
1. 在 Overleaf 编辑文件
   ↓
2. 点击 "Push to GitHub"
   ↓
3. GitHub 仓库更新
   ↓
4. 本地 git pull 获取更改
```

---

## ⚙️ 自动同步设置（如果支持）

### Premium 功能特性

如果您的 Overleaf 账户支持自动同步：

1. **自动同步间隔**
   - 设置为实时或每隔几分钟
   - 推荐：每次保存后自动同步

2. **冲突解决**
   - 如果两边同时修改，Overleaf 会提示冲突
   - 选择保留哪一方的更改

3. **通知设置**
   - 启用邮件通知：GitHub 更新时通知
   - 启用桌面通知（如果支持）

---

## 🚨 常见问题解决

### 问题 1：找不到 GitHub 集成选项

**原因：** Overleaf 版本过旧或账户限制

**解决：**
1. 确认使用的是新版 Overleaf 界面
2. 检查账户是否支持 GitHub 集成
3. 考虑升级到 Premium 计划

### 问题 2：同步后编译失败

**原因：** 编译器设置错误

**解决：**
1. Menu → Settings → Compiler
2. 选择 **XeLaTeX**
3. 重新编译

### 问题 3：同步冲突

**原因：** GitHub 和 Overleaf 同时修改同一文件

**解决：**
1. 选择保留某一方的版本
2. 手动合并更改
3. 避免同时在两边编辑同一文件

### 问题 4：GitHub 更新未显示在 Overleaf

**原因：** 未手动同步或自动同步未启用

**解决：**
1. 点击 **"Sync from GitHub"** 按钮
2. 或启用自动同步（如果账户支持）

---

## ✅ 验证同步成功

### 检查清单

```
□ Overleaf 显示所有 12 个文件：
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

□ 编译器设置为 XeLaTeX

□ 编译成功，PDF 生成（约 28 页）

□ 所有图表显示正常
```

---

## 🎯 推荐工作流程

### 最佳实践：GitHub 主导

```
┌─────────────────────────────────────────────────────────────┐
│ 1. 本地编辑（VS Code / TeXstudio）                           │
│    d:\BaiduSyncdisk\为明相关\2. 国际部\学术体系\数学建模\IMMC26601951 │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Git 提交到本地仓库                                         │
│    git add . && git commit -m "Update paper"                 │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. 推送到 GitHub                                             │
│    git push origin main                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Overleaf 同步（手动或自动）                                │
│    点击 "Sync from GitHub" 按钮                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Overleaf 编译查看 PDF                                      │
│    检查格式、图表、引用                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📞 需要帮助？

### Overleaf 文档

- GitHub 集成：https://www.overleaf.com/learn/how-to/Using_git_and_GitHub_in_Overleaf
- 版本控制：https://www.overleaf.com/learn/how-to/Using_the_History_feature

### GitHub 仓库

```
https://github.com/Rolanduan/IMMC26601951
```

### Overleaf 项目

```
https://www.overleaf.com/project/69a82876035a02b80e03195d
```

---

**🎯 设置完成后，您就可以：**
- ✅ 本地编辑 LaTeX 文件
- ✅ Push 到 GitHub
- ✅ Overleaf 自动获取更新
- ✅ 在 Overleaf 编译查看 PDF

**⚡ 效率提升：无需手动上传文件，Git 工作流自动化！**
