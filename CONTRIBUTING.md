# 貢獻指南

首先感謝你對本項目的興趣！本指南將幫助你了解如何為項目做出貢獻。

## 📋 行為準則

本項目遵循 [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md)。

## 🚀 開始貢獻

### 1. Fork 本倉庫
在 GitHub 上點擊 "Fork" 按鈕。

### 2. Clone 你的副本
```bash
git clone https://github.com/YOUR_USERNAME/iron-man-vision-controller.git
cd iron-man-vision-controller
```

### 3. 創建特性分支
```bash
git checkout -b feature/your-feature-name
```

### 4. 進行修改
- 修改文件
- 測試你的更改
- 提交清晰的提交信息

### 5. 提交 Pull Request
- 推送到你的分支
- 在 GitHub 上創建 Pull Request
- 等待審查

## 🎯 貢獻類型

### 🐛 Bug 修復
發現了 Bug？

1. **檢查 Issues** - 確保沒有人已經報告
2. **創建 Issue** - 如果是新 Bug
3. **修復代碼** - 按照代碼風格
4. **提交 PR** - 參考 Issue 編號

**Issue 模板：**
```markdown
## Bug 描述
[清晰簡潔的描述]

## 重現步驟
1. [第一步]
2. [第二步]
3. [...]

## 期望結果
[應該發生什麼]

## 實際結果
[實際發生了什麼]

## 環境信息
- 瀏覽器：[例如 Chrome 95]
- OS：[例如 Windows 10]
- 其他信息：[...]
```

### ✨ 新功能
想添加新功能？

1. **討論** - 在 Issue 中討論你的想法
2. **獲得同意** - 等待維護者反饋
3. **實現** - 按照代碼指南實現
4. **測試** - 充分測試你的功能
5. **文檔** - 更新相關文檔
6. **提交 PR** - 提交 Pull Request

### 📖 文檔改進
幫助改進文檔？

1. **修復拼寫錯誤** - 直接提交 PR
2. **改進清晰度** - 提交改進的文本
3. **添加示例** - 提供代碼示例
4. **翻譯** - 翻譯成其他語言

### 🎨 UI/UX 改進
提出設計改進？

1. **建議** - 在 Issue 中提出想法
2. **設計稿** - 提供視覺設計
3. **用戶反饋** - 分享用戶反饋
4. **實現** - 幫助實現改進

## 💻 開發設置

### 環境要求
```bash
# Python 3.7+
python --version

# 或 Node.js 12+
node --version
```

### 本地開發
```bash
# 啟動開發服務器
python -m http.server 8000

# 訪問
# http://localhost:8000
```

### 代碼風格
遵循以下指南：

#### JavaScript
- 使用 camelCase 命名
- 函數前添加 JSDoc 註釋
- 使用 `const` 優於 `let`
- 最大行長：100 字符

```javascript
/**
 * 描述函數功能
 * @param {Type} paramName - 參數描述
 * @returns {Type} 返回值描述
 */
function myFunction(paramName) {
    // 代碼
}
```

#### CSS
- 使用 BEM 命名法
- 相關規則組合在一起
- 使用 CSS 變量管理顏色

```css
.component-name {
    /* 基本樣式 */
}

.component-name__element {
    /* 元素樣式 */
}

.component-name__element--modifier {
    /* 修飾符樣式 */
}
```

#### HTML
- 使用語義化標籤
- 適當的縮進
- 合理的註釋

```html
<section class="section-name">
    <h2>標題</h2>
    <p>內容</p>
</section>
```

## 📋 Pull Request 流程

### PR 清單
提交 PR 前，確保：

- [ ] 代碼遵循項目風格
- [ ] 添加或更新了相關文檔
- [ ] 測試了你的更改
- [ ] PR 標題清晰、簡潔
- [ ] PR 描述詳細、完整
- [ ] 沒有合併衝突

### PR 模板
```markdown
## 描述
[簡述你做了什麼]

## 相關 Issue
Fixes #[Issue 號]

## 更改類型
- [ ] 🐛 Bug 修復
- [ ] ✨ 新功能
- [ ] 📖 文檔更新
- [ ] 🎨 樣式更改
- [ ] ⚡ 性能優化

## 測試
- [ ] 在本地測試過
- [ ] 跨浏覽器測試
- [ ] 移動設備測試

## 文檔
- [ ] 更新了 README
- [ ] 添加了代碼註釋
- [ ] 更新了相關文檔

## 截圖（如適用）
[添加截圖或 GIF]
```

## 🔍 代碼審查

我們會審查所有 PR，包括：

1. **代碼質量** - 代碼是否清晰、高效
2. **功能完整性** - 功能是否完整
3. **文檔** - 文檔是否充分
4. **測試** - 是否經過測試
5. **風格一致性** - 是否遵循代碼風格

### 審查反饋
- 🟢 Approved - 可以合併
- 🟡 Changes Requested - 需要修改
- ⚫ Commented - 有評論

## 🧪 測試

### 運行測試
```bash
# 手動測試
python -m http.server 8000

# 功能檢查
# 1. 打開應用
# 2. 測試攝像頭
# 3. 測試各種手勢
# 4. 檢查 UI 響應
```

### 測試清單
- [ ] 攝像頭啟動/停止
- [ ] 手勢識別準確度
- [ ] 光球激活功能
- [ ] UI 動畫流暢度
- [ ] 移動設備適配
- [ ] 跨浏覽器兼容性

## 📚 文檔更新

所有代碼更改都應更新相關文檔：

- **新功能** - 更新 README.md 和 FAQ.md
- **配置改變** - 更新 config.example.js
- **API 改變** - 更新開發者文檔
- **Bug 修復** - 更新 CHANGELOG.md

## 🏆 我的 PR 被合併了！

恭喜！你的貢獻已被接受。

1. 刪除你的特性分支
   ```bash
   git branch -d feature/your-feature-name
   ```

2. 更新你的副本
   ```bash
   git pull origin main
   ```

3. 看著你的代碼在網際網路上運行！

## ❓ 常見問題

### 如何同步我的 Fork？
```bash
# 添加上游倉庫
git remote add upstream https://github.com/original/iron-man-vision-controller.git

# 獲取上游更改
git fetch upstream

# 重基於上游 main
git rebase upstream/main

# 推送到你的 Fork
git push origin main
```

### 如何解決合併衝突？
1. 打開有衝突的文件
2. 查找衝突標記（`<<<<<<`, `======`, `>>>>>>`）
3. 手動解決衝突
4. 提交解決方案

### 我的 PR 被拒絕了怎麼辦？
- 閱讀反饋信息
- 討論顧慮
- 進行請求的更改
- 重新提交

## 📞 獲取幫助

- 💬 **討論** - 在 GitHub Discussions 中提問
- 🐛 **Issue** - 報告問題或建議功能
- 📧 **郵件** - 聯繫維護者
- 💭 **社區** - 加入我們的社區

## 🎓 資源

- [GitHub Flow 指南](https://guides.github.com/introduction/flow/)
- [如何寫好 Commit Message](https://chris.beams.io/posts/git-commit/)
- [代碼評審最佳實踐](https://www.conventional-commits.org/)

## 🙏 感謝

感謝所有為本項目做出貢獻的人！

你的貢獻使這個項目變得更好。

---

**快樂編碼！** 🚀
