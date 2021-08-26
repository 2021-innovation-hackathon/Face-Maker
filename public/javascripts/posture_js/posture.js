const URL = "/model/posture_model/"; // 모델 주소
let model, webcam, ctx, labelContainer, progressContainer, maxPredictions;

var audio = new Audio("/sound/beep.MP3");
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

init();
timerId = setInterval(check, 1000);

function check() {
  now = new Date();

  var seconds = Math.round((now - online) / 1000);
  fetch(`/posture/alltime`);
  var print_seconds = seconds % 60;
  var minutes = Math.floor(seconds / 60);
  var print_minutes = minutes % 60;
  var hours = Math.floor(minutes / 60);

  let values = document.getElementsByClassName("Value");
  values[0].innerText = cnt4;
  values[1].innerText = cnt3;
  values[2].innerText = cnt1;
  values[3].innerText = cnt2;

  let gauges = document.getElementsByClassName("Fill");
  let sum = cnt0 + cnt1 + cnt2 + cnt3 + cnt4;
  gauges[0].style.width = (cnt0 / sum) * 8.1 * 100;
  gauges[1].style.width = (cnt4 / sum) * 3.24 * 100;
  gauges[2].style.width = (cnt3 / sum) * 3.24 * 100;
  gauges[3].style.width = (cnt1 / sum) * 3.24 * 100;
  gauges[4].style.width = (cnt2 / sum) * 3.24 * 100;

  console.log(cnt5);
}

function audiocontrol(audio, onoff) {
  if (onoff) {
    audio.play();
  }
}

function soundon() {
  onoff = true;
}

function soundoff() {
  onoff = false;
}

function onoffsound() {
  count++;
  $("p").toggle();

  if (count % 2 == 1) {
    soundon();
  } else {
    soundoff();
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
  const width = 800;
  const height = 600;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(width, height, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append/get elements to the DOM
  const canvas = document.getElementById("canvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");
  

  progressContainer = document.getElementById("progress-container");
  progressContainer.appendChild(document.createElement("progress"));
  progressContainer.childNodes[0].value = 0;
  progressContainer.childNodes[0].max = 100;
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

  if (prediction[0].probability.toFixed(2) >= 0.7) {
    status = "Good";
    if (playb0) {
      spendtimedata();
      playb0 = false;
    }
  } else if (prediction[1].probability.toFixed(2) == 1.0) {
    status = "Bad_left";
    audiocontrol(audio, onoff);

    if (playb1) {
      spendtimedata();
      playb1 = false;
    }
  } else if (prediction[2].probability.toFixed(2) == 1.0) {
    audiocontrol(audio, onoff);
    status = "Bad_right";

    if (playb2) {
      spendtimedata();
      playb2 = false;
    }
  } else if (prediction[3].probability.toFixed(2) == 1.0) {
    audiocontrol(audio, onoff);
    status = "Bad_back";

    if (playb3) {
      spendtimedata();
      playb3 = false;
    }
  } else if (prediction[4].probability.toFixed(2) == 1.0) {
    audiocontrol(audio, onoff);
    status = "Bad_front";

    if (playb4) {
      spendtimedata();
      playb4 = false;
    }
  } else if (prediction[5].probability.toFixed(2) == 1.0) {
    status = "None";

    if (playb5) {
      spendtimedata();
      playb5 = false;
    }
  }
  progressContainer.childNodes[0].value = prediction[0].probability.toFixed(2) * 100;
  // finally draw the poses
  drawPose(pose);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function spendtimedata() {
  if (status == "Good") {
    //86400 == 24시간
    cnt0++;
    //console.log("좋은자세 :" + cnt0 + "초");
    fetch(`/posture/goodpose`);
    await sleep(1000);
    playb0 = true;
  } else if (status == "Bad_left") {
    cnt1++;
    //console.log(cnt1);
    fetch(`/posture/leftpose`);
    await sleep(1000);
    playb1 = true;
  } else if (status == "Bad_right") {
    cnt2++;
    //console.log(cnt2);
    fetch(`/posture/rightpose`);
    await sleep(1000);
    playb2 = true;
  } else if (status == "Bad_back") {
    cnt3++;
    //console.log("뒤 : "+ cnt3 + " 초");
    fetch(`/posture/backpose`);
    await sleep(1000);
    playb3 = true;
  } else if (status == "Bad_front") {
    cnt4++;
    //console.log(cnt4);
    fetch(`/posture/frontpose`);
    await sleep(1000);
    playb4 = true;
  } else if (status == "None") {
    cnt5++;
    //console.log(cnt5);
    fetch(`/posture/nonetime`);
    await sleep(1000);
    playb5 = true;
  }
}
