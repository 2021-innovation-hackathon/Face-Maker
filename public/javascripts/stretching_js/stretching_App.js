console.log("스트레칭 시작");

class MAIN {
  $target = null;
  $mainUI = null;
  
  constructor($target) {
    this.$target = $target;
    this.mainUI = new MainUI(this.$target);
    
  }
}
//MAIN으로 $target == 최상단 main div