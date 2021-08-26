const $menuBtnArr = document.getElementsByClassName("MenuBtn");
const $button = document.getElementsByClassName("Button")[0];
const $buttonContainer = document.getElementsByClassName("BtnContainer")[0];
$buttonContainer.style.display = "none";
let menubar = false;

$menuBtnArr[0].addEventListener("click", posture);
$menuBtnArr[1].addEventListener("click", stretching);
$menuBtnArr[2].addEventListener("click", statistics);

$button.addEventListener("click", toggleMenu);

function stretching() {
  window.location.href = "stretching";
}
function posture() {
  window.location.href = "posture";
}
function statistics() {
  window.location.href = "statistics";
}

function toggleMenu() {
  if (menubar == false) {
    menubar = true;
    $buttonContainer.style.display = "flex";
    document.getElementById("btn").src = "../images/icon/close.svg";
  } else {
    menubar = false;
    $buttonContainer.style.display = "none";
    document.getElementById("btn").src = "../images/icon/menu.svg";
  }
}
