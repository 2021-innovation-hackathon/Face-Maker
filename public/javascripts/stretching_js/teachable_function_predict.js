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

    if(prediction[0].probability > 0.99 && my_status == "nomal"){
        ready();
        document.querySelector("img").src="images/pose_1.png";
        
    }
    else if(prediction[1].probability > 0.99 && my_status == "pose"){
        count++;
        document.querySelector("img").src="images/pose_2.png";
        audio2.play();
        my_status = "nomal";
        await sleep(500);

        if(count > 3){
            today = new Date();
            count = 0;
        }

    }
    else if(my_status == "pose"){
        my_status = "nomal";
    }
    

    
    // finally draw the poses
    drawPose(pose);
}

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function ready(){
    my_status = "ready";
    let i = 4;
    var timers = document.querySelector("#posetime");
    for (;i > 0;i--) {
        timers.innerHTML=i;
        await sleep(1000);
    }
    my_status = "pose";
    
}