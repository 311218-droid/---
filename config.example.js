/* 
 * 鋼鐵人視覺控制器 - 配置文件示例
 * 複製此文件為 config.js 並按需修改配置
 */

const CONFIG = {
    // ===== 攝像頭配置 =====
    camera: {
        width: 640,
        height: 480,
        facingMode: 'user',
        idealWidth: 640,
        idealHeight: 480,
        fps: 30
    },

    // ===== MediaPipe 手部檢測配置 =====
    hands: {
        maxNumHands: 2,              // 最多檢測的手部數量
        modelComplexity: 1,          // 0=輕量級, 1=完整版
        minDetectionConfidence: 0.7, // 檢測置信度 (0-1)
        minTrackingConfidence: 0.5   // 追蹤置信度 (0-1)
    },

    // ===== 手勢識別靈敏度 =====
    gesture: {
        fingerThreshold: 0.7,        // 手指抬起判斷閾值
        minGestureCount: 3,          // 確認手勢所需的最小幀數
        gestureHistorySize: 10       // 手勢歷史記錄大小
    },

    // ===== UI 主題配置 =====
    theme: {
        primaryColor: '#ffb300',      // 主色彩 - 金色
        secondaryColor: '#00d4ff',    // 副色彩 - 青色
        tertiaryColor: '#ff1744',     // 第三色 - 紅色
        backgroundColor: '#0a0e27',   // 背景色
        glowColor: '#00d4ff'          // 發光色
    },

    // ===== 光球配置 =====
    orbs: [
        {
            id: 'orb1',
            label: '光球系統 #1',
            borderColor: '#ff6b6b',
            primaryGradient: '#ff8e8e',
            secondaryGradient: '#cc0000'
        },
        {
            id: 'orb2',
            label: '光球系統 #2',
            borderColor: '#4ecdc4',
            primaryGradient: '#6ef5f0',
            secondaryGradient: '#0d9b8c'
        },
        {
            id: 'orb3',
            label: '光球系統 #3',
            borderColor: '#ffd93d',
            primaryGradient: '#ffe66d',
            secondaryGradient: '#cc9900'
        },
        {
            id: 'orb4',
            label: '光球系統 #4',
            borderColor: '#a8e6cf',
            primaryGradient: '#c5f0e8',
            secondaryGradient: '#56ab91'
        }
    ],

    // ===== 性能配置 =====
    performance: {
        enableFpsCounter: true,       // 顯示 FPS 計數器
        enableDebugMode: false,       // 啟用調試模式
        maxFrameRate: 60,             // 最大幀率
        canvasClearInterval: 1        // Canvas 清除間隔
    },

    // ===== 動畫配置 =====
    animation: {
        orbPulseDuration: 500,        // 光球脈衝時間（毫秒）
        scanLineSpeed: 2000,          // 掃描線速度
        focusPulseSpeed: 2000         // 焦點圓圈脈衝速度
    },

    // ===== 日誌配置 =====
    logging: {
        enableConsoleLog: true,       // 啟用控制台日誌
        logGestureDetection: true,    // 記錄手勢檢測
        logOrbActivation: true,       // 記錄光球激活
        logPerformance: true          // 記錄性能數據
    }
};

// ===== 預設配置 =====
const PRESETS = {
    // 高性能預設 - 用於低端設備
    performance: {
        camera: {
            width: 320,
            height: 240
        },
        hands: {
            modelComplexity: 0,
            minDetectionConfidence: 0.8
        },
        animation: {
            scanLineSpeed: 3000
        }
    },

    // 高精度預設 - 用於精確識別
    accuracy: {
        hands: {
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.3
        }
    },

    // 開發預設 - 包含調試工具
    development: {
        logging: {
            enableConsoleLog: true,
            logGestureDetection: true,
            logOrbActivation: true,
            logPerformance: true
        },
        performance: {
            enableDebugMode: true
        }
    }
};

// 導出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, PRESETS };
}
