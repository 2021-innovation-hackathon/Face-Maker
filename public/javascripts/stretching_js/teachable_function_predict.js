async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
        progress.childNodes[i].value = prediction[i].probability.toFixed(2) * 100;
    }
    document.getElementById("count").innerHTML="스트레칭 횟수: " + count;
    if(prediction[1].probability > 0.99){
        count++;
    }

    
    // finally draw the poses
    drawPose(pose);
}