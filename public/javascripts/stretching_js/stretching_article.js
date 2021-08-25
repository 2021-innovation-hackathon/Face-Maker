//article은 웹캠인 canvas와 이미지인 img 정보 칸인 number로 이루어져있다.
//posetime 은 스트레칭 타이밍을 알려주는 숫자로 웹캠 위에 곂쳐진다.
class article{
    $article = null;
    $canvas =null;
    $img = null;

    $label_container = null;
    $number = null;
    $posetime = null;

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
        var $posetime = document.createElement("div");

        $canvas.id = "canvas_div";
        $img.id = "img";

        $number.id="number";
        $posetime.id = "posetime";

        this.$canvas = $canvas;
        this.$img = $img;

        this.$number = $number;
        this.$posetime = $posetime;

        $canvas.innerHTML = `<canvas id="canvas"></canvas>`;
        $img.innerHTML = `<img src="images/pose_1.png"></img>`;
        

        $article.appendChild($canvas);
        $article.appendChild($img);
        $article.appendChild($number);
        $article.appendChild($posetime);
        $number = new number($number);

        

        
        
       

    }
}