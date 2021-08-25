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
    var hours = ('0' + (now.getHours() -online.getHours())).slice(-2); 
    var minutes = ('0' + (now.getMinutes() -online.getMinutes())).slice(-2);
    var seconds = ('0' + (now.getSeconds() -online.getSeconds())).slice(-2); 
    
    
    var now_hours = ('0' + (now.getHours() - today.getHours())).slice(-2); 
    var now_minutes = ('0' + (now.getMinutes() - today.getMinutes())).slice(-2); 
    var now_seconds = ('0' + (now.getSeconds() - today.getSeconds())).slice(-2); 
    document.getElementById("today").innerHTML="접속시간 "+ hours + "시" + minutes + "분" + seconds + "초";
    document.getElementById("sec").innerHTML="스트레칭 안한지 벌써 "+ now_hours + "시" + now_minutes + "분" + now_seconds + "초";
    
    if (now_seconds > 20){
        
        if (false){
            if (sound_check == false){
                //audio.play();
                sound_check = true;
                //window.open("/alert", "_blank", "width=200, height=200, top=300, left=500")
            }
            
            webcam.play();
            canvas.style.display="block";
            document.querySelector("#message").style.display="block";
        }
        //audio.play();
        
    }
        
    
}