function generaCommento(data, id) {
    let commento = `
    <div class="row mt-1 mx-0 commentOf-` + id + `">
        <div class="col-12 col-sm-12 p-0">
            <div class="card px-2">
                <div class="row">
                    <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 p-2">
                        <a href="profile.php?profile=` + data["id"] + `" title="Profile link">
                            <img src="` + data["imgProfilo"] + `" class="img-fluid rounded-circle img-thumbnail p-1 propic" alt="` + data["username"] + `'s profile picture"/>
                        </a>
                    </div>
                    <div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
                        <a href="profile.php?profile=` + data["id"] + `">
                            <div class="row">
                                <div class="card-body col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                    <p class="card-text">` + data["username"] + `</p>
                                </div>
                            </div>
                        </a>
                        <div class="row mb-2">
                            <div class="col-12 col-sm-12">
                                <p>`
                                + data["testo"] +
                                `</p>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

    return commento;
}

function generaBarra(id) {
    const barra = `
    <div id="commentBar-` + id + `" class="row mt-3 m-0">
        <div class="col-12 col-sm-12 p-0">
            <div class="card border-0 p-0">
                <div class="row m-0">
                    <label class="form-label" for="commentText-` + id + `" hidden>Comment section</label>
                    <div class="col-11 col-sm-11 p-0">
                        <div class="d-flex form-inputs">
                            <input id="commentText-` + id + `" class="form-control" type="text" title="Comment bar" placeholder="Comment here...">
                        </div>
                    </div>
                    <div class="col-1 col-sm-1 p-0 d-flex justify-content-end">
                        <button id="submit" onclick="insertComment(` + id + `)" type="button" class="btn wine text-white">
                            <i class="fa-regular fa-paper-plane wine"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return barra;
}

function generaRiga(user) {
    let profile = `
    <div class="row mt-2 userCard mainElement">
        <div class="col-sm-1"></div>
        <div class="col-12 col-sm-8 card">
        <a href="profile.php?profile=` + user["id"] + `">
            <div class="row">
                <div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-2">
                    <img src="` + user["imgProfilo"] + `" class="img-fluid rounded-circle img-thumbnail p-1 propic" alt=""/>
                </div>
                <div class="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-10">
                    <div class="card-body">
                        <p class="card-text">` + user["username"] + `</p>
                    </div>
                </div>
            </div>
        </a>
        </div>
        <div class="col-sm-3"></div>
    </div>
    `;

    return profile;
}

function likeChange(id){
    let likeIcon = document.getElementById("idLike-"+id);
    const formData = new FormData();
    formData.append('type', "like");
    formData.append('id', id);
    axios.post('./api/api-interaction.php', formData).then(response => {
        if (response.data["islogged"]) {
            if(response.data["changeOk"]){
                const numLike = document.getElementById("numLikeID-" + id);
                if(likeIcon.classList.contains("fa-regular")){
                    likeIcon.classList.replace("fa-regular","fa-solid");
                    numLike.innerText = parseInt(numLike.innerText) + 1; 
                } else {
                    likeIcon.classList.replace("fa-solid","fa-regular");
                    numLike.innerText = parseInt(numLike.innerText) - 1; 
                }   
            }   
        } else {
            // login
            window.location.replace("./login.php");
        }
    }); 
}

function commentManager(id){
    const post = document.getElementById("postID-" + id);

    if (post.contains(document.querySelector("#commentBar-" + id))) {
        const oldComm = post.querySelectorAll(".commentOf-" + id);
        oldComm.forEach(comm => post.removeChild(comm));
        post.removeChild(document.querySelector("#commentBar-" + id));
    } else {
        const formData = new FormData();
        formData.append('type', "comment");
        formData.append('id', id);
    
        axios.post('./api/api-interaction.php', formData).then(response => {
            if (response.data["islogged"]) {
                const comments = response.data["comments"];
                post.insertAdjacentHTML("beforeend", generaBarra(id));
    
                comments.forEach(comment => {
                    post.insertAdjacentHTML("beforeend", generaCommento(comment, id));
                });
            } else {
                // login
                window.location.replace("./login.php");
            }
        }); 
    }   
}

function insertComment(id) {
    const text = document.getElementById("commentText-" + id).value;
    if (text != "") {
        const formData = new FormData();
        formData.append('type', "comment");
        formData.append('text', text);
        formData.append('id', id);

        axios.post('./api/api-interaction.php', formData).then(response => {
            if (response.data["islogged"]) {
                commentManager(id);
                commentManager(id);
            } else {
                // login
                window.location.replace("./login.php");
            }
        });
    } 
}

let likeListOpen = false;
function getLikeList(id) {
    const main = document.querySelector("main");

    if (likeListOpen) {
        const users = document.querySelectorAll(".userCard");
        users.forEach(user => main.removeChild(user));
        likeListOpen = false;
    } else {
        const formData = new FormData();
        formData.append("type", "likelist");
        formData.append("id", id);
        axios.post("./api/api-interaction.php", formData).then(response => {
            if (!response.data["islogged"]) {
                window.location.replace("./login.php");
            }

            const users = response.data["users"];
            
            users.forEach(user => {
                main.insertAdjacentHTML("beforeend", generaRiga(user));
                likeListOpen = true;
            })
        })
    }
    
}