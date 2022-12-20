let nav = document.getElementById("nav");
let row = document.getElementById("myRow");

let dim = window.matchMedia("(max-width: 576px)")
function mediaTrigger() {
    if (window.innerWidth < 576) {
        nav.classList.add("fixed-bottom");
    } else {
        nav.classList.remove("fixed-bottom");
    }
}

mediaTrigger();
dim.addEventListener("change", mediaTrigger);