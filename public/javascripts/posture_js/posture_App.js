console.log("app is running!");

class MAIN {
  $target = null;
  $mainUI = null;
  
  constructor($target) {
    this.$target = $target;
    this.mainUI = new MainUI(this.$target);
    
  }
}
