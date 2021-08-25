//posetime 은 스트레칭 타이밍을 알려주는 숫자로 웹캠 위에 곂쳐진다.
class text{
    $posetime = null;
    $stretching_text = null;
    constructor($target){
        var $posetime = document.createElement("div");
        var $stretching_text = document.createElement("div");

        $posetime.id = "posetime";
        $stretching_text.id = "stretching_text";

        this.$posetime = $posetime;
        this.$stretching_text = $stretching_text;

        $target.appendChild($posetime);
        $target.appendChild($stretching_text);
    }
}