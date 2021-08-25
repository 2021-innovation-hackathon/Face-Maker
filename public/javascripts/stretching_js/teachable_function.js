
let model, webcam, ctx, labelContainer, maxPredictions, my_status = false;
let count = 0;


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