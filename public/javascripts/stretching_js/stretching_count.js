class count_num{
    
    $count = null;
    
    constructor($target){
        var $count = document.createElement("div");
        this.$count = $count;
        $count.id="count";
        $count.innerHTML = "스트레칭 횟수: " + count;
        $target.appendChild($count);
        
    }


}