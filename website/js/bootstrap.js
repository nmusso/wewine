const header = document.querySelector("header");
const nav = document.getElementById("nav");
const row = document.getElementById("myRow");
const title = document.getElementById("title");
const inRow = document.getElementById("fluidRow");
const container = document.getElementById("container");
const h1 = document.querySelector("h1");
const p = '<p class="text-center fs-4 my-0">WeWine</p>';
const ul = document.querySelector("ul");
const home = document.getElementById("li-home");
const search = document.getElementById("li-search");
const add = document.getElementById("li-add");
const notify = document.getElementById("li-notify");
const profile = document.getElementById("li-profile");
const a_profile = document.getElementById("a-profile");

let dim = window.matchMedia("(max-width: 576px)")

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


function genToast(){
    var myToast = new bootstrap.Toast(toast);
    myToast.show();
}

var timer;
const toast = document.getElementById("myToast");

manageNewNotifications();
startTimer();
function startTimer() {
    timer = setInterval(manageNewNotifications, 3000);
}

function manageNewNotifications() {
    const formData = new FormData();
    formData.append('filter', "new");
    axios.post('./api/api-notifications.php', formData).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./login.php");
        } else {
            const notifications = response.data["allnotifications"];
    
            notifications.forEach(n => {             
                let sqlDateStr = n["dataOra"]; 
                sqlDateStr = sqlDateStr.replace(/:| /g,"-");
                let YMDhms = sqlDateStr.split("-");
                let sqlDate = new Date();
                sqlDate.setFullYear(parseInt(YMDhms[0]), parseInt(YMDhms[1])-1, parseInt(YMDhms[2]));
                sqlDate.setHours(parseInt(YMDhms[3]), parseInt(YMDhms[4]), parseInt(YMDhms[5]), 0);

                if(n["type"]=="newFollow" || n["type"]=="newComment" || n["type"]=="newLike") {                   
                    if (new Date() - sqlDate < 3000 ) {
                        const type = (n["type"] == "newLike") ? "like" : "comment";
                        const ref = (n["type"] == "newFollow") ? "profile.php?profile=" + n["id"] : "post.php?post=" + n["idPost"] + "&type=" + type; 

                        document.querySelector("#toast-text").innerHTML = "@" + n["username"] + " " + n["text"].toLowerCase();
                        document.querySelector("#toast-diffTime").innerHTML = n["diffTime"] + "ago";
                        document.querySelector("#toast-link").href = ref;
                        document.querySelector("#toast-link-text").href = ref;
                        
                        genToast();
                    }

                    const bell = document.getElementById("bell");
                    if (!bell.classList.contains("bellOn")) {
                        bell.classList.add("bellOn");
                    }   
                }       
            });   
        }
    });

}