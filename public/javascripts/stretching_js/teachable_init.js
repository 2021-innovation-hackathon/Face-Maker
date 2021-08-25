class teachable_init{
    $start_button = null;
    
    constructor($target){
        var $start_button = document.createElement("div");
        $start_button.id="button";
        this.$start_button = $start_button;
        $start_button.innerHTML=`<button type="button" onclick="init()">Start</button>`;
        $target.appendChild($start_button);
        
    }
}
//모션인식 버튼 부분 생성