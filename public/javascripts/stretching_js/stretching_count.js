//스트레칭 횟수 표기 공간을 생성하는 클래스이다.
class count_num{
    
    $count = null;
    $score = null;
    $allscore = null;
    constructor($target){
        var $count = document.createElement("div");
        this.$count = $count;
        $count.id="count";
        $count.innerHTML = "스트레칭 횟수: " + count;
        $target.appendChild($count);
        
        var $score = document.createElement("div");
        this.$score = $score;
        $score.id = "score";
        $score.innerHTML = "현재점수: " + now_score;
        $target.appendChild($score);

        var $allscore = document.createElement("div");
        this.$allscore = $allscore;
        $allscore.id = "allscore";
        $allscore.innerHTML = "기록: ";
        $target.appendChild($allscore);
    }


}