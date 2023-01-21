const header = document.querySelector("header");
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
const a_profile = document.getElementById("a-profile");

let dim = window.matchMedia("(max-width: 576px)")

// TODO mettere e rimuove mt e mb dalla prima e ultima card
function mediaTrigger() {
    if (window.innerWidth < 576) {
        nav.classList.add("fixed-bottom");
        nav.classList.remove("navCol");
        nav.classList.remove("fixed-top");
        header.classList.add("fixed-top");
        container.insertBefore(title, container.firstChild);

        if (inRow.firstChild == title){
            inRow.removeChild(title);
        }
        
        document.querySelector("header").innerHTML = "";
        document.querySelector("header").append(h1);
        document.getElementById("mainSection").classList.add("my-5");

        ul.innerHTML = "";     
        ul.appendChild(search);
        ul.appendChild(add);
        ul.appendChild(home);
        ul.appendChild(notify);
        ul.appendChild(profile);
    } else {
        nav.classList.remove("fixed-bottom");
        nav.classList.add("navCol");
        nav.classList.add("fixed-top");
        header.classList.remove("fixed-top");
        inRow.insertBefore(title, inRow.firstChild);

        if (container.firstChild == title) {
            container.removeChild(title);
        }

        document.querySelector("header").removeChild(h1);
        document.querySelector("header").innerHTML = p;
        document.getElementById("mainSection").classList.remove("my-5");
        
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

// Gestione delle scritte a fianco alle icone
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

a_profile.addEventListener("click", ()=>{
    window.location.replace("./profile.php?profile=0");
})


function genToast(){
    var myToast = new bootstrap.Toast(toast);
    myToast.show();
}

var timer;
const toast = document.getElementById("myToast");

startTimer();
function startTimer() {
    timer = setInterval(function() {
        const formData = new FormData();
        formData.append('filter', "new");
        axios.post('api-notifications.php', formData).then(response => {
            if (!response.data["islogged"]) {
                window.location.replace("./login.php");
            } else {
                console.log(response.data["allnotifications"]);

                const notifications = response.data["allnotifications"];
        
                notifications.forEach(n => {

                    var sqlDateStr = n["dataOra"]; // MySQL DATETIME
                    sqlDateStr = sqlDateStr.replace(/:| /g,"-");
                    var YMDhms = sqlDateStr.split("-");
                    var sqlDate = new Date();
                    sqlDate.setFullYear(parseInt(YMDhms[0]), parseInt(YMDhms[1])-1,
                                                            parseInt(YMDhms[2]));
                    sqlDate.setHours(parseInt(YMDhms[3]), parseInt(YMDhms[4]), 
                                                        parseInt(YMDhms[5]), 0);

                    if((n["type"]=="newFollow" || n["type"]=="newComment" || n["type"]=="newLike") 
                        && new Date() - sqlDate < 20000 ){ // TEST ==> TODO mettere il 20000 uguale all' interval

                        const type = (n["type"] == "newLike") ? "like" : "comment";
                        const ref = (n["type"] == "newFollow") ? "profile.php?profile=" + n["id"] : "post.php?post=" + n["idPost"] + "&type=" + type; 

                        document.querySelector("#toast-text").innerHTML = "@" + n["username"] + " " + n["text"].toLowerCase();
                        document.querySelector("#toast-diffTime").innerHTML = n["diffTime"] + "ago";
                        document.querySelector("#toast-link").href = ref;
                        document.querySelector("#toast-link-text").href = ref;
                        
                        genToast();
                    }       
                });    
            }
        });

    }, 5000);
}