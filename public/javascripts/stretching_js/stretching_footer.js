class footer{
    
    $but = null;
    constructor($target){
        var $but = document.createElement("div");
        this.$but = $but;
        $but.innerHTML = `<button onclick="location.href ='/stretching/up'">stand up 버전 스트레칭</button>
        <button onclick="location.href ='/stretching'">sit down 버전 스트레칭</button>`;
        $target.appendChild($but);
    }
}

