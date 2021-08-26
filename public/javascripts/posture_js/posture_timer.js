//ok
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
  fetch(`/posture/alltime`);
  var print_seconds = seconds % 60;
  var minutes = Math.floor(seconds / 60);
  var print_minutes = minutes % 60;
  var hours = Math.floor(minutes / 60);

  document.getElementById("usetime").innerHTML =
    hours + ":" + print_minutes + ":" + print_seconds;

  document.getElementById("goodposetime").innerHTML =
    "좋은 자세 :" + cnt0 + "초";
  document.getElementById("badposetime").innerHTML =
    "나쁜 자세 :" + (cnt1 + cnt2 + cnt3 + cnt4) + "초";
  document.getElementById("badpose_left_time").innerHTML =
    "왼쪽 틀어짐 :" + cnt1 + "초";
  document.getElementById("badpose_rigth_time").innerHTML =
    "오른쪽 틀어짐 :" + cnt2 + "초";
  document.getElementById("badpose_back_time").innerHTML =
    "뒤 기울어짐 :" + cnt3 + "초";
  document.getElementById("badpose_front_time").innerHTML =
    "앞으로 기울어짐 :" + cnt4 + "초";

  document.getElementById("NonePeople_time").innerHTML =
    "자리 비움 :" + cnt5 + "초";
}
