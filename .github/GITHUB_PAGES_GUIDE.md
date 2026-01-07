# 🚀 GitHub Pages 部署指南

本項目已配置為自動部署到 GitHub Pages。

## 📋 前置條件

- GitHub 帳戶
- 本項目的 Fork 副本
- Git 已安裝

## ⚙️ 配置步驟

### 1. 啟用 GitHub Pages

#### 方法 A：自動部署（推薦）
```bash
# 推送代碼到 main 分支
git push origin main

# GitHub 會自動通過 Actions 部署
# 訪問 https://yourusername.github.io/iron-man-vision-controller/
```

#### 方法 B：手動配置
1. 進入你的倉庫
2. 點擊 **Settings**
3. 左側菜單找到 **Pages**
4. 在 "Source" 下選擇 **Deploy from a branch**
5. 選擇 **main** 分支
6. 點擊 **Save**

### 2. 驗證部署

1. 進入 **Actions** 標籤
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待部署完成（綠色對勾）
4. 訪問你的網站：
   ```
   https://yourusername.github.io/iron-man-vision-controller/
   ```

## 🔧 自定義設置

### 改變項目名稱

如果你的倉庫名稱不是 `iron-man-vision-controller`，需要更新路徑。

在 `index.html` 和所有文件中，確保路徑正確：

```html
<!-- 如果在子目錄中 -->
<link rel="stylesheet" href="/iron-man-vision-controller/css/styles.css">
<script src="/iron-man-vision-controller/js/app.js"></script>
```

### 自定義域名

1. 添加 CNAME 記錄到你的 DNS
2. 在 GitHub Pages 設置中輸入域名
3. 驗證所有權

### 關閉 Pages 部署

如果你想禁用 GitHub Pages：
1. 進入 Settings → Pages
2. 在 "Source" 下選擇 **None**

## 📊 部署狀態

### 查看部署狀態

1. 進入 **Actions** 標籤
2. 查看工作流執行情況
3. 點擊最新的執行查看詳細信息

### 部署日誌

```bash
# 克隆倉庫
git clone https://github.com/yourusername/iron-man-vision-controller.git

# 查看提交歷史
git log

# 查看遠程分支
git branch -r
```

## 🔐 安全和隱私

### 環境變量
不要提交敏感信息：
- API 密鑰
- 個人令牌
- 密碼

### GitHub Actions 機密

如果需要使用敏感信息，使用 GitHub Actions 機密：
1. 進入 Settings → Secrets
2. 點擊 "New repository secret"
3. 添加密鑰和值

## 🐛 故障排除

### Pages 不顯示

**問題：** 訪問網址看不到內容

**解決：**
1. 檢查 Actions 部署是否成功
2. 驗證倉庫名稱和分支名稱
3. 清除瀏覽器緩存
4. 等待 10 分鐘讓 DNS 傳播

### 404 錯誤

**問題：** 只有主頁工作，其他頁面 404

**解決：**
1. 檢查文件是否存在
2. 驗證路徑大小寫
3. 確保 index.html 路徑正確

### 樣式未應用

**問題：** 頁面加載但沒有樣式

**解決：**
1. 檢查 CSS 路徑
2. 在瀏覽器開發者工具檢查錯誤
3. 驗證 CSS 文件是否在倉庫中

### 攝像頭無法訪問

**問題：** GitHub Pages 上攝像頭無法工作

**解決：**
- GitHub Pages 使用 HTTPS
- MediaPipe 需要 HTTPS（已配置）
- 檢查瀏覽器攝像頭權限

## 📈 分析

### 查看訪問量

1. 進入 Settings → Pages
2. 查看訪問統計（如果啟用）

### Google Analytics

添加 Google Analytics 追蹤：
```html
<!-- 在 index.html 中添加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🔄 持續集成

### GitHub Actions

項目包含 `.github/workflows/pages.yml` 配置：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  build:
    runs-on: ubuntu-latest
    # ... 工作流程
```

這會在每次推送到 main 分支時自動部署。

## 🌐 SEO 優化

### 元標籤

在 `index.html` 中已包含：
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta property="og:title" content="...">
<meta property="og:image" content="...">
```

### Sitemap

將 `sitemap.xml` 添加到根目錄：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourusername.github.io/iron-man-vision-controller/</loc>
    <lastmod>2026-01-07</lastmod>
  </url>
</urlset>
```

## 📚 更多信息

- [GitHub Pages 官方文檔](https://docs.github.com/en/pages)
- [GitHub Actions 文檔](https://docs.github.com/en/actions)
- [Jekyll 配置](https://jekyllrb.com/)

## 💡 提示

### 快速檢查部署
```bash
# 在本地測試
python -m http.server 8000

# 訪問並測試所有功能
# http://localhost:8000
```

### 生成徽章

在 README 中添加狀態徽章：
```markdown
[![Deploy Status](https://github.com/yourusername/iron-man-vision-controller/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/yourusername/iron-man-vision-controller/actions)
```

---

**你的項目現在已在線！** 🎉

分享你的應用鏈接，讓更多人使用它！
