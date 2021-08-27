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






fetch("/statistics/one/stretching")
.then((res) => res.json())
.then((res)=>{
    var id;
    var alltime;
    var count;
    var average;
    var sumscore;
    
    id = res.stretching_id;
    alltime = res.alltime;
    var stmin = Math.round(alltime/60);
    var sthour = Math.round(stmin/60);
    count = res.count;
    average = Math.round(res.average);
    sumscore = res.sumscore;
    var cycle = Math.round(alltime/count)
    var cymin = Math.round(cycle/60);
    var cyhour = Math.round(cymin/60);
    
    
    var str = document.getElementById("stretching");
    str.innerHTML=`
    <h2>스트레칭</h2>

    <p>
    <div>아이디: ${id}</div>
    <div>누적 사용 시간: ${sthour} 시 ${stmin%60} 분 ${alltime%60} 초</div>
    <div>스트레칭 횟수: ${count} 회</div>
    <div>평균 스트레칭 점수: ${average} 점</div>
    <div>누적 스트레칭 점수: ${sumscore} 점</div>
    <div>스트레칭 주기: ${cyhour} 시${cymin%60} 분 ${cycle%60} 초</div>
    </p>
    `;
})
fetch("/statistics/one/posture")
.then((res)=>res.json())
.then((res)=>{
    
    var id = res.posture_id;
    var alltime = res.alltime;
    var pomin = Math.round(alltime/60);
    var pohour = Math.round(pomin/60);

    var goodpose = res.goodpose;
    var leftpose = res.leftpose;
    var rightpose = res.rightpose;
    var backpose = res.backpose;
    var frontpose = res.frontpose;
    var nonetime  = res.nonetime;
    var badpose = leftpose + rightpose + backpose + frontpose;
    

    var pos = document.getElementById("posture");
    pos.innerHTML=`
    <h2>바른 자세</h2>
    
    <p>
    <div>아이디: ${id}</div>
    <div>누적 사용 시간: ${pohour} 시 ${pomin%60} 분 ${alltime%60} 초</div>
    <div>좋은 자세 유지 시간: ${goodpose} 초</div>
    <div>나쁜 자세 유지 시간: ${badpose} 초</div>
    <div>왼쪽 자세: ${leftpose} 초</div>
    <div>오른쪽 자세: ${rightpose} 초</div>
    <div>뒤쪽 자세: ${backpose} 초</div>
    <div>앞쪽 자세: ${frontpose} 초</div>
    <div>화면에서 사라진 시간: ${nonetime} 초</div>
    </p>
    `;
})




/*
let $valueArr = document.getElementsByClassName("Value");
let $fillArr = document.getElementsByClassName("Fill");
let postureSum = 
let stretchSum = 

$fillArr[0].style.width = 누적 바른자세 시간
$valueArr[].style.width = */
