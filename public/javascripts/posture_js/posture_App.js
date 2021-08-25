console.log("바른자세 시작");

class MAIN {
  $target = null;
  $mainUI = null;
  
  constructor($target) {
    this.$target = $target;
    this.mainUI = new MainUI(this.$target);
    
  }
}
