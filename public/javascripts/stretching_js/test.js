let $div = document.getElementsByClassName("testest")[0];

let btn = document.getElementsByClassName("btn")[0];
btn.addEventListener("click", buttontest, false);

function buttontest() {
    let data;
    fetch("/statistics/page")
    .then((res) => res.json())
    .then((res) => {
        data = res;
    })
    .then((res) => {
        $div.innerText = data.stretching_id;
    });
    console.log("hello3~~~~~");
}