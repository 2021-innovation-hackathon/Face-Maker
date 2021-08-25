class number{
    $time = null;
    $today = null;
    $sec = null;
    $progress = null;
    $count = null;
    $labels = null;
    constructor($target){
        var $today = document.createElement("div");
        var $sec = document.createElement("div");
        var $label_container = document.createElement("div");
        var $progress = progress;
        var $labels = document.createElement("div");

        $labels.className="labels";
        $today.id = "today";
        $sec.id = "sec";
        $label_container.id = "label-container";
        

        this.$today = $today;
        this.$sec = $sec;
        this.$label_container = $label_container;
        this.$labels = $labels;

        
        $target.appendChild($today);
        $target.appendChild($sec);
        $target.appendChild($labels);
        $labels.appendChild($label_container);
        $labels.appendChild($progress);
        
        
        this.$time = new timer($target);
        this.$count = new count_num($target);
    }

}
