function generaPost(data) {
    let post = `
    <div class="mainElement row mt-3">
        <div class="col-sm-1"></div>
        <div class="col-12 col-sm-8 card">
            <div id="` + data["idPost"] + `" class="card-body">
                <div class="row">
                    <div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-1">
                        <img src="`+data["imgProfilo"]+`"
                            class="img-fluid rounded-circle img-thumbnail p-1 propic" />
                    </div>
                    <div class="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-11">
                        <div class="card-body p-0">
                            <p class="card-text">`+data["username"]+`</p>
                        </div>
                    </div>
                </div>
                <p class="card-text my-3">`+data["testo"]+`</p>
                <p class="card-text"><small class="text-muted">Posted `+data["diffTime"]+`ago</small></p>
                <img class="card-img-bottom" src="`+data["immagine"]+`" alt="Card image cap">
                <div class="row pt-3 pr-1 mb-1">
                    <div class="col-10 col-sm-10"></div>      
                    <div class="col-1 col-sm-1">
                        <a href="#!" onclick="likeChange(`+data["idPost"]+`)">
                            <i class="`+data["liked"]+` fa-heart" id="idLike-`+data["idPost"]+`"></i>
                        </a>
                    </div>
                    <div class="col-1 col-sm-1">
                        <a href="#!" onclick="commentManager(`+data["idPost"]+`)">
                            <i class="fa-regular fa-comment"></i>
                        </a>
                    </div>  
                </div>
            </div>
        </div>
        <div class="col-sm-3"></div>
    </div>
    `;

    return post;
}

function generaRiga(user) {
    let profile = `
    <div class="row mt-2 userCard mainElement">
        <div class="col-sm-1"></div>
        <div class="col-12 col-sm-8 card">
        <a href="profile.php?profile=` + user["id"] + `">
            <div class="row">
                <div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-2">
                    <img src="` + user["imgProfilo"] + `" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
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

function generaUtente(data, isMine) {
    let buttonContent = "";
    if (isMine) {
        buttonContent = buttonEdit;
    } else if (data["isFollowing"][0]["isFollowing"] == 0) {
        buttonContent = buttonFollow;
    } else {
        buttonContent = buttonUnfollow;
    }

    let profile = `
    <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-12 col-sm-8 card">
            <div class="card-body">
                <div class="row mt-2 mb-1">
                    <div class="col-2 col-sm-3 col-md-3 col-lg-2 col-xl-2">
                        <img src="` + data["userInfo"][0]["imgProfilo"] + `"
                            class="img-fluid rounded-circle img-thumbnail p-1 propic" />
                    </div>
                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <a href="#" onclick="getPosts()" class="profileSwitch">
                            <div class="info">
                                <div class="row">
                                    <div class="col-12 text-center fw-bold num">
                                    ` + data["userInfo"][0]["nPosts"] + `
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-center">
                                        Post
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <a href="#" onclick="getFollowers()" class="profileSwitch">
                            <div class="info">
                                <div class="row">
                                    <div class="col-12 text-center fw-bold">
                                    ` + data["follower"][0]["Follower"] + `
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-center p-0">
                                        Followers
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <a href="#" onclick="getFollowed()" class="profileSwitch">
                            <div class="info">
                                <div class="row">
                                    <div class="col-12 text-center fw-bold">
                                    ` + data["followed"][0]["Followed"] + `
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-center p-0">
                                        Followed
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <p class="mt-2 mb-0 fs-4 fw-bold">` + data["userInfo"][0]["username"] + `</p>
                        <p class="m-0 fw-lighter">` + data["userInfo"][0]["nome"] + " " + data["userInfo"][0]["cognome"] + `</p>
                        <div class="mt-3">
                        ` + data["userInfo"][0]["bio"] + `
                        </div>
                    </div>
                </div>

                <div id="buttonArea" class="row mt-3">
                    <div class="col-md-9 col-lg-10"></div>
                    ` + buttonContent + `
                </div>
            </div>
        </div>
        <div class="col-sm-3"></div>
    </div>
    `;

    return profile;
}

const buttonEdit = `<button id="btnedit" type="button" onclick="edit()" class="btn btn-dark col-12 col-sm-12 col-md-3 col-lg-2">Edit</button>`;
const buttonFollow = `<button id="btnfollow" type="button" onclick="follow()" class="btn btn-dark col-12 col-sm-12 col-md-3 col-lg-2">Follow</button>`;
const buttonUnfollow = `<button id="btnunfollow" type="button" onclick="unfollow()" class="btn btn-dark col-12 col-sm-12 col-md-3 col-lg-2">Unfollow</button>`;
const main = document.querySelector("main");

axios.get('api-profile.php').then(response => {
    if (response.data["islogged"]) {
        //Visualizza post
        const posts = response.data["posts"];
        main.innerHTML = generaUtente(response.data["info"], response.data["isMine"]);
        for(let i=0; i<posts.length; i++){
            posts[i]["liked"] = (posts[i]["liked"]==null) ? "fa-regular" : "fa-solid";
            main.insertAdjacentHTML("beforeend", generaPost(posts[i]));
        }
    } else {
        // login
        window.location.replace("./login.php");
    }
});

function edit() {
    window.location.replace("./profile-editor.php");
}

function follow() {
    const formData = new FormData();
    formData.append("type", "follow");
    axios.post('api-follow.php', formData).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./index.php");
        } else {
            if(response.data["updateSuccess"]){
                let buttonArea = document.getElementById("buttonArea");
                buttonArea.removeChild(document.getElementById("btnfollow"));
                buttonArea.insertAdjacentHTML("beforeend", buttonUnfollow);
            }
        }
    });
}

function unfollow() {
    const formData = new FormData();
    formData.append("type", "unfollow");
    axios.post('api-follow.php', formData).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./login.php");
        } else {
            if(response.data["updateSuccess"]==1){
                let buttonArea = document.getElementById("buttonArea");
                buttonArea.removeChild(document.getElementById("btnunfollow"));
                buttonArea.insertAdjacentHTML("beforeend", buttonFollow);
            }
        }
    });
}

function getPosts() {
    const mainElements = main.querySelectorAll(".mainElement");
    mainElements.forEach(elem => main.removeChild(elem));

    axios.get('api-profile.php').then(response => {
        if (response.data["islogged"]) {
            const posts = response.data["posts"];
            for(let i=0; i<posts.length; i++){
                main.insertAdjacentHTML("beforeend", generaPost(posts[i]));
            }
        } else {
            // login
            window.location.replace("./login.php");
        }
    });
}

function getFollowers() {
    const mainElements = main.querySelectorAll(".mainElement");
    mainElements.forEach(elem => main.removeChild(elem));

    const formData = new FormData();
    formData.append("type", "followers")

    axios.post("api-followList.php", formData).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./login.php");
        } else {
            const users = response.data["users"];
            for(let i=0; i<users.length; i++){
                main.insertAdjacentHTML("beforeend", generaRiga(users[i]));
            }
        }
    });
}

function getFollowed() {
    const mainElements = main.querySelectorAll(".mainElement");
    mainElements.forEach(elem => main.removeChild(elem));

    const formData = new FormData();
    formData.append("type", "followed")

    axios.post("api-followList.php", formData).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./login.php");
        } else {
            const users = response.data["users"];
            for(let i=0; i<users.length; i++){
                main.insertAdjacentHTML("beforeend", generaRiga(users[i]));
            }
        }
    });
}