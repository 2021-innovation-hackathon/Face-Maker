class tm_function{
    $tm_function = null;
    constructor($target){
        var $tm_function = document.createElement("script");
        $tm_function.type = "text/javascript";
        $tm_function.innerHTML = `
            // More API functions here:
            // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose
            // the link to your model provided by Teachable Machine export panel
            const URL = "/model/posture_model/"; // 모델 주소
            let model, webcam, ctx, labelContainer, maxPredictions;


            async function init() {
                const modelURL = URL + "model.json";
                const metadataURL = URL + "metadata.json";

                // load the model and metadata
                // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
                // Note: the pose library adds a tmPose object to your window (window.tmPose)
                model = await tmPose.load(modelURL, metadataURL);
                maxPredictions = model.getTotalClasses();

                // Convenience function to setup a webcam
                const size = 400;
                const flip = true; // whether to flip the webcam
                webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
                await webcam.setup(); // request access to the webcam
                await webcam.play();
                window.requestAnimationFrame(loop);

                // append/get elements to the DOM
                const canvas = document.getElementById("canvas");
                canvas.width = size; canvas.height = size;
                ctx = canvas.getContext("2d");
                labelContainer = document.getElementById("label-container");
                for (let i = 0; i < maxPredictions; i++) { // and class labels
                    labelContainer.appendChild(document.createElement("div"));
                }
            }

            async function loop(timestamp) {
                webcam.update(); // update the webcam frame
                await predict();
                window.requestAnimationFrame(loop);
            }

            var status = "good"
            var count = 0


            async function predict() {
                // Prediction #1: run input through posenet
                // estimatePose can take in an image, video or canvas html element
                const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
                // Prediction 2: run input through teachable machine classification model
                const prediction = await model.predict(posenetOutput);

                // 효과음 (제작)
                // prediction[0] => prediction[1] 좋은자세에서 나쁜자세로 갈 때 알림음을 들려줌
                if (prediction[0].probability.toFixed(2) == 1.00) {
                    status = "good"
                }
                
                else if (prediction[1].probability.toFixed(2) == 1.00) {
                    var audio = new Audio('/sound/beep.MP3');
                    audio.play();
                    status = "bad_left"
                }

                else if (prediction[2].probability.toFixed(2) == 1.00) {
                    var audio = new Audio('/sound/beep.MP3');
                    audio.play();
                    status = "bad_right"
                }

                else if (prediction[3].probability.toFixed(2) == 1.00) {
                    var audio = new Audio('/sound/beep.MP3');
                    audio.play();
                    status = "bad_back"
                }

                else if (prediction[4].probability.toFixed(2) == 1.00) {
                    var audio = new Audio('/sound/beep.MP3');
                    audio.play();
                    status = "bad_front"
                }

                else {
                    status = "none"
                }

                
                


                for (let i = 0; i < maxPredictions; i++) {
                    const classPrediction =
                        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                    labelContainer.childNodes[i].innerHTML = classPrediction;
                }

                // finally draw the poses
                drawPose(pose);
            }

            function drawPose(pose) {
                if (webcam.canvas) {
                    ctx.drawImage(webcam.canvas, 0, 0);
                    // draw the keypoints and skeleton
                    if (pose) {
                        const minPartConfidence = 0.5;
                        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
                    }
                }
            }
        `;
        this.$tm_function = $tm_function;
        $target.appendChild($tm_function);
    }
}