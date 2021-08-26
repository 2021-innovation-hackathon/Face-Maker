//모션인식 초기화 함수이다.
async function init() {
    document.getElementById("button").style.display = "none";
    //앉은 버젼 https://teachablemachine.withgoogle.com/models/YZ6RTcqi4/
    //선 버젼 https://teachablemachine.withgoogle.com/models/0InPsuv7U/
    let URL = "https://teachablemachine.withgoogle.com/models/0InPsuv7U/";
    let modelURL = URL + "model.json";
    let metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 450;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();

    document.querySelector("img").src="/images/3.png";
    await sleep(1000);
    document.querySelector("img").src="/images/2.png";
    await sleep(1000);
    document.querySelector("img").src="/images/1.png";
    await sleep(1000);
    audio_pickto.play();

    window.requestAnimationFrame(loop);
    document.getElementById("stretching_text").innerHTML = `정자세를 유지하세요!`;
    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");

    progress.id="progress";

    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
        progress.appendChild(document.createElement("progress"));
        progress.childNodes[i].value = 0;
        progress.childNodes[i].max = 100;
    }
}