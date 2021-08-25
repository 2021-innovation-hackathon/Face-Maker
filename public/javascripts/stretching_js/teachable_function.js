//각종 전역변수와 잘 사용되지않는 함수이다.
let model, webcam, ctx, labelContainer, maxPredictions, my_status = "nomal";
let count = 0;
let progress = document.createElement("div");
var audio = new Audio('/sound/alarm.wav');
var audio2 = new Audio('/sound/dingdong.mp3');
var sound_check = false;

var online = new Date();
var today = new Date();
var now = new Date();   

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}



function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            //tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            //tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}