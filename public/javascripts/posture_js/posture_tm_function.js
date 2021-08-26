class tm_function{
    $tm_function = null;
    constructor($target){
        var $tm_function = document.createElement("script");
        $tm_function.type = "text/javascript";
        $tm_function.innerHTML = `
        // More API functions here:
        // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose
        // the link to your model provided by Teachable Machine export panel
            
            
        const URL = "/model/posture_model/"; // 모델 주소
        let model, webcam, ctx, labelContainer, progressContainer, maxPredictions;
        
        let modelclassname = ["바른 자세","왼쪽으로 치우쳤어요","오른쪽으로 치우쳤어요","뒤로 치우쳤어요","앞으로 치우쳤어요","사용자가 화면에 없어요"];

        var status = "good";
        
        
        
        var count = 0;
        

        var audio = new Audio('/sound/beep.MP3');
        var onoff = false;
        var online = new Date();
        var today = new Date();
        var now = new Date();
        
        var playb0 = true;
        var playb1 = true;
        var playb2 = true;
        var playb3 = true;
        var playb4 = true;
        var playb5 = true;

        var cnt0 = 0;
        var cnt1 = 0;
        var cnt2 = 0;
        var cnt3 = 0;
        var cnt4 = 0;
        var cnt5 = 0;
        
        
        
        
        
        
    
        

            
        `;
        this.$tm_function = $tm_function;
        $target.appendChild($tm_function);
    }
}



async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 400;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");


    


    // section 2부분
    labelContainer = document.getElementById("label-container");
    progressContainer = document.getElementById("progress-container");

    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
        progressContainer.appendChild(document.createElement("progress"));
        progressContainer.childNodes[i].value = 0;
        progressContainer.childNodes[i].max = 100;

    }
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}



async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    

    if (prediction[0].probability.toFixed(2) == 1.00) {
        status = "Good"
        if (playb0){
            spendtimedata();
            playb0 = false;
        }
    }
    
    else if (prediction[1].probability.toFixed(2) == 1.00) {
        status = "Bad_left"        
        audiocontrol(audio,onoff);

        if (playb1){
            spendtimedata();
            playb1 = false;
        }
    }

    else if (prediction[2].probability.toFixed(2) == 1.00) {
        audiocontrol(audio,onoff);
        status = "Bad_right"

        if (playb2){
            spendtimedata();
            playb2 = false;
        }
    }

    else if (prediction[3].probability.toFixed(2) == 1.00) {
        audiocontrol(audio,onoff);
        status = "Bad_back"

        if (playb3){
            spendtimedata();
            playb3 = false;
        }
    }

    else if (prediction[4].probability.toFixed(2) == 1.00) {
        audiocontrol(audio,onoff);
        status = "Bad_front"
        
        if (playb4){
            spendtimedata();
            playb4 = false;
        }
    }

    else if (prediction[5].probability.toFixed(2) == 1.00) {
        status = "None"

        if (playb5){
            spendtimedata();
            playb5= false;
        }
    }

    for (let i = 0; i < maxPredictions; i++) {
    
        labelContainer.childNodes[i].innerHTML = modelclassname[i];
        progressContainer.childNodes[i].value = prediction[i].probability.toFixed(2) * 100;
    }
    

    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}


function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function spendtimedata(){
    
    if (status == "Good") { //86400 == 24시간
        cnt0++
        //console.log("좋은자세 :" + cnt0 + "초");
        fetch(`/posture/goodpose`);
        await sleep(1000);
        playb0 = true;
    }

    else if(status == "Bad_left"){
        cnt1++
        //console.log(cnt1);
        fetch(`/posture/leftpose`);
        await sleep(1000);
        playb1 = true;
    }

    else if(status == "Bad_right"){
        cnt2++
        //console.log(cnt2);
        fetch(`/posture/rightpose`);
        await sleep(1000);
        playb2 = true;
    }

    else if(status == "Bad_back"){
        cnt3++
        //console.log("뒤 : "+ cnt3 + " 초");
        fetch(`/posture/backpose`);
        await sleep(1000);
        playb3 = true;
    }

    else if(status == "Bad_front"){
        cnt4++
        //console.log(cnt4);
        fetch(`/posture/frontpose`);
        await sleep(1000);
        playb4 = true;
    }

    else if(status == "None"){
        cnt5++
        //console.log(cnt5);
        fetch(`/posture/nonetime`);
        await sleep(1000);
        playb5 = true;
    }
    

    
}

