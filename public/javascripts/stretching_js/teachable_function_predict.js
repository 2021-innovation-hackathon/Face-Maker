//여러번 반복수행되는 predict함수이다. 자세의 정확도를 판단한다.
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
        document.getElementById("stretching_text").innerHTML = `스트레칭 동작을 실시하세요!`;
        document.querySelector("img").src="images/pose_1.png";
        
    }
    else if(prediction[1].probability > 0.99 && my_status == "pose"){
        count++;
        document.querySelector("img").src="images/pose_2.png";
        audio2.play();
        my_status = "nomal";
        document.getElementById("stretching_text").innerHTML = `성공!`;
        now_score = Math.round(prediction[1].probability*100);
        document.getElementById("score").innerHTML="현재점수: " + now_score;
        document.getElementById("allscore").innerHTML += "<br>"+now_score;
        await sleep(500);

        if(count > 2){
            
            count = 0;
            my_status = "rest";
            today = new Date();
            webcam.pause();
            canvas.style.display="none";
            document.getElementById("posetime").style.display="none";
            document.getElementById("stretching_text").innerHTML = `스트레칭 시간을 기다리세요!`;
            document.getElementById("allscore").innerHTML = "기록: ";
            fetch("/stretching/count");
        }

    }
    else if(my_status == "pose"){
        my_status = "nomal";
        document.getElementById("stretching_text").innerHTML = `실패!`;
        now_score = Math.round(prediction[1].probability*100);
        document.getElementById("allscore").innerHTML += "<br>"+now_score;
        await sleep(500);
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