const $menuBtnArr = document.getElementsByClassName("MenuBtn");

$menuBtnArr[0].addEventListener("click", gotod);

function gotod() {
  window.location.href = "localhost:5500/stretching";
}
