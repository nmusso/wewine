let nav = document.getElementById("nav");
let row = document.getElementById("myRow");
let title = document.getElementById("title");
let inRow = document.getElementById("fluidRow");
let container = document.getElementById("container");
const h1 = document.querySelector("h1");
const p = '<p class="text-center fs-3">iSocial</p>';
const ul = document.querySelector("ul");
const home = document.getElementById("li-home");
const search = document.getElementById("li-search");
const add = document.getElementById("li-add");
const notify = document.getElementById("li-notify");
const profile = document.getElementById("li-profile");

let dim = window.matchMedia("(max-width: 576px)")
function mediaTrigger() {
    if (window.innerWidth < 576) {
        nav.classList.add("fixed-bottom");
        container.insertBefore(title, container.firstChild);

        if (inRow.firstChild == title){
            inRow.removeChild(title);
        }
        
        document.querySelector("header").innerHTML = "";
        document.querySelector("header").append(h1);

        ul.innerHTML = "";     
        ul.appendChild(search);
        ul.appendChild(add);
        ul.appendChild(home);
        ul.appendChild(notify);
        ul.appendChild(profile);
    } else {
        nav.classList.remove("fixed-bottom");
        inRow.insertBefore(title, inRow.firstChild);

        if (container.firstChild == title) {
            container.removeChild(title);
        }

        document.querySelector("header").removeChild(h1);
        document.querySelector("header").innerHTML = p;
        
        ul.innerHTML = "";
        ul.appendChild(home);
        ul.appendChild(search);
        ul.appendChild(notify);
        ul.appendChild(add);
        ul.appendChild(profile);
    }
}

mediaTrigger();
dim.addEventListener("change", mediaTrigger);

