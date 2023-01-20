function generaCommento(data, id) {
    let commento = `
    <div class="row mt-1 mx-0 commentOf-` + id + `">
        <div class="col-12 col-sm-12 p-0">
            <div class="card px-2">
                <div class="row">
                    <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 p-2">
                        <a href="profile.php?profile=` + data["id"] + `">
                            <img src="` + data["imgProfilo"] + `" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
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
                            <div class="col-12 col-sm-12">`
                            + data["testo"] +
                            `</div>
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
                    <div class="col-11 col-sm-11 p-0">
                        <div class="d-flex form-inputs">
                            <input id="commentText-` + id + `" class="form-control" type="text" placeholder="Comment here...">
                            <i class="bx bx-search"></i>
                        </div>
                    </div>
                    <div class="col-1 col-sm-1 p-0 d-flex justify-content-end">
                        <button id="submit" onclick="insertComment(` + id + `)" type="button" class="btn btn-dark">
                            <i class="fa-regular fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return barra;
}

function likeChange(id){
    let likeIcon = document.getElementById("idLike-"+id);
    const formData = new FormData();
    formData.append('type', "like");
    formData.append('id', id);
    axios.post('api-interaction.php', formData).then(response => {
        if (response.data["islogged"]) {
            if(response.data["changeOk"]){
                if(likeIcon.classList.contains("fa-regular")){
                    likeIcon.classList.replace("fa-regular","fa-solid")
                } else {
                    likeIcon.classList.replace("fa-solid","fa-regular")
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
    
        axios.post('api-interaction.php', formData).then(response => {
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

        axios.post('api-interaction.php', formData).then(response => {
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