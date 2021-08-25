class teachable_init{
    $start_button = null;
    $canvas =null;
    $label_container = null;
    constructor($target){
        var $start_button = document.createElement("div");
        var $canvas = document.createElement("div");
        var $label_container = document.createElement("div");

        $start_button.id="button";
        $canvas.id="canvas_div";
        $label_container.id="label";


        this.$start_button = $start_button;
        this.$canvas = $canvas;
        this.$label_container = $label_container;



        $start_button.innerHTML=`<button type="button" onclick="init()">Start</button>`;
        $canvas.innerHTML = `<canvas id="canvas"></canvas>`;
        $label_container.innerHTML = `<div id="label-container"></div>`;
        $target.appendChild($start_button);
        $target.appendChild($canvas);
        $target.appendChild($label_container);
    }
}
