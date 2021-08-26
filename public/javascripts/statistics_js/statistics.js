const $tabBtnArr = document.getElementsByClassName("TabBtn");
const $articleArr = document.getElementsByClassName("GaugeContainer");

$tabBtnArr[0].addEventListener("click", () => {
  $articleArr[0].style.display = "flex";
  $articleArr[1].style.display = "none";
});
$tabBtnArr[1].addEventListener("click", () => {
  $articleArr[1].style.display = "flex";
  $articleArr[0].style.display = "none";
});

/*
let $valueArr = document.getElementsByClassName("Value");
let $fillArr = document.getElementsByClassName("Fill");
let postureSum = 
let stretchSum = 

$fillArr[0].style.width = 누적 바른자세 시간
$valueArr[].style.width = */
