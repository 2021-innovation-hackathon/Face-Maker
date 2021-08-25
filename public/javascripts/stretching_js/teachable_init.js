class teachable_init{
    $init = null;

    constructor($target){
        var $init = document.createElement("div");
        $init.innerHTML=`test`;
        this.$init = $init;
        $target.appendChild(this.$init);
    }
}