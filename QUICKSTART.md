# 🚀 快速啟動指南

## 第一步：啟動開發服務器

### Windows 用戶
```bash
# 雙擊 start-server.bat 文件
或者在命令提示符中運行：
start-server.bat
```

### Mac / Linux 用戶
```bash
# 在終端運行：
chmod +x start-server.sh
./start-server.sh
```

### 其他方式
```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx http-server -p 8000

# 或在 VS Code 中
# 安裝 Live Server 擴展後，右鍵點擊 index.html > Open with Live Server
```

## 第二步：打開瀏覽器

訪問：`http://localhost:8000`

你將看到鋼鐵人視覺控制器的主界面。

## 第三步：啟用攝像頭

1. 點擊藍色的「📷 啟動攝像頭」按鈕
2. 允許瀏覽器訪問您的攝像頭
3. 等待 MediaPipe 模型加載

## 第四步：啟用手勢檢測

1. 點擊「👐 切換手勢檢測」按鈕
2. 在攝像頭前進行手勢
3. 觀察系統的識別和響應

## 嘗試的手勢

- ☝️ **食指指向** - 伸出單根食指
- ✌️ **勝利手勢** - 伸出食指和中指形成 V 形
- ✋ **開放手掌** - 展開所有五指
- ✊ **拳頭** - 握緊拳頭

## 系統要求

- ✅ 現代網頁瀏覽器（Chrome、Firefox、Safari、Edge）
- ✅ 攝像頭設備
- ✅ 互聯網連接（用於加載 MediaPipe）
- ✅ 良好的光線條件

## 故障排除

**攝像頭無法訪問**
- 檢查瀏覽器權限設置
- 確保使用 http://localhost 或 https
- 重啟瀏覽器

**手勢無法識別**
- 改善光線條件
- 保持手部在視頻中心
- 檢查控制台是否有錯誤信息 (F12)

**幀率低（FPS 低）**
- 關閉其他應用程序
- 嘗試使用 Chrome 瀏覽器
- 降低分辨率設置

## 完整文檔

詳見 [README.md](README.md)

## 開發者指南

詳見 [.github/copilot-instructions.md](.github/copilot-instructions.md)

---

祝您使用愉快！🚀
