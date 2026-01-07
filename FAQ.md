# ❓ 常見問題解答 (FAQ)

## 🎯 功能相關問題

### Q1: 支持多少個手勢？

**A:** 目前支持 5 種基本手勢：
- ☝️ 食指指向
- ✌️ 勝利手勢 (V 形)
- 👌 OK 手勢
- ✋ 開放手掌
- ✊ 拳頭

可以通過修改 `detectGestureType()` 方法添加新的手勢識別。

---

### Q2: 可以識別兩隻手嗎？

**A:** 可以！系統默認支持同時識別最多 2 隻手。

在 `js/app.js` 中修改此參數：
```javascript
maxNumHands: 2  // 改為更大的數字（性能會下降）
```

---

### Q3: 如何添加更多光球？

**A:** 需要修改三個文件：

1. **index.html** - 添加 HTML 元素
2. **css/styles.css** - 添加樣式
3. **js/app.js** - 添加到 orbs 數組

詳見 [.github/copilot-instructions.md](.github/copilot-instructions.md#添加新的光球)

---

### Q4: 光球激活時間可以改嗎？

**A:** 可以，在 `js/app.js` 的 `activateOrb()` 方法中修改：

```javascript
setTimeout(() => {
    // ...
}, 500);  // 改為你想要的毫秒數
```

---

## 🎮 使用相關問題

### Q5: 為什麼攝像頭訪問被拒絕？

**A:** 可能的原因：
1. **瀏覽器權限** - 檢查瀏覽器設置
2. **不是 HTTPS** - MediaPipe 需要 HTTPS 或 localhost
3. **攝像頭被占用** - 關閉其他使用攝像頭的應用
4. **瀏覽器不支持** - 使用最新的 Chrome、Firefox 等

---

### Q6: 手勢無法正確識別怎麼辦？

**A:** 嘗試以下方法：

1. **改善光線條件** - 確保充足的光線
2. **保持手部清晰** - 手部完整在視頻中
3. **調整置信度閾值** - 降低 `minDetectionConfidence`
4. **加快手勢速度** - 某些手勢需要清晰的定義
5. **清除快取** - F12 → Network → Disable cache → 重新加載

---

### Q7: FPS 很低怎麼辦？

**A:** 優化性能：

1. **降低分辨率**
   ```javascript
   width: 320,
   height: 240,
   ```

2. **使用輕量級模型**
   ```javascript
   modelComplexity: 0
   ```

3. **關閉其他應用程序**

4. **使用更新的瀏覽器**

---

### Q8: 移動設備上可以使用嗎？

**A:** 可以，但有限制：
- ✅ 支持 iOS 14+ 和 Android 10+
- ✅ 需要前置攝像頭
- ⚠️ 性能可能不如桌面
- ⚠️ 建議在 HTTPS 上使用

---

## 🛠️ 開發相關問題

### Q9: 如何修改顏色主題？

**A:** 編輯 `css/styles.css` 的 CSS 變量：

```css
:root {
    --primary-color: #ffb300;      /* 改成你想要的顏色 */
    --secondary-color: #00d4ff;
    --tertiary-color: #ff1744;
}
```

---

### Q10: 如何禁用某些功能？

**A:** 在 `js/app.js` 中：

```javascript
// 禁用手勢檢測
toggleGestureDetection() {
    if (!this.isActive) return;  // 添加此行
    // ...
}

// 禁用光球控制
controlOrbsWithGesture() {
    // 留空此方法
}
```

---

### Q11: 如何添加新的手勢控制？

**A:** 在 `detectGestureType()` 方法中添加：

```javascript
// 檢測槍手勢（食指和小指豎起）
if (isIndexUp && isPinkyUp && !isMiddleUp && !isRingUp) {
    return '槍手勢';
}
```

然後在 `controlOrbsWithGesture()` 中處理：

```javascript
else if (this.currentGesture === '槍手勢') {
    // 你的控制邏輯
}
```

---

### Q12: 如何調試代碼？

**A:** 使用瀏覽器開發者工具：

1. **打開 DevTools** - F12 或 右鍵 → 檢查
2. **查看 Console** - 檢查錯誤信息
3. **添加斷點** - 在 Sources 標籤點擊代碼行
4. **使用 console.log()** - 添加日誌信息

```javascript
console.log('當前手勢:', this.currentGesture);
console.log('FPS:', this.fps);
```

---

### Q13: 如何自定義光球顏色？

**A:** 編輯 `css/styles.css`：

```css
.orb-1 {
    border-color: #ff6b6b;
    background: radial-gradient(circle at 30% 30%, #ff8e8e, #cc0000);
}
```

修改色值即可。

---

## 🚀 部署相關問題

### Q14: 如何在線部署？

**A:** 多種選擇：

1. **GitHub Pages** - 免費，最簡單
2. **Vercel** - 優秀的性能
3. **Netlify** - 用戶友好
4. **傳統服務器** - Apache、Nginx 等

詳見 [DEPLOYMENT.md](DEPLOYMENT.md)

---

### Q15: 需要後端嗎？

**A:** 不需要。這是一個完全客户端應用：
- ✅ 所有處理在瀏覽器中進行
- ✅ 無需服務器
- ✅ 無需數據庫
- ✅ 可以離線運行（除了加載 MediaPipe）

---

### Q16: 可以添加數據保存功能嗎？

**A:** 可以，使用 localStorage：

```javascript
// 保存用戶偏好
localStorage.setItem('hud-theme', 'dark');

// 讀取保存的數據
const theme = localStorage.getItem('hud-theme');
```

或使用 IndexedDB 存儲大量數據。

---

## 📊 性能相關問題

### Q17: 如何提高手勢識別準確度？

**A:** 調整參數：

```javascript
this.hands.setOptions({
    minDetectionConfidence: 0.5,    // 降低（更敏感）
    minTrackingConfidence: 0.3      // 降低（更敏感）
});
```

但降低置信度會增加誤檢測。

---

### Q18: 如何優化性能？

**A:** 使用配置文件中的性能預設：

```javascript
// 高性能模式
const config = PRESETS.performance;

// 或編輯配置
modelComplexity: 0,
width: 320,
height: 240
```

---

### Q19: GPU 加速支持嗎？

**A:** MediaPipe 會自動使用：
- ✅ WebGL（如可用）
- ✅ WASM（Fallback）
- ✅ GPU 加速（某些瀏覽器）

無需手動配置。

---

## 🔒 安全相關問題

### Q20: 攝像頭數據是否上傳到服務器？

**A:** 不。所有處理在本地進行：
- ✅ 攝像頭數據不離開瀏覽器
- ✅ 沒有服務器端存儲
- ✅ 完全隱私保護
- ✅ 用戶可隨時禁用

---

### Q21: 如何確保 HTTPS？

**A:** 部署時使用 HTTPS：

1. **自動獲取證書** - 使用 Let's Encrypt
2. **設置 SSL** - 在服務器上配置
3. **CDN HTTPS** - 使用 Cloudflare 等

詳見 [DEPLOYMENT.md](DEPLOYMENT.md#https-設置)

---

## 📱 移動設備問題

### Q22: 在 iPhone 上可以用嗎？

**A:** 可以，但有限制：
- ✅ iOS 14.5+ 支持
- ✅ 需要 Safari 14.5+
- ⚠️ 性能可能不如安卓
- ⚠️ 需要 HTTPS 連接

---

### Q23: 為什麼在手機上很慢？

**A:** 可能的原因：
1. **設備性能** - 低端手機性能差
2. **網絡連接** - 使用 4G/5G
3. **瀏覽器** - 使用最新的 Chrome
4. **應用內存** - 關閉其他應用

---

### Q24: 橫屏/豎屏適配嗎？

**A:** 都支持：
- ✅ 自動響應式設計
- ✅ 自動調整佈局
- ✅ 手勢識別不受影響

---

## 🐛 故障排除

### Q25: "MediaPipe 加載失敗" 怎麼辦？

**A:** 檢查以下幾點：

1. **網絡連接** - 確保互聯網正常
2. **CDN 狀態** - CDN 可能宕機
3. **快取問題** - 清除瀏覽器快取
4. **錯誤消息** - 查看控制台詳細錯誤

---

### Q26: 視頻流黑屏怎麼辦？

**A:** 嘗試以下解決方案：

1. **檢查攝像頭** - 確保硬件正常
2. **授予權限** - 檢查瀏覽器權限
3. **刷新頁面** - 重新加載應用
4. **換瀏覽器** - 嘗試不同的瀏覽器

---

### Q27: 光球無反應怎麼辦？

**A:** 檢查以下：

1. **手勢檢測** - 確保已啟用
2. **手部可見** - 確保手在視頻中
3. **光線充足** - 改善光線條件
4. **置信度** - 查看置信度是否足夠

---

## 📚 文檔相關問題

### Q28: 在哪裡找到完整文檔？

**A:** 項目文檔：
- [README.md](README.md) - 主文檔
- [QUICKSTART.md](QUICKSTART.md) - 快速開始
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - 項目總結
- [VISUAL_GUIDE.md](VISUAL_GUIDE.md) - 視覺指南
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - 開發指南

---

### Q29: 如何貢獻代碼？

**A:** 遵循以下步驟：

1. **Fork 項目** - 創建個人副本
2. **創建分支** - `git checkout -b feature/name`
3. **提交更改** - `git commit -am "描述"`
4. **推送代碼** - `git push origin feature/name`
5. **提交 PR** - 在 GitHub 上提交 Pull Request

---

### Q30: 如何報告 Bug？

**A:** 提交 Issue：

1. **描述問題** - 清楚地說明發生了什麼
2. **重現步驟** - 提供重現 Bug 的步驟
3. **期望結果** - 應該發生什麼
4. **實際結果** - 實際發生了什麼
5. **截圖** - 如適用，附加截圖
6. **環境信息** - 瀏覽器版本、操作系統等

---

## 💡 進階問題

### Q31: 如何集成到現有網站？

**A:** 作為 iframe：

```html
<iframe src="iron-man-controller.html" style="width: 100%; height: 600px;"></iframe>
```

或複製文件並調整路徑。

---

### Q32: 如何添加語言支持？

**A:** 使用 i18n 庫或手動添加：

```javascript
const i18n = {
    zh_TW: { gesture: '手勢' },
    en_US: { gesture: 'Gesture' }
};
```

---

### Q33: 如何與其他 API 集成？

**A:** 修改 `app.js`：

```javascript
activateOrb(index) {
    // 調用你的 API
    fetch('/api/activate', {
        method: 'POST',
        body: JSON.stringify({ orb: index })
    });
    
    // 其他邏輯...
}
```

---

### Q34: 如何添加分析追蹤？

**A:** 集成 Google Analytics：

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
    gtag('event', 'gesture', { gesture: 'pointing' });
</script>
```

---

### Q35: 如何優化 SEO？

**A:** 添加元標籤：

```html
<meta name="description" content="AI 視覺控制器...">
<meta property="og:title" content="鋼鐵人視覺控制器">
<meta property="og:image" content="preview.png">
```

---

## 🆘 獲取幫助

如果以上問題都無法解決：

1. **查看控制台** - F12 → Console
2. **檢查文檔** - 閱讀相關的 .md 文件
3. **搜索 GitHub** - 查看是否有類似 Issue
4. **提交 Issue** - 描述詳細的問題信息

---

**祝您使用愉快！如有疑問，歡迎提問！🚀**
