class footer{
    
    $but = null;
    constructor($target){
        var $but = document.createElement("div");
        this.$but = $but;
        $but.innerHTML = `<button onclick="location.href ='/stretching/up'">일어선 버젼 스트레칭</button>
        <button onclick="location.href ='/stretching'">앉은 버젼 스트레칭</button>`;
        $target.appendChild($but);
    }
}

