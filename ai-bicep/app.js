let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let leftCountEl = document.getElementById('leftCount');
let rightCountEl = document.getElementById('rightCount');
let leftAngleEl = document.getElementById('leftAngle');
let rightAngleEl = document.getElementById('rightAngle');
let leftStateEl = document.getElementById('leftState');
let rightStateEl = document.getElementById('rightState');
let statusEl = document.getElementById('status');
let currentModelEl = document.getElementById('currentModel');

let repCountLeft = 0;
let repCountRight = 0;
let leftCurling = false;
let rightCurling = false;

let detector;
let modelType = poseDetection.SupportedModels.MoveNet;

function toDegrees(rad) {
    return rad * (180 / Math.PI);
}

function getAngle(A, B, C) {
    const AB = [A.x - B.x, A.y - B.y];
    const CB = [C.x - B.x, C.y - B.y];
    const dot = AB[0]*CB[0] + AB[1]*CB[1];
    const magAB = Math.sqrt(AB[0]**2 + AB[1]**2);
    const magCB = Math.sqrt(CB[0]**2 + CB[1]**2);
    return toDegrees(Math.acos(dot / (magAB * magCB)));
}

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function loadModel() {
    detector = await poseDetection.createDetector(modelType, {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
    });
    currentModelEl.textContent = 'MoveNet Lightning';
}

function updateStats(keypoints) {
    const ls = keypoints.find(kp => kp.name === 'left_shoulder');
    const le = keypoints.find(kp => kp.name === 'left_elbow');
    const lw = keypoints.find(kp => kp.name === 'left_wrist');

    const rs = keypoints.find(kp => kp.name === 'right_shoulder');
    const re = keypoints.find(kp => kp.name === 'right_elbow');
    const rw = keypoints.find(kp => kp.name === 'right_wrist');

    if (ls && le && lw && ls.score > 0.5 && le.score > 0.5 && lw.score > 0.5) {
        const leftAngle = Math.round(getAngle(ls, le, lw));
        leftAngleEl.textContent = `${leftAngle}°`;
        if (leftAngle < 60 && !leftCurling) leftCurling = true;
        if (leftAngle > 150 && leftCurling) {
            repCountLeft++;
            leftCountEl.textContent = repCountLeft;
            leftCurling = false;
        }
        leftStateEl.textContent = leftCurling ? 'Curling' : 'Ready';
    }

    if (rs && re && rw && rs.score > 0.5 && re.score > 0.5 && rw.score > 0.5) {
        const rightAngle = Math.round(getAngle(rs, re, rw));
        rightAngleEl.textContent = `${rightAngle}°`;
        if (rightAngle < 60 && !rightCurling) rightCurling = true;
        if (rightAngle > 150 && rightCurling) {
            repCountRight++;
            rightCountEl.textContent = repCountRight;
            rightCurling = false;
        }
        rightStateEl.textContent = rightCurling ? 'Curling' : 'Ready';
    }
}

function drawCanvas(keypoints) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    keypoints.forEach(kp => {
        if (kp.score > 0.4) {
            ctx.beginPath();
            ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'lime';
            ctx.fill();
        }
    });
}

async function detect() {
    const poses = await detector.estimatePoses(video);
    if (poses && poses.length > 0) {
        const keypoints = poses[0].keypoints;
        updateStats(keypoints);
        drawCanvas(keypoints);
    }
    requestAnimationFrame(detect);
}

async function main() {
    statusEl.textContent = 'Setting up camera...';
    await setupCamera();
    video.play();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    statusEl.textContent = 'Loading model...';
    await loadModel();
    statusEl.textContent = 'Model loaded';
    detect();
}

main();
