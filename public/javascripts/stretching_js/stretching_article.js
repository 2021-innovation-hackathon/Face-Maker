class article{
    $article = null;
    $canvas =null;
    $label_container = null;
    $img = null;
    constructor($target){
        //article 구역 추가
        var $article = document.createElement("section");
        $article.className = "article";
        this.$article = $article;
        $target.appendChild($article);


        //웹캠, 라벨, 사진 article 구역으로 추가
        var $canvas = document.createElement("div");
        var $label_container = document.createElement("div");
        var $img = document.createElement("div");

        $canvas.id = "canvas_div";
        $label_container.id = "label";
        $img.id = "img";

        this.$canvas = $canvas;
        this.$label_container = $label_container;
        this.$img = $img;

        $canvas.innerHTML = `<canvas id="canvas"></canvas>`;
        $label_container.innerHTML = `<div id="label-container"></div>`;
        $img.innerHTML = `<img src="images/pose_1.png"></img>`;


        $article.appendChild($canvas);
        $article.appendChild($label_container);
        $article.appendChild($img);
    }
}