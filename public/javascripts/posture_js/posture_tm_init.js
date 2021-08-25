class tm_init{
    $tm_init = null;
    $time = null;
    constructor($target){
        const $tm_init = document.createElement("div");
      $tm_init.className = "tm_init";
      $tm_init.innerHTML = `  
      <div>바른 자세</div>
      <button type="button" onclick="init()">Start</button>
      
      <section class="picture">
      <div><canvas id="canvas"></canvas></div>
      </section>
      
      <section class="labels">
      <div id="label-container"></div>
      <div id="progress"></div>
      <label class="switch">
      <input type="checkbox" onclick="onoffsound();">
      <span class="slider round"></span>
      </label>
      <p>OFF</p><p style="display:none;">ON</p>
      </section>
    
      
    
      <section class="timeinfo">
      <div id="usetime">00:00</div>
      <div id="goodposetime"></div>
      <div id="badposetime"></div>
      <div id="badpose_left_time"></div>
      <div id="badpose_rigth_time"></div>
      <div id="badpose_back_time"></div>
      <div id="badpose_front_time"></div>
      </section>
      
      
      
      `;
      this.$tm_init = $tm_init;
      $target.appendChild(this.$tm_init);

      
    }
}