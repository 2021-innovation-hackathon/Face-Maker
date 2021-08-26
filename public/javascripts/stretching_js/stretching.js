//각종 전역변수와 잘 사용되지않는 함수이다.
let URL = "https://teachablemachine.withgoogle.com/models/YZ6RTcqi4/";
let model,
  webcam,
  ctx,
  labelContainer,
  maxPredictions,
  my_status = "normal";

let count = 0;

var audio = new Audio("/sound/alarm.wav");
var audio2 = new Audio("/sound/dingdong.mp3");
var audio_pickto = new Audio("/sound/pickto.mp3");
var sound_check = false;

var online = new Date();
var today = new Date();
var now = new Date();

var now_score = 0;
let now_seconds = 0;

const ost = document.getElementsByClassName("OnScreenTxt");
const img = document.getElementsByClassName("Pictogram")[0];
const values = document.getElementsByClassName("Value");
const playbutton = document.getElementsByClassName("Play")[0];
const gauge = document.getElementsByClassName("Fill")[0];

init();
img.style.display = "none";
playbutton.addEventListener("click", start);
timerId = setInterval(check, 1000);

function check() {
  now = new Date();
  fetch(`/stretching/alltime`); //경과시간 체크

  now_seconds = Math.round((now - today) / 1000);

  if (now_seconds > 20) {
    if (my_status == "rest") {
      if (sound_check == false) {
        ost.innerText = "";
        gauge.style.width = "0%";
        playbutton.style.display = "block";
        img.style.display = "none";
        audio.play();
        //audio_pickto.play();
        sound_check = true;
        window.open(
          "/stretching/alert",
          "_blank",
          "width=200, height=200, top=300, left=500 toolbar=no, menubar=no,location=no, scrollbars=no,status=no,resizable=no"
        );
      }

      webcam.play();
      my_status = "normal";
      sound_check = false;
      canvas.style.display = "block";
      ost[0].style.display = "block";
      ost[1].innerHTML = `정자세를 유지하세요!`;
    }
  }
}

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const width = 1035;
  const height = 680;
  const flip = true;
  webcam = new tmPose.Webcam(width, height, flip);
  await webcam.setup();
  await webcam.play();

  //ost[1].innerText = `정자세를 유지하세요!`;

  const canvas = document.getElementById("canvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");
}

function start() {
  playbutton.style.display = "none";
  img.style.display = "block";
  window.requestAnimationFrame(loop);
  audio_pickto.play();
  sound_check = true;
  now_seconds = 0;
}

async function loop(timestamp) {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  const prediction = await model.predict(posenetOutput);

  if (now_seconds % 60 < 10) {
    values[0].innerText = `0${Math.round(now_seconds / 60)} : 0${Math.round(
      now_seconds % 60
    )}`;
  } else {
    values[0].innerText = `0${Math.round(now_seconds / 60)} : ${Math.round(
      now_seconds % 60
    )}`;
  }
  values[1].innerHTML = `${count + 1} / 5`;
  values[2].innerText = `${now_score}점`;
  gauge.style.width = `${count * 20}%`;

  if (prediction[0].probability > 0.8 && my_status == "normal") {
    ready();

    ost[1].innerText = "스트레칭 동작을 실시하세요!";
    img.src = `/images/pictogram/ptpose_${count + 2}.png`;
  } else if (
    my_status == "pose" &&
    count <= 4 &&
    prediction[count + 1].probability > 0.8
  ) {
    audio2.play();
    my_status = "normal";
    img.src = `/images/pictogram/ptpose_1.png`;
    ost[1].innerText = "성공!";

    now_score += Math.round(prediction[count + 1].probability * 100);
    fetch(`/stretching/average/${now_score}`); //현재 점수 추가
    await sleep(1000);
    count++;
  } else if (my_status == "pose") {
    my_status = "normal";
    ost[1].innerText = `실패!`;
    await sleep(1000);
  }

  if (count > 4) {
    count = 0;
    my_status = "rest";
    today = new Date();

    audio_pickto.pause();
    webcam.pause();
    canvas.style.display = "none";
    ost[0].style.display = "none";
    ost[1].innerText = "스트레칭 시간을 기다리세요!";
    fetch("/stretching/count"); //스트레칭 횟수 +1
  }
  // finally draw the poses
  drawPose(pose);
}

function drawPose(pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0);
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function ready() {
  my_status = "ready";
  let i = 4;
  for (; i > 0; i--) {
    ost[0].innerHTML = i;
    await sleep(1000);
  }
  my_status = "pose";
}
