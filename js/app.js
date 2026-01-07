// ===== 鋼鐵人視覺控制器 =====
// 使用 MediaPipe Hands 進行實時手勢識別和控制

class IronManController {
    constructor() {
        this.video = document.getElementById('camera');
        this.canvas = document.getElementById('canvas');
        this.canvasCtx = this.canvas.getContext('2d');
        
        // 設置 Canvas 尺寸
        this.canvas.width = 640;
        this.canvas.height = 480;
        
        this.camera = null;
        this.hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1662332927/${file}`;
            }
        });
        
        this.hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.5
        });
        
        this.hands.onResults(this.onResults.bind(this));
        
        // 状态变量
        this.isActive = false;
        this.isGestureDetectionEnabled = false;
        this.currentGesture = '無';
        this.gestureConfidence = 0;
        this.fingerCount = 0;
        this.lastDetectionTime = Date.now();
        this.fps = 0;
        
        // 控制對象
        this.orbs = [
            { id: 'orb1', element: document.getElementById('orb1'), status: document.getElementById('status1') },
            { id: 'orb2', element: document.getElementById('orb2'), status: document.getElementById('status2') },
            { id: 'orb3', element: document.getElementById('orb3'), status: document.getElementById('status3') },
            { id: 'orb4', element: document.getElementById('orb4'), status: document.getElementById('status4') }
        ];
        
        // 手勢數據記錄
        this.handLandmarks = [];
        this.gestureHistory = [];
        this.orbActivationStates = [false, false, false, false];
        
        this.initializeEventListeners();
        this.showTutorial();
        this.updateSystemStatus('待命中');
        
        // FPS 計數器
        this.frameCount = 0;
        this.lastFpsUpdate = Date.now();
    }
    
    initializeEventListeners() {
        document.getElementById('toggleCamera').addEventListener('click', () => this.toggleCamera());
        document.getElementById('toggleGesture').addEventListener('click', () => this.toggleGestureDetection());
        document.getElementById('clearCanvas').addEventListener('click', () => this.clearCanvas());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('startBtn').addEventListener('click', () => this.startApplication());
        
        // 光球點擊事件
        this.orbs.forEach((orb, index) => {
            orb.element.addEventListener('click', () => this.activateOrb(index));
        });
    }
    
    showTutorial() {
        document.getElementById('tutorialModal').style.display = 'flex';
    }
    
    closeModal() {
        document.getElementById('tutorialModal').style.display = 'none';
    }
    
    startApplication() {
        this.closeModal();
        this.updateSystemStatus('就緒');
    }
    
    async toggleCamera() {
        if (this.isActive) {
            this.stopCamera();
        } else {
            await this.startCamera();
        }
    }
    
    async startCamera() {
        try {
            this.updateSystemStatus('攝像頭啟動中...');
            
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                }
            });
            
            this.video.srcObject = stream;
            this.isActive = true;
            this.updateSystemStatus('攝像頭已就緒');
            this.updateDetectionMode('相機流就緒');
            
            // 設置攝像頭幀輸入
            this.camera = new Camera(this.video, {
                onFrame: async () => {
                    await this.hands.send({ image: this.video });
                },
                width: 640,
                height: 480
            });
            
            this.camera.start();
            document.getElementById('toggleCamera').textContent = '📷 停止攝像頭';
            
        } catch (error) {
            console.error('攝像頭訪問錯誤:', error);
            this.updateSystemStatus('❌ 攝像頭訪問失敗');
            alert('無法訪問攝像頭，請檢查權限設置');
        }
    }
    
    stopCamera() {
        if (this.camera) {
            this.camera.stop();
        }
        if (this.video.srcObject) {
            this.video.srcObject.getTracks().forEach(track => track.stop());
        }
        this.isActive = false;
        this.isGestureDetectionEnabled = false;
        this.updateSystemStatus('已關閉');
        this.updateDetectionMode('相機已停止');
        this.clearCanvas();
        document.getElementById('toggleCamera').textContent = '📷 啟動攝像頭';
        document.getElementById('toggleGesture').textContent = '👐 切換手勢檢測';
    }
    
    toggleGestureDetection() {
        if (!this.isActive) {
            alert('請先啟動攝像頭');
            return;
        }
        
        this.isGestureDetectionEnabled = !this.isGestureDetectionEnabled;
        const status = this.isGestureDetectionEnabled ? '✅ 手勢檢測已啟用' : '⏸️ 手勢檢測已停用';
        this.updateDetectionMode(status);
        document.getElementById('toggleGesture').textContent = this.isGestureDetectionEnabled ? '👐 停止檢測' : '👐 啟動檢測';
    }
    
    onResults(results) {
        if (!this.isActive) return;
        
        // 更新 FPS
        this.updateFPS();
        
        // 清除畫布
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 繪製視頻背景
        this.canvasCtx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        
        // 處理檢測結果
        if (results.multiHandLandmarks && this.isGestureDetectionEnabled) {
            this.processHandDetection(results);
        }
    }
    
    processHandDetection(results) {
        const handedness = results.multiHandedness;
        const landmarks = results.multiHandLandmarks;
        
        for (let i = 0; i < landmarks.length; i++) {
            const handLandmarks = landmarks[i];
            const hand = handedness[i];
            
            // 繪製手部骨骼
            this.drawHandSkeleton(handLandmarks);
            
            // 識別手勢
            this.recognizeGesture(handLandmarks, hand.label);
            
            // 計算手指數量
            this.countFingers(handLandmarks);
            
            // 根據手勢控制光球
            this.controlOrbsWithGesture(handLandmarks);
        }
        
        // 更新信息顯示
        this.updateInfoPanel();
    }
    
    drawHandSkeleton(landmarks) {
        // 繪製點
        landmarks.forEach((landmark, index) => {
            const x = landmark.x * this.canvas.width;
            const y = landmark.y * this.canvas.height;
            
            // 繪製關鍵點
            this.canvasCtx.fillStyle = '#00d4ff';
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(x, y, 3, 0, 2 * Math.PI);
            this.canvasCtx.fill();
            
            // 關鍵點編號
            this.canvasCtx.fillStyle = '#ffb300';
            this.canvasCtx.font = '10px Arial';
            this.canvasCtx.fillText(index, x + 5, y - 5);
        });
        
        // 繪製連接線
        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4], // 拇指
            [0, 5], [5, 6], [6, 7], [7, 8], // 食指
            [0, 9], [9, 10], [10, 11], [11, 12], // 中指
            [0, 13], [13, 14], [14, 15], [15, 16], // 無名指
            [0, 17], [17, 18], [18, 19], [19, 20], // 小指
            [5, 9], [9, 13], [13, 17], // 指根連接
        ];
        
        this.canvasCtx.strokeStyle = '#4ecdc4';
        this.canvasCtx.lineWidth = 2;
        
        connections.forEach(([start, end]) => {
            const startLandmark = landmarks[start];
            const endLandmark = landmarks[end];
            
            const x1 = startLandmark.x * this.canvas.width;
            const y1 = startLandmark.y * this.canvas.height;
            const x2 = endLandmark.x * this.canvas.width;
            const y2 = endLandmark.y * this.canvas.height;
            
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(x1, y1);
            this.canvasCtx.lineTo(x2, y2);
            this.canvasCtx.stroke();
        });
    }
    
    recognizeGesture(landmarks, handedness) {
        const gesture = this.detectGestureType(landmarks);
        this.currentGesture = gesture;
        this.gestureHistory.push(gesture);
        
        if (this.gestureHistory.length > 10) {
            this.gestureHistory.shift();
        }
    }
    
    detectGestureType(landmarks) {
        // 計算手指狀態
        const thumb = landmarks[4];
        const index = landmarks[8];
        const middle = landmarks[12];
        const ring = landmarks[16];
        const pinky = landmarks[20];
        const wrist = landmarks[0];
        
        // 計算手指狀態（抬起或放下）
        const isThumbUp = thumb.y < landmarks[3].y;
        const isIndexUp = index.y < landmarks[6].y;
        const isMiddleUp = middle.y < landmarks[10].y;
        const isRingUp = ring.y < landmarks[14].y;
        const isPinkyUp = pinky.y < landmarks[18].y;
        
        const fingersUp = [isThumbUp, isIndexUp, isMiddleUp, isRingUp, isPinkyUp].filter(Boolean).length;
        
        // 手勢識別邏輯
        if (fingersUp === 0) return '拳頭';
        if (fingersUp === 1 && isIndexUp) return '食指指向';
        if (fingersUp === 2 && isIndexUp && isMiddleUp) return '勝利手勢';
        if (fingersUp === 3 && isIndexUp && isMiddleUp && isRingUp) return '三指手勢';
        if (fingersUp === 5) return '開放手掌';
        if (fingersUp === 4 && !isThumbUp) return '四指手勢';
        if (fingersUp === 2 && isThumbUp && isIndexUp) return 'OK 手勢';
        
        return '未知';
    }
    
    countFingers(landmarks) {
        const fingers = [
            landmarks[4],  // 拇指
            landmarks[8],  // 食指
            landmarks[12], // 中指
            landmarks[16], // 無名指
            landmarks[20]  // 小指
        ];
        
        const mcp = [landmarks[3], landmarks[6], landmarks[10], landmarks[14], landmarks[18]];
        
        let count = 0;
        for (let i = 0; i < fingers.length; i++) {
            if (fingers[i].y < mcp[i].y) {
                count++;
            }
        }
        
        this.fingerCount = count;
    }
    
    controlOrbsWithGesture(landmarks) {
        // 根據手勢位置和類型控制光球
        const indexFinger = landmarks[8]; // 食指尖端
        const x = indexFinger.x * 100;
        const y = indexFinger.y * 100;
        
        // 根據手勢類型選擇光球
        if (this.currentGesture === '食指指向') {
            // 根據位置選擇光球
            if (x < 50 && y < 50) this.activateOrb(0); // 左上
            else if (x > 50 && y < 50) this.activateOrb(1); // 右上
            else if (x < 50 && y > 50) this.activateOrb(2); // 左下
            else if (x > 50 && y > 50) this.activateOrb(3); // 右下
        } else if (this.currentGesture === '開放手掌') {
            // 重置所有光球
            this.resetAllOrbs();
        } else if (this.currentGesture === '勝利手勢') {
            // 隨機激活光球
            const randomOrb = Math.floor(Math.random() * 4);
            this.activateOrb(randomOrb);
        }
    }
    
    activateOrb(index) {
        if (index < 0 || index >= this.orbs.length) return;
        
        const orb = this.orbs[index];
        orb.element.classList.add('active');
        orb.status.textContent = '✅ 已激活';
        orb.status.classList.add('activated');
        this.orbActivationStates[index] = true;
        
        // 延遲後移除效果
        setTimeout(() => {
            orb.element.classList.remove('active');
            orb.status.textContent = '就緒';
            orb.status.classList.remove('activated');
            this.orbActivationStates[index] = false;
        }, 500);
    }
    
    resetAllOrbs() {
        this.orbs.forEach(orb => {
            orb.element.classList.remove('active');
            orb.status.textContent = '就緒';
            orb.status.classList.remove('activated');
        });
        this.orbActivationStates.fill(false);
    }
    
    clearCanvas() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.handLandmarks = [];
        this.gestureHistory = [];
        this.resetAllOrbs();
    }
    
    updateInfoPanel() {
        document.getElementById('currentGesture').textContent = this.currentGesture;
        document.getElementById('confidence').textContent = Math.round(this.gestureConfidence * 100) + '%';
        document.getElementById('fingerCount').textContent = this.fingerCount;
        document.getElementById('controlMap').textContent = this.getControlStatus();
    }
    
    getControlStatus() {
        if (this.currentGesture === '食指指向') return '🎯 指向模式';
        if (this.currentGesture === '開放手掌') return '🔄 重置模式';
        if (this.currentGesture === '勝利手勢') return '✨ 隨機激活';
        return '👐 等待手勢';
    }
    
    updateFPS() {
        this.frameCount++;
        const now = Date.now();
        const elapsed = now - this.lastFpsUpdate;
        
        if (elapsed >= 1000) {
            this.fps = this.frameCount;
            document.getElementById('fps').textContent = this.fps;
            this.frameCount = 0;
            this.lastFpsUpdate = now;
        }
    }
    
    updateSystemStatus(status) {
        document.getElementById('systemStatus').textContent = status;
    }
    
    updateDetectionMode(mode) {
        document.getElementById('detectionMode').textContent = mode;
    }
}

// ===== 應用初始化 =====
let controller = null;

document.addEventListener('DOMContentLoaded', () => {
    controller = new IronManController();
});

// ===== MediaPipe 全局設置 =====
const Hands = window.Hands;
const Camera = window.Camera;
