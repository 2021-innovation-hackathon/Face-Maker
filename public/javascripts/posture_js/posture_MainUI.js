class MainUI {
  $mainDiv = null;
  $tm_init = null;
  $tm_function = null;

  constructor($target) {
    this.$tm_function = new tm_function($target);
    this.$tm_init = new tm_init($target);
    this.$time = new timer($target);
    

  }
  
  

  
    
}