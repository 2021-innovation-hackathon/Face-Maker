var main = document.getElementById("main");


var header = document.createElement("div");
header.innerHTML = `<a href="/">홈페이지</a>
<a href="/statistics">통계</a>`;
main.appendChild(header);


var article = document.createElement("div");
main.appendChild(article);
var stretching = document.createElement("div");
var posture = document.createElement("div");
fetch("/statistics/three/stretching")
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
    stretching.innerHTML = `<div id="stretching">
    <h2>스트레칭</div>
    <div>아이디: ${id}</div>
    <div>누적 사용 시간: ${sthour} 시 ${stmin%60} 분 ${alltime%60} 초</div>
    <div>스트레칭 횟수: ${count} 회</div>
    <div>평균 스트레칭 점수: ${average} 점</div>
    <div>누적 스트레칭 점수: ${sumscore} 점</div>
    <div>스트레칭 주기: ${cyhour} 시${cymin%60} 분 ${cycle%60} 초</div>
    </div> `
    
    article.appendChild(stretching);
})
fetch("/statistics/three/posture")
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
    posture.innerHTML = `<div id="posture">
    <h2>바른 자세</h2>
    <div>아이디: ${id}</div>
    <div>누적 사용 시간: ${pohour} 시 ${pomin%60} 분 ${alltime%60} 초</div>
    <div>좋은 자세 유지 시간: ${goodpose} 초</div>
    <div>나쁜 자세 유지 시간: ${badpose} 초</div>
    <div>왼쪽 자세: ${leftpose} 초</div>
    <div>오른쪽 자세: ${rightpose} 초</div>
    <div>뒤쪽 자세: ${backpose} 초</div>
    <div>앞쪽 자세: ${frontpose} 초</div>
    <div>화면에서 사라진 시간: ${nonetime} 초</div>
    </div> `;

    article.appendChild(posture);
})

