//ok
if (window.Worker) {
  var worker = new Worker("posture_tm_function.js");
  worker.onmessage = (event) => {
    console.log(event.data);
    worker.terminate();
  };
}
