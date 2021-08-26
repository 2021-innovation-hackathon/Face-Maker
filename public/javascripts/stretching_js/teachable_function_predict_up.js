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
  document.getElementById("count").innerHTML = "스트레칭 횟수: " + count;

  if (prediction[0].probability > 0.8 && my_status == "nomal") {
    ready();

    switch (count) {
      case 0:
        document.getElementById(
          "stretching_text"
        ).innerHTML = `스트레칭 동작을 실시하세요!`;
        document.querySelector("img").src = "/images/uppose_1.png";
        break;
      case 1:
        document.getElementById(
          "stretching_text"
        ).innerHTML = `스트레칭 동작을 실시하세요!`;
        document.querySelector("img").src = "/images/uppose_3.png";
        break;
      case 2:
        document.getElementById(
          "stretching_text"
        ).innerHTML = `스트레칭 동작을 실시하세요!`;
        document.querySelector("img").src = "/images/uppose_4.png";
        break;
      case 3:
        document.getElementById(
          "stretching_text"
        ).innerHTML = `스트레칭 동작을 실시하세요!`;
        document.querySelector("img").src = "/images/uppose_5.png";
        break;
      case 4:
        document.getElementById(
          "stretching_text"
        ).innerHTML = `스트레칭 동작을 실시하세요!`;
        document.querySelector("img").src = "/images/uppose_6.png";
        break;
    }
  } else if (
    prediction[1].probability > 0.8 &&
    my_status == "pose" &&
    count == 0
  ) {
    count++;
    document.querySelector("img").src = "/images/uppose_2.png";
    audio2.play();
    my_status = "nomal";
    document.getElementById("stretching_text").innerHTML = `성공!`;
    now_score = Math.round(prediction[1].probability * 100);
    fetch(`/stretching/average/${now_score}`);
    document.getElementById("score").innerHTML = "현재점수: " + now_score;
    document.getElementById("allscore").innerHTML += now_score + "점 ";
    await sleep(500);
  } else if (
    prediction[2].probability > 0.8 &&
    my_status == "pose" &&
    count == 1
  ) {
    count++;
    document.querySelector("img").src = "/images/uppose_2.png";
    audio2.play();
    my_status = "nomal";
    document.getElementById("stretching_text").innerHTML = `성공!`;
    now_score = Math.round(prediction[2].probability * 100);
    fetch(`/stretching/average/${now_score}`);
    document.getElementById("score").innerHTML = "현재점수: " + now_score;
    document.getElementById("allscore").innerHTML += now_score + "점 ";
    await sleep(500);
  } else if (
    prediction[3].probability > 0.8 &&
    my_status == "pose" &&
    count == 2
  ) {
    count++;
    document.querySelector("img").src = "/images/uppose_2.png";
    audio2.play();
    my_status = "nomal";
    document.getElementById("stretching_text").innerHTML = `성공!`;
    now_score = Math.round(prediction[3].probability * 100);
    fetch(`/stretching/average/${now_score}`);
    document.getElementById("score").innerHTML = "현재점수: " + now_score;
    document.getElementById("allscore").innerHTML += now_score + "점 ";
    await sleep(500);
  } else if (
    prediction[4].probability > 0.8 &&
    my_status == "pose" &&
    count == 3
  ) {
    count++;
    document.querySelector("img").src = "/images/uppose_2.png";
    audio2.play();
    my_status = "nomal";
    document.getElementById("stretching_text").innerHTML = `성공!`;
    now_score = Math.round(prediction[4].probability * 100);
    fetch(`/stretching/average/${now_score}`);
    document.getElementById("score").innerHTML = "현재점수: " + now_score;
    document.getElementById("allscore").innerHTML += now_score + "점 ";
    await sleep(500);
  } else if (
    prediction[5].probability > 0.8 &&
    my_status == "pose" &&
    count == 4
  ) {
    count++;
    document.querySelector("img").src = "/images/uppose_2.png";
    audio2.play();
    my_status = "nomal";
    document.getElementById("stretching_text").innerHTML = `성공!`;
    now_score = Math.round(prediction[5].probability * 100);
    fetch(`/stretching/average/${now_score}`);
    document.getElementById("score").innerHTML = "현재점수: " + now_score;
    document.getElementById("allscore").innerHTML += now_score + " 점";
    await sleep(500);
  } else if (my_status == "pose") {
    my_status = "nomal";
    document.getElementById("stretching_text").innerHTML = `실패!`;
    await sleep(500);
  }

  if (count > 4) {
    count = 0;
    my_status = "rest";
    today = new Date();
    webcam.pause();
    canvas.style.display = "none";
    document.getElementById("posetime").style.display = "none";
    ost.innerText = "스트레칭 시간을 기다리세요!";
    fetch("/stretching/count");
  }
  // finally draw the poses
  drawPose(pose);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function ready() {
  my_status = "ready";
  let i = 4;
  var timers = document.querySelector("#posetime");
  for (; i > 0; i--) {
    timers.innerHTML = i;
    await sleep(1000);
  }
  my_status = "pose";
}
