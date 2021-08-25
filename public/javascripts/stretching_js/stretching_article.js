class article{
    $article = null;
    $canvas =null;
    $label_container = null;
    $img = null;
    $number = null;


    constructor($target){
        //article 구역 추가
        var $article = document.createElement("section");
        $article.className = "article";
        this.$article = $article;
        $target.appendChild($article);


        //웹캠,  사진 article 구역으로 추가
        var $canvas = document.createElement("div");
        var $img = document.createElement("div");
        var $number = document.createElement("div");

        $canvas.id = "canvas_div";
        $img.id = "img";
        $number.id="number";
       

        this.$canvas = $canvas;
        this.$img = $img;
        this.$number = $number;

        $canvas.innerHTML = `<canvas id="canvas"></canvas>`;
        $img.innerHTML = `<img src="images/pose_1.png"></img>`;
        

        $article.appendChild($canvas);
        $article.appendChild($img);
        $article.appendChild($number);
        $number = new number($number);

        

        
        
       

    }
}