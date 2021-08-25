class number{
    $time = null;
    $today = null;
    $sec = null;
    $progress = null;
    constructor($target){
        var $today = document.createElement("div");
        var $sec = document.createElement("div");
        var $label_container = document.createElement("div");
        var $progress = document.createElement("div");

        
        $today.id = "today";
        $sec.id = "sec";
        $label_container.id = "label-container";

        this.$today = $today;
        this.$sec = $sec;
        this.$label_container = $label_container;

        $target.appendChild($today);
        $target.appendChild($sec);
        $target.appendChild($label_container);
        this.$time = new timer($target);
    }

}