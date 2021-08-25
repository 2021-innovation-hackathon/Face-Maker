//시간 측정을 위한 클래스이다.
class timer{
    $timer = null;
    $time = null;
    constructor($target){
        
      const $time = document.createElement("script");
      $time.className = "timer";
      $time.innerHTML = `
      
      
      
      timerId = null;
         
      timerId = setInterval(check, 1000);
            
      `;

      this.$time = $time;
      $target.appendChild($time);
      

      
    }
    
    
}

function check() {
                
                
    now = new Date();
    
    var seconds = Math.round((now - online)/1000);
    var print_seconds = seconds%60;
    var minutes = Math.floor(seconds/60);
    var print_minutes = minutes%60;
    var hours = Math.floor(minutes/60); 
    
    
    document.getElementById("usetime").innerHTML= hours + ":" + print_minutes + ":" + print_seconds;
    
    
   
        
    
    
}