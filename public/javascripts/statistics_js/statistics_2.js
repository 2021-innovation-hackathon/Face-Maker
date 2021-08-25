var main = document.getElementById("main");


var header = document.createElement("div");
header.innerHTML = `<a href="/">홈페이지</a>
<a href="/statistics">통계</a>`;
main.appendChild(header);


var article = document.createElement("div");
main.appendChild(article);
var stretching = document.createElement("div");

fetch("/statistics/two/stretching")
.then((res) => res.json())
.then((res)=>{
    var id;
    var alltime;
    var count;
    var average;
    var goodscore;
    
    id = res.stretching_id;
    alltime = res.alltime;
    count = res.count;
    average = res.average;
    goodscore = res.goodscore;
    
    stretching.innerHTML = `<div id="stretching">
    <h2>스트레칭</div>
    <div>아이디: ${id}</div>
    <div>누적 사용 시간: ${alltime}</div>
    <div>스트레칭 횟수: ${count}</div>
    <div>평균 스트레칭 점수: ${average}</div>
    <div>최고 스트레칭 점수: ${goodscore}</div>
    </div> `
    article.appendChild(stretching);
})

