class MainUI {
    $teachable_init = null;
    $article = null;
    $footer = null;
    constructor($target) {
        //모션인식 설정 클래스 생성
        this.$teachable_init = new teachable_init($target);
        //article = 몸통부분으로서 웹캠, 포즈 이미지, 각종 정보를 포함함
        this.$article = new article($target);
        this.$footer = new footer($target);
        
        
        
        
    }
}

//각 시멘틱 태그를 생성하여 UI에 속성으로 추가함