#!/bin/bash

# 鋼鐵人視覺控制器 - 開發服務器啟動腳本
# 此腳本用於在 Unix/Linux/MacOS 系統上快速啟動本地開發服務器

echo ""
echo "===================================="
echo "鋼鐵人視覺控制器 - 開發服務器"
echo "===================================="
echo ""

# 檢查 Python 是否安裝
if command -v python3 &> /dev/null; then
    echo "[✓] 檢測到 Python 3"
    echo "[✓] 啟動 HTTP 服務器於端口 8000..."
    echo ""
    echo "訪問地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服務器"
    echo ""
    python3 -m http.server 8000
    exit 0
elif command -v python &> /dev/null; then
    echo "[✓] 檢測到 Python"
    echo "[✓] 啟動 HTTP 服務器於端口 8000..."
    echo ""
    echo "訪問地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服務器"
    echo ""
    python -m http.server 8000
    exit 0
fi

# 檢查 Node.js 是否安裝
if command -v node &> /dev/null; then
    echo "[✓] 檢測到 Node.js"
    echo "[✓] 啟動 HTTP 服務器於端口 8000..."
    echo ""
    echo "訪問地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服務器"
    echo ""
    npx http-server -p 8000
    exit 0
fi

# 如果沒有找到任何服務器
echo "[✗] 錯誤：未找到 Python 或 Node.js"
echo ""
echo "請安裝以下之一："
echo "- Python: https://www.python.org/downloads/"
echo "- Node.js: https://nodejs.org/"
echo ""
echo "或者在 VS Code 中使用 Live Server 擴展"
echo ""
