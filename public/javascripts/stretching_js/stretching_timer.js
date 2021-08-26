//시간 측정을 위한 클래스이다.
class timer {
  $timer = null;
  $time = null;
  constructor($target) {
    const $time = document.createElement("script");
    $time.className = "timer";
    $time.innerHTML = `
      
      
      
      timerId = null;
         
      timerId = setInterval(check, 1000);
            
      `;

    this.$time = $time;
    $target.appendChild($time);
  }
}

function check() {
  now = new Date();

  var seconds = Math.round((now - online) / 1000);
  fetch(`/stretching/alltime`);
  var print_seconds = seconds % 60;
  var minutes = Math.floor(seconds / 60);
  var print_minutes = minutes % 60;
  var hours = Math.floor(minutes / 60);

  var now_seconds = Math.round((now - today) / 1000);
  var print_now_seconds = now_seconds % 60;
  var now_minutes = Math.floor(now_seconds / 60);
  var print_now_minutes = now_minutes % 60;
  var now_hours = Math.floor(now_minutes / 60);

  document.getElementById("today").innerHTML =
    "접속시간 " + hours + "시" + print_minutes + "분" + print_seconds + "초";
  document.getElementById("sec").innerHTML =
    "스트레칭 안한지 벌써 " +
    now_hours +
    "시" +
    print_now_minutes +
    "분" +
    print_now_seconds +
    "초";

  if (now_seconds > 20) {
    if (my_status == "rest") {
      if (sound_check == false) {
        audio.play();
        sound_check = true;
        window.open(
          "/stretching/alert",
          "_blank",
          "width=200, height=200, top=300, left=500 toolbar=no, menubar=no,location=no, scrollbars=no,status=no,resizable=no"
        );
      }

      webcam.play();
      my_status = "nomal";
      sound_check = false;
      canvas.style.display = "block";
      document.getElementById("posetime").style.display = "block";
      document.getElementById(
        "stretching_text"
      ).innerHTML = `정자세를 유지하세요!`;
    }
  }
}
