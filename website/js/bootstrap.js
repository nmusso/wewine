const nav = document.getElementById("nav");
const row = document.getElementById("myRow");
const title = document.getElementById("title");
const inRow = document.getElementById("fluidRow");
const container = document.getElementById("container");
const h1 = document.querySelector("h1");
const p = '<p class="text-center fs-3 my-0">iSocial</p>';
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

let iconDesc = window.matchMedia("(max-width: 1200px)");
function manageDesc() {
    if (window.innerWidth < 1200) {
        document.querySelectorAll(".desc").forEach(item => {
            item.style.display = "none";
        })

        document.querySelectorAll("li").forEach(item => {
            item.classList.remove("text-left");
            item.classList.add("text-center");
        })
    } else {
        document.querySelectorAll(".desc").forEach(item => {
            item.style.display = "inline-block";
        })

        document.querySelectorAll("li").forEach(item => {
            item.classList.remove("text-center");
            item.classList.add("text-left");
        })
    }
}

manageDesc();
iconDesc.addEventListener("change", manageDesc);