

let preTime = null;
let newTime = null;
let left = false;
let leftTime = 0;
let right = false;
let front = false;
let back = false;




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

    // 효과음 (제작)
    // prediction[0] => prediction[1] 좋은자세에서 나쁜자세로 갈 때 알림음을 들려줌

    if (prediction[1].probability.toFixed(2) != 1.00 && left == true) {
        left = false;
        newTime = new Date();
        leftTime += newTime - preTime;
    }
    
    if (prediction[0].probability.toFixed(2) == 1.00) {
        
        //cnt_goodpose++;
        //console.log(cnt_goodpose);
        status = "good"
        
        
    }
    
    else if (prediction[1].probability.toFixed(2) == 1.00 && left == false) {
        left = true;
        audio.play();
        preTime = new Date();
        console.log(preDate)
        status = "bad_left"
    }

    else if (prediction[2].probability.toFixed(2) == 1.00 && right == false) {
        audio.play();
        
        status = "bad_right"
    }

    else if (prediction[3].probability.toFixed(2) == 1.00 && back == false) {
        audio.play();
        status = "bad_back"
    }

    else if (prediction[4].probability.toFixed(2) == 1.00 && front == false) {
        audio.play();
        status = "bad_front"
    }

    else {
        status = "none"
    }

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        //labelContainer.childNodes[i].innerHTML = classPrediction;
        progress.childNodes[i].value = prediction[i].probability.toFixed(2) * 100;
    }
    

    // finally draw the poses
    drawPose(pose);

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
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
        progress.appendChild(document.createElement("progress"));
        progress.childNodes[i].value = 0;
        progress.childNodes[i].max = 100;

    }
}