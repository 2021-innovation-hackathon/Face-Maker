class tm_init{
    $tm_init = null;
    $time = null;
    constructor($target){
        const $tm_init = document.createElement("div");
      $tm_init.className = "tm_init";
      $tm_init.innerHTML = `
      <h1>this is main</h1>
        <div id="today"></div>
        <div id="sec"></div>
        <div id="count"></div>
        
        <div>Teachable Machine Pose Model</div>
    <button type="button" onclick="init()">Start</button>
    <section class="picture">
        <div><canvas id="canvas"></canvas></div>
    </section>
    <section class="labels">
    <div id="label-container"></div>
    <div id="progress"></div>
    </section>
    
    
      `;
      this.$tm_init = $tm_init;
      $target.appendChild(this.$tm_init);

      
    }
}