# 🔥 鋼鐵人視覺控制器 - Iron Man Vision Control System

一個使用 AI 視覺辨識技術的網頁互動控制器，採用鋼鐵人（Iron Man）的 HUD 風格界面設計。通過實時手勢識別和追蹤，實現直觀的視覺化互動控制。

## ✨ 主要功能

- 🎥 **即時攝像頭視頻流** - 支援多種設備和分辨率的實時攝像頭捕捉
- 👐 **AI 手勢識別** - 基於 MediaPipe 的實時手部骨骼追蹤和手勢檢測
- 🎯 **多點手指追蹤** - 同時追蹤兩隻手，26 個關鍵點檢測
- 💫 **鋼鐵人 HUD 界面** - 科幻風格的頭盔顯示系統（Heads-Up Display）
- 🔮 **互動光球控制** - 通過手勢控制四個響應式光球系統
- 📊 **實時信息監控** - 實時顯示手勢、置信度、FPS 等數據
- 🎮 **多種控制模式** - 食指指向、手掌重置、勝利手勢等多種互動方式

## 🎯 支援的手勢

| 手勢 | 描述 | 功能 |
|------|------|------|
| ☝️ **食指指向** | 伸出單根食指 | 指向式光球選擇 |
| ✌️ **勝利手勢** | 伸出食指和中指 | 隨機激活光球 |
| 👌 **OK 手勢** | 拇指和食指形成圓形 | 確認動作 |
| ✋ **開放手掌** | 五指全開 | 重置所有光球 |
| ✊ **拳頭** | 握緊拳頭 | 待命狀態 |

## 🛠️ 技術棧

- **前端框架** - 原生 HTML5 + CSS3 + Vanilla JavaScript
- **AI 引擎** - MediaPipe Hands（Google 開源）
- **渲染技術** - Canvas API 2D 繪圖
- **視頻處理** - WebRTC 攝像頭 API
- **設計風格** - 現代科幻 HUD 系統

## 📁 項目結構

```
鋼鐵人視覺控制器/
├── index.html              # 主頁面入口
├── css/
│   └── styles.css         # 完整樣式表（HUD 設計）
├── js/
│   └── app.js            # 主應用邏輯和手勢識別
├── README.md             # 項目文檔
└── .github/
    └── copilot-instructions.md  # AI 助手指令
```

## 🚀 快速開始

### 系統要求

- 現代網頁瀏覽器（Chrome、Firefox、Safari、Edge）
- 支援 WebRTC 和 Canvas API
- 攝像頭硬件設備
- 互聯網連接（用於加載 MediaPipe 資源）

### 安裝步驟

1. **克隆或下載項目**
   ```bash
   git clone <repository-url>
   cd 鋼鐵人視覺控制器
   ```

2. **啟動本地伺服器**（重要：MediaPipe 需要 HTTPS 或 localhost）
   
   **使用 Python 3:**
   ```bash
   python -m http.server 8000
   ```
   
   **使用 Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```
   
   **使用 Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```
   
   **使用 VS Code Live Server 插件:**
   - 安裝 Live Server 插件
   - 右鍵點擊 index.html，選擇 "Open with Live Server"

3. **打開瀏覽器**
   ```
   http://localhost:8000
   ```

4. **允許攝像頭訪問**
   - 瀏覽器會提示請求攝像頭權限
   - 點擊「允許」按鈕

5. **開始使用**
   - 點擊「啟動攝像頭」按鈕
   - 點擊「切換手勢檢測」啟用手勢識別
   - 在攝像頭前進行各種手勢

## 📖 使用指南

### 基本操作

1. **啟動攝像頭**
   - 點擊藍色的「啟動攝像頭」按鈕
   - 等待 MediaPipe 模型加載完成

2. **啟用手勢檢測**
   - 點擊「切換手勢檢測」按鈕
   - 系統開始分析攝像頭中的手部動作

3. **控制光球**
   - 進行特定手勢，相應的光球會被激活並發光
   - 可以通過不同的手勢組合控制不同的光球

4. **監控系統狀態**
   - 左上角顯示系統狀態
   - 右上角顯示檢測模式
   - 下方信息面板顯示實時數據

### 高級功能

**食指指向模式：**
- 伸出食指指向攝像頭
- 根據手指位置自動選擇光球區域

**勝利手勢模式：**
- 伸出食指和中指
- 系統隨機激活一個光球

**重置模式：**
- 展開所有五指形成開放手掌
- 所有光球恢復到初始狀態

## ⚙️ 配置選項

在 `js/app.js` 中修改 `IronManController` 的構造函數配置：

```javascript
this.hands.setOptions({
    maxNumHands: 2,              // 最多同時檢測的手部數量
    modelComplexity: 1,          // 0=輕量級, 1=完整版
    minDetectionConfidence: 0.7, // 檢測置信度閾值 (0-1)
    minTrackingConfidence: 0.5   // 追蹤置信度閾值 (0-1)
});
```

### 參數說明

- **maxNumHands** - 增加可同時檢測的手部數量（會降低性能）
- **modelComplexity** - 輕量級模型更快但準確度較低
- **minDetectionConfidence** - 提高閾值可提高準確度但可能遺漏檢測
- **minTrackingConfidence** - 追蹤穩定性閾值

## 🎨 自定義 HUD 樣式

### 改變顏色主題

在 `css/styles.css` 的 `:root` 中修改 CSS 變量：

```css
:root {
    --primary-color: #ffb300;      /* 主色彩 - 金色 */
    --secondary-color: #00d4ff;    /* 副色彩 - 青色 */
    --tertiary-color: #ff1744;     /* 第三色 - 紅色 */
    --background-dark: #0a0e27;    /* 深色背景 */
}
```

### 添加自定義手勢

在 `js/app.js` 的 `detectGestureType()` 方法中添加新的手勢識別邏輯：

```javascript
detectGestureType(landmarks) {
    // ... 現有代碼 ...
    
    // 添加新的手勢檢測
    if (/* 新的手勢條件 */) {
        return '自定義手勢名稱';
    }
    
    return '未知';
}
```

## 🔍 性能優化

### 降低高 CPU 使用率

1. 降低檢測頻率：修改 `modelComplexity` 為 0
2. 增加置信度閾值以減少誤檢測
3. 在低端設備上降低視頻分辨率

### 提高準確度

1. 增加 `modelComplexity` 為 1
2. 降低置信度閾值
3. 改善光線條件

## 🐛 故障排除

### 攝像頭無法訪問

**問題：** "無法訪問攝像頭"

**解決方案：**
- 檢查瀏覽器權限設置
- 確保網頁使用 HTTPS 或 localhost
- 重啟瀏覽器
- 檢查其他應用是否占用攝像頭

### 手勢識別不準確

**問題：** 手勢無法正確識別

**解決方案：**
- 改善光線條件
- 保持手部清晰可見
- 調整置信度閾值
- 確保手部完整在視圖內

### 幀率低（FPS 低）

**問題：** 性能不流暢

**解決方案：**
- 降低視頻分辨率
- 使用輕量級模型（modelComplexity: 0）
- 關閉其他應用程序
- 使用現代瀏覽器（最新版 Chrome）

### 模型加載失敗

**問題：** "無法加載 MediaPipe 資源"

**解決方案：**
- 檢查互聯網連接
- 清除瀏覽器緩存
- 嘗試其他瀏覽器
- 檢查 CDN 是否可用

## 📚 API 文檔

### IronManController 類

#### 方法

```javascript
// 攝像頭控制
toggleCamera()              // 切換攝像頭開/關
startCamera()              // 啟動攝像頭
stopCamera()               // 停止攝像頭

// 手勢檢測
toggleGestureDetection()   // 切換手勢檢測開/關
recognizeGesture()         // 識別當前手勢
detectGestureType()        // 檢測手勢類型

// 光球控制
activateOrb(index)         // 激活指定光球
resetAllOrbs()            // 重置所有光球

// 工具函數
clearCanvas()             // 清除畫布
updateInfoPanel()         // 更新信息面板
updateFPS()              // 更新幀率計數器
```

#### 屬性

```javascript
isActive                  // 攝像頭是否活動
isGestureDetectionEnabled // 手勢檢測是否啟用
currentGesture            // 當前識別的手勢
gestureConfidence         // 當前手勢的置信度
fingerCount               // 當前豎起的手指數量
fps                       // 當前幀率
```

## 🌐 瀏覽器兼容性

| 瀏覽器 | 版本 | 支援度 |
|--------|------|--------|
| Chrome | 90+ | ✅ 完全支援 |
| Firefox | 88+ | ✅ 完全支援 |
| Safari | 14+ | ✅ 完全支援 |
| Edge | 90+ | ✅ 完全支援 |
| Opera | 76+ | ✅ 完全支援 |

## 📱 移動設備支援

- 🔧 支援 iOS 和 Android 設備
- 📹 需要設備有前置攝像頭
- 🌐 建議在 HTTPS 連接上使用
- 📊 性能可能因設備而異

## 📜 許可證

本項目採用 MIT 許可證。詳見 LICENSE 文件。

## 🤝 貢獻

歡迎提交 Pull Request 和 Issue！

## 📞 支持和反饋

- 發現 Bug？提交 Issue
- 有改進建議？提交 PR
- 需要幫助？查看常見問題

## 🙏 致謝

- MediaPipe（Google） - 手部跟蹤技術
- TensorFlow.js - 機器學習框架
- 開源社區

## 🔗 相關資源

- [MediaPipe 官方文檔](https://mediapipe.dev/)
- [MediaPipe Hands 指南](https://mediapipe.dev/solutions/hands)
- [WebRTC 文檔](https://webrtc.org/)
- [Canvas API 參考](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

**製作日期：** 2026年1月7日  
**版本：** 1.0.0  
**作者：** GitHub Copilot  
**項目狀態：** 🟢 活躍開發

歡迎使用鋼鐵人視覺控制器！祝您有個美好的使用體驗 🚀
