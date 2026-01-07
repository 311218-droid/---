# 🚀 部署和發佈指南

## 本地開發部署

### 步驟 1：準備環境

```bash
# 確保安裝了以下之一：
- Python 3.x
- Node.js LTS
- VS Code + Live Server 插件
```

### 步驟 2：啟動服務器

**選項 A：Python (推薦)**
```bash
cd "d:\嘿嘿嘿"
python -m http.server 8000
```

**選項 B：Node.js**
```bash
cd "d:\嘿嘿嘿"
npx http-server -p 8000
```

**選項 C：VS Code Live Server**
- 右鍵 index.html → Open with Live Server

### 步驟 3：訪問應用

```
http://localhost:8000
```

## 局域網分享

### 步驟 1：查找本機 IP

**Windows:**
```bash
ipconfig
# 查找 IPv4 地址，例如 192.168.1.100
```

**Mac/Linux:**
```bash
ifconfig
# 查找 en0 或 eth0 的 inet 地址
```

### 步驟 2：從其他設備訪問

```
http://YOUR_IP:8000
例如：http://192.168.1.100:8000
```

## 生產環境部署

### 選項 1：Vercel 部署

1. **安裝 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登錄 Vercel**
   ```bash
   vercel login
   ```

3. **部署項目**
   ```bash
   cd "d:\嘿嘿嘿"
   vercel
   ```

4. **配置 vercel.json**
   ```json
   {
     "buildCommand": "echo 'No build required'",
     "outputDirectory": "."
   }
   ```

### 選項 2：GitHub Pages 部署

1. **創建 GitHub 倉庫**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/iron-man-vision-controller.git
   git push -u origin main
   ```

2. **啟用 GitHub Pages**
   - 進入 Repository Settings
   - 找到 GitHub Pages 部分
   - 選擇 "Deploy from a branch"
   - 選擇 main 分支

3. **訪問部署的應用**
   ```
   https://YOUR_USERNAME.github.io/iron-man-vision-controller/
   ```

### 選項 3：Netlify 部署

1. **連接 GitHub**
   - 登錄 Netlify
   - 點擊 "New site from Git"
   - 選擇 GitHub

2. **配置部署**
   - Repository：iron-man-vision-controller
   - Deploy Branch：main
   - Build Command：（留空）
   - Publish Directory：（留空或 .）

3. **完成部署**
   - Netlify 自動部署
   - 獲得 URL：https://your-site.netlify.app

### 選項 4：傳統 Web 服務器部署

#### Apache

1. **複製文件到 htdocs**
   ```bash
   cp -r "d:\嘿嘿嘿" /var/www/html/iron-man-controller
   ```

2. **設置權限**
   ```bash
   chmod -R 755 /var/www/html/iron-man-controller
   ```

3. **訪問**
   ```
   http://your-domain.com/iron-man-controller/
   ```

#### Nginx

1. **複製文件**
   ```bash
   cp -r "d:\嘿嘿嘿" /var/www/iron-man-controller
   ```

2. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location /iron-man-controller {
           root /var/www;
           index index.html;
           try_files $uri $uri/ /iron-man-controller/index.html;
       }
   }
   ```

3. **重啟 Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

## HTTPS 設置

### 自動使用 Let's Encrypt

```bash
# 使用 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 為 Nginx 生成證書
sudo certbot --nginx -d your-domain.com
```

## 性能優化部署

### 1. 啟用 GZIP 壓縮

**Apache**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript
</IfModule>
```

**Nginx**
```nginx
gzip on;
gzip_types text/html text/css text/javascript application/javascript;
```

### 2. 設置快取策略

**Apache**
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/* "access plus 1 year"
</IfModule>
```

**Nginx**
```nginx
location ~ \.(css|js|png|jpg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. CDN 優化

使用 CDN 加速靜態資源：

```html
<!-- 使用 CDN 版本的 MediaPipe -->
<script async src="https://cdn.jsdelivr.net/npm/@mediapipe/..."></script>
```

## Docker 部署

### Dockerfile

```dockerfile
FROM nginx:alpine

# 複製應用文件
COPY . /usr/share/nginx/html/

# 複製 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 構建和運行

```bash
# 構建 Docker 鏡像
docker build -t iron-man-controller .

# 運行容器
docker run -p 80:80 iron-man-controller

# 訪問
http://localhost
```

## 檢查清單

在部署前請確保：

- [ ] 所有文件上傳
- [ ] index.html 路徑正確
- [ ] CSS 文件路徑正確
- [ ] JavaScript 文件路徑正確
- [ ] MediaPipe CDN 資源可訪問
- [ ] 已啟用 HTTPS（推薦）
- [ ] 已配置 CORS（如需跨域）
- [ ] 已測試攝像頭訪問
- [ ] 已測試手勢識別
- [ ] 已測試響應式設計
- [ ] 已檢查瀏覽器兼容性
- [ ] 已設置網站圖標（favicon）

## 故障排除

### 404 錯誤

**問題：** 文件無法找到

**解決：**
- 檢查文件路徑
- 檢查大小寫敏感性
- 確保所有文件都上傳了

### 攝像頭無法訪問

**問題：** 瀏覽器無法訪問攝像頭

**解決：**
- 確保使用 HTTPS（本地 localhost 除外）
- 檢查瀏覽器權限設置
- 清除快取重試

### MediaPipe 加載失敗

**問題：** CDN 資源無法加載

**解決：**
- 檢查互聯網連接
- 嘗試不同的 CDN
- 檢查瀏覽器控制台錯誤

### 高延遲

**問題：** 手勢識別有延遲

**解決：**
- 降低視頻分辨率
- 使用輕量級模型
- 檢查網絡速度
- 檢查 CPU 使用率

## 監控和分析

### Google Analytics

在 `index.html` 中添加：

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 錯誤追蹤

使用 Sentry 進行錯誤追蹤：

```html
<script src="https://browser.sentry-cdn.com/6.x.x/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: "YOUR_SENTRY_DSN" });
</script>
```

## 備份和恢復

### 定期備份

```bash
# 創建備份
tar -czf iron-man-backup-$(date +%Y%m%d).tar.gz "d:\嘿嘿嘿"

# 恢復備份
tar -xzf iron-man-backup-20260107.tar.gz
```

## 更新和維護

### 定期更新依賴

```bash
# 檢查可用更新
npm outdated

# 更新所有包
npm update
```

### 監控性能指標

- FPS 變化
- 加載時間
- 錯誤率
- 用戶反饋

---

**部署完成後記得分享給朋友！🎉**
