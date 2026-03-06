# 🔧 Overleaf 项目恢复和 GitHub 同步指南
## 解决 Overleaf 空白项目问题

---

## 🎯 问题诊断

**当前状态：**
- ✅ GitHub 仓库正常：https://github.com/Rolanduan/IMMC26601951（12 个 LaTeX 文件）
- ❌ Overleaf 项目空白或无法同步：https://www.overleaf.com/project/69a82876035a02b80e03195d

**目标：** 将 GitHub 的内容重新导入 Overleaf

---

## 🚀 方案一：在现有项目中强制重新导入（推荐）

### 第一步：打开 Overleaf 项目

1. 访问：https://www.overleaf.com/project/69a82876035a02b80e03195d
2. 登录 Overleaf 账户

### 第二步：清理现有内容（如果有）

如果项目中有残留文件：

1. 删除所有现有文件（逐个删除或批量删除）
2. 确保项目空白

### 第三步：通过 GitHub 重新导入

#### 方法 A：使用 Menu 中的 GitHub 选项

1. 点击左上角 **"Menu"** 按钮
2. 在菜单中查找 **"GitHub"** 相关选项：
   - **"Link a GitHub repository"**
   - 或 **"Connect to GitHub"**
   - 或 **"Import from GitHub"**
3. 点击该选项

#### 方法 B：如果找不到 GitHub 选项

1. 点击左上角 **"Menu"**
2. 找到 **"Settings"**
3. 在 Settings 页面查找 **"GitHub integration"** 或类似选项
4. 点击连接/导入

### 第四步：输入 GitHub 仓库地址

Overleaf 会要求输入仓库地址，输入：

```
https://github.com/Rolanduan/IMMC26601951
```

或者简写：

```
Rolanduan/IMMC26601951
```

### 第五步：授权和确认

1. 如果首次使用，Overleaf 会要求授权访问 GitHub
2. 点击 **"Authorize"** 或 **"Allow"**
3. 登录 GitHub 账户（如果未登录）
4. 确认要导入的仓库

### 第六步：导入文件

1. 点击 **"Import"** 或 **"Pull from GitHub"**
2. 等待文件导入（几秒钟）
3. 文件应该出现在左侧文件列表中

### 第七步：设置编译器（关键！）

1. 点击左上角 **"Menu"**
2. 选择 **"Settings"**
3. 找到 **"Compiler"** 选项
4. 选择：✅ **XeLaTeX**
5. 点击 **"Save"**

### 第八步：编译测试

1. 点击页面左上角的 **"Recompile"** 按钮
2. 等待 10-30 秒
3. 查看 PDF 是否生成

---

## 🆕 方案二：创建全新的 Overleaf 项目（备选）

如果现有项目无法修复，创建新项目：

### 第一步：创建新项目

1. 访问 https://www.overleaf.com
2. 点击 **"New Project"** 按钮（通常在右上角）
3. 选择 **"Import from GitHub"** 选项

### 第二步：输入 GitHub 仓库

```
https://github.com/Rolanduan/IMMC26601951
```

或者：`Rolanduan/IMMC26601951`

### 第三步：创建并设置

1. 点击 **"Create"** 或 **"Import"**
2. 项目创建后，立即设置编译器：
   - Menu → Settings → Compiler → **XeLaTeX** → Save
3. 点击 **"Recompile"** 测试

### 第四步：（可选）删除旧项目

如果新项目正常工作，可以删除旧项目：
1. 在旧项目页面
2. Menu → Settings → **"Delete project"**

---

## 🔧 方案三：手动上传文件（最后手段）

如果 GitHub 导入失败，手动上传：

### 第一步：下载 GitHub 仓库

1. 访问：https://github.com/Rolanduan/IMMC26601951
2. 点击绿色的 **"Code"** 按钮
3. 选择 **"Download ZIP"**
4. 解压到本地文件夹

### 第二步：在 Overleaf 创建文件结构

1. 打开 Overleaf 项目
2. 创建 `main.tex` 文件：
   - 点击 **"New File"**
   - 命名：`main.tex`
   - 复制本地 main.tex 内容，粘贴，保存

3. 创建 `sections/` 文件夹：
   - 点击 **"New Folder"**
   - 命名：`sections`

4. 创建所有 sections/*.tex 文件：
   - 在 sections/ 文件夹中点击 **"New File"**
   - 逐个创建：
     ```
     sections/00_summary_sheet.tex
     sections/01_introduction.tex
     sections/02_model.tex
     sections/03_solution.tex
     sections/04_results.tex
     sections/05_robustness.tex
     sections/06_validation.tex
     sections/07_conclusion.tex
     sections/fig_framework.tex
     sections/letter_to_immc.tex
     ```
   - 从本地复制内容，粘贴，保存

5. 创建 `references.bib`：
   - 在根目录创建文件
   - 复制本地 references.bib 内容

### 第三步：设置编译器

Menu → Settings → Compiler → **XeLaTeX** → Save

### 第四步：编译测试

点击 **"Recompile"** 按钮

---

## ✅ 验证导入成功

### 检查清单

```
✅ 文件结构正确：
   ☑ main.tex
   ☑ references.bib
   ☑ sections/00_summary_sheet.tex
   ☑ sections/01_introduction.tex
   ☑ sections/02_model.tex
   ☑ sections/03_solution.tex
   ☑ sections/04_results.tex
   ☑ sections/05_robustness.tex
   ☑ sections/06_validation.tex
   ☑ sections/07_conclusion.tex
   ☑ sections/fig_framework.tex
   ☑ sections/letter_to_immc.tex

✅ 编译器设置：XeLaTeX

✅ 编译成功：PDF 生成（约 28 页）

✅ 图表显示：7 个图表全部正常
```

---

## 🚨 常见问题解决

### 问题 1：找不到 "Import from GitHub" 选项

**可能原因：**
- Overleaf 账户类型限制
- 浏览器问题
- Overleaf 界面更新

**解决方案：**
1. 刷新页面（Ctrl+F5）
2. 清除浏览器缓存
3. 尝试不同浏览器（Chrome, Firefox, Edge）
4. 使用方案三手动上传

### 问题 2：GitHub 授权失败

**解决方案：**
1. 退出 Overleaf 和 GitHub 账户
2. 重新登录 Overleaf
3. 重新尝试 GitHub 导入
4. 检查 GitHub 账户是否启用了双因素认证（可能需要个人访问令牌）

### 问题 3：导入后编译失败

**最可能原因：** 编译器不是 XeLaTeX

**解决方案：**
1. Menu → Settings → Compiler → **XeLaTeX**
2. 点击 Save
3. 点击 Recompile（可能需要编译两次）

### 问题 4：文件导入不完整

**解决方案：**
1. 检查 GitHub 仓库是否包含所有文件
2. 尝试重新导入
3. 或使用方案三手动补充缺失文件

---

## 🎯 推荐操作顺序

### 优先级排序

```
1️⃣ 方案一：在现有项目中重新导入（最快）
   └─ 适合：GitHub 集成功能正常

2️⃣ 方案二：创建新项目（最干净）
   └─ 适合：现有项目有问题

3️⃣ 方案三：手动上传（最保险）
   └─ 适合：GitHub 导入失败
```

---

## 📞 如果所有方案都失败

### 检查以下几点

1. **GitHub 仓库是否公开？**
   - 访问 https://github.com/Rolanduan/IMMC26601951
   - 确认能看到文件列表

2. **Overleaf 账户状态？**
   - 确认账户正常
   - 检查是否有权限限制

3. **网络连接？**
   - 确保能访问 GitHub 和 Overleaf
   - 尝试更换网络环境

4. **Overleaf 项目配额？**
   - 免费账户有项目数量限制
   - 检查是否达到上限

---

## 🔗 重要链接

- **GitHub 仓库：** https://github.com/Rolanduan/IMMC26601951
- **Overleaf 项目：** https://www.overleaf.com/project/69a82876035a02b80e03195d
- **Overleaf 帮助文档：** https://www.overleaf.com/learn/how-to/Using_git_and_GitHub_in_Overleaf

---

**💡 建议：先尝试方案一（最简单），如果不行再试方案二（最干净），最后才用方案三（手动上传）。**
