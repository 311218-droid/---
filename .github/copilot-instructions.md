# 🔥 鋼鐵人視覺控制器 - 開發指南

本文件為 GitHub Copilot 提供項目特定的上下文和開發指南。

## 項目概述

**鋼鐵人視覺控制器** 是一個使用 MediaPipe 進行實時手部識別和追蹤的網頁應用，具有鋼鐵人 HUD 風格的界面設計。

### 核心技術
- 前端：HTML5、CSS3、Vanilla JavaScript
- AI 引擎：MediaPipe Hands（Google 開源）
- 視頻處理：WebRTC API + Canvas 2D
- 設計風格：科幻 HUD 系統

## 項目結構

```
iron-man-vision-controller/
├── index.html                    # 主頁面
├── css/
│   └── styles.css              # HUD 樣式和主題
├── js/
│   └── app.js                  # 手勢識別和控制邏輯
├── .github/
│   └── copilot-instructions.md # 本文件
├── package.json                # 項目元數據
├── README.md                   # 完整文檔
└── .gitignore                  # Git 配置
```

## 關鍵功能模塊

### 1. IronManController 類 (js/app.js)

**主要職責：**
- 攝像頭和視頻流管理
- MediaPipe Hands 初始化和配置
- 實時手部骨骼繪製
- 手勢識別算法
- 光球互動控制
- UI 狀態管理

**核心方法：**
```javascript
// 攝像頭控制
startCamera()
stopCamera()
toggleCamera()

// 手勢檢測
processHandDetection()
detectGestureType()
recognizeGesture()
countFingers()

// 光球控制
activateOrb(index)
resetAllOrbs()
controlOrbsWithGesture()

// 工具函數
drawHandSkeleton()
updateInfoPanel()
updateFPS()
```

### 2. HUD 界面設計 (css/styles.css)

**設計元素：**
- CSS 變量系統用於主題管理
- 四角括號效果和系統信息顯示
- 掃描線和焦點圓圈動畫
- 漸變和發光效果
- 響應式網格佈局

**色彩方案：**
- 主色：`#ffb300` (金色)
- 副色：`#00d4ff` (青色)
- 強調色：`#ff1744` (紅色)
- 背景：深藍色漸變

## 開發工作流

### 安裝和運行

**方式 1：Python HTTP 服務器**
```bash
python -m http.server 8000
# 訪問 http://localhost:8000
```

**方式 2：Node.js HTTP 服務器**
```bash
npx http-server -p 8000
```

**方式 3：VS Code Live Server**
- 安裝 Live Server 擴展
- 右鍵 index.html → Open with Live Server

### 調試技巧

1. **檢查 MediaPipe 加載狀態**
   - 打開瀏覽器開發者工具 (F12)
   - 檢查 Console 標籤是否有加載錯誤

2. **監控幀率和性能**
   - 信息面板會實時顯示 FPS
   - Chrome DevTools → Performance 標籤進行性能分析

3. **測試攝像頭訪問**
   - 確保使用 localhost 或 HTTPS
   - 檢查瀏覽器攝像頭權限設置

## 常見修改場景

### 添加新手勢

在 `detectGestureType()` 方法中添加條件：

```javascript
// 在 detectGestureType 方法中
if (fingersUp === 2 && isIndexUp && isPinkyUp) {
    return '槍手勢';
}
```

### 改變 HUD 顏色主題

修改 `css/styles.css` 中的 CSS 變量：

```css
:root {
    --primary-color: #ff0000;      /* 改成紅色 */
    --secondary-color: #00ff00;    /* 改成綠色 */
}
```

### 添加新的光球

1. 在 `index.html` 中添加 HTML：
```html
<div class="control-item">
    <div class="item-label">光球系統 #5</div>
    <div class="control-object orb-5" id="orb5"></div>
    <div class="item-status" id="status5">就緒</div>
</div>
```

2. 在 `js/app.js` 中更新 `orbs` 陣列：
```javascript
this.orbs = [
    // ... 現有的四個光球 ...
    { id: 'orb5', element: document.getElementById('orb5'), status: document.getElementById('status5') }
];
```

3. 在 `css/styles.css` 中添加樣式：
```css
.orb-5 {
    border-color: #9c27b0;
    background: radial-gradient(circle at 30% 30%, #d946ef, #6b21a8);
}
```

### 調整手勢識別靈敏度

在 `IronManController` 構造函數中修改置信度閾值：

```javascript
this.hands.setOptions({
    minDetectionConfidence: 0.8,   // 提高到 0.8（更嚴格）
    minTrackingConfidence: 0.6     // 提高到 0.6
});
```

## 性能優化建議

1. **降低 CPU 使用：**
   - 降低 `modelComplexity` 到 0
   - 增加 `minDetectionConfidence` 到 0.8+

2. **提高準確度：**
   - 設置 `modelComplexity` 為 1
   - 降低 `minDetectionConfidence` 到 0.5

3. **改善響應速度：**
   - 優化 Canvas 繪圖操作
   - 縮小視頻解析度
   - 使用 requestAnimationFrame

## 已知限制

- 需要 WebRTC 支援的現代瀏覽器
- 需要攝像頭硬件
- 要求互聯網連接加載 MediaPipe 模型
- 光線條件會影響識別準確度

## 未來改進方向

- [ ] 添加更多手勢識別
- [ ] 實現虛擬鍵盤控制
- [ ] 添加手勢錄製和回放功能
- [ ] 支持手勢快捷鍵定製
- [ ] 添加數據可視化和統計
- [ ] 實現離線模式
- [ ] 多語言支援
- [ ] 移動應用版本

## 測試清單

使用本應用前，請確保：

- [ ] 攝像頭能夠正常訪問
- [ ] 瀏覽器支持 WebRTC 和 Canvas
- [ ] MediaPipe 資源能夠正常加載
- [ ] 在良好光線條件下測試
- [ ] 在不同網絡速度下測試
- [ ] 在多個瀏覽器上測試

## 調試技巧

### 控制台日誌

在 `js/app.js` 中添加調試日誌：

```javascript
console.log('當前手勢:', this.currentGesture);
console.log('手指數量:', this.fingerCount);
console.log('FPS:', this.fps);
```

### 臨時禁用手勢檢測

在 `processHandDetection()` 開始處添加：

```javascript
if (!this.isGestureDetectionEnabled) {
    return; // 跳過檢測
}
```

## 資源引用

- [MediaPipe Hands 文檔](https://mediapipe.dev/solutions/hands)
- [WebRTC 指南](https://webrtc.org/getting-started/webrtc-api)
- [Canvas API 參考](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [JavaScript 事件系統](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)

## 聯繫和支持

如有問題或改進建議，請提交 Issue 或 Pull Request。

---

**最後更新：** 2026年1月7日  
**版本：** 1.0.0
