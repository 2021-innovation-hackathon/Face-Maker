let bar = document.getElementsByClassName("Fill")[0];
let delayOffset = 0;
let offset = 0;
let acc = 0.1;
let roofState = true;

setTimeout(() => {
    bar.style.width = "500px";
}, 2000);
/*
loop = () => {
    let bar = document.getElementsByClassName("Fill")[0];

    bar.style.width = `${delayOffset}px`;
    delayOffset = delayOffset + (offset - delayOffset) * acc;
    console.log(loop);

    if (delayOffset < 1) {
        cancelAnimationFrame(loop);
        roofState = false;
    }

    requestAnimationFrame(loop);

}

loop();*/