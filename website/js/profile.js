function generaRiga(user) {
    let profile = `
    <section class="mainElement">
        <h2 hidden>Profile</h2>
        <div class="row mt-2 userCard">
            <div class="col-sm-1"></div>
            <div class="col-12 col-sm-8 card">
                <a href="profile.php?profile=` + user["id"] + `">
                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-2">
                            <img src="` + user["imgProfilo"] + `" alt="" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
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
    </section>
    `;

    return profile;
}

function generaUtente(data, isMine) {
    let buttonRow = "";

    if (isMine) {
        buttonRow = `
        <div id="buttonArea" class="row mt-3">
            <div class="col-md-5 col-lg-7"></div>
            ` + buttonEdit 
            + ` <div class="col-md-1 col-lg-1"></div>`
            + buttonLogout + `
        </div>`
    } else if (data["isFollowing"][0]["isFollowing"] == 0) {
        buttonRow = `
        <div id="buttonArea" class="row mt-3">
            <div class="col-md-9 col-lg-10"></div>
            ` + buttonFollow + `
        </div>`
    } else {
        buttonRow = `
        <div id="buttonArea" class="row mt-3">
            <div class="col-md-9 col-lg-10"></div>
            ` + buttonUnfollow + `
        </div>`
    }

    let address = ``
    if (data["userInfo"][0]["indirizzo"] != "") {
        address = `<p class="m-0 fw-lighter">Address: ` + data["userInfo"][0]["indirizzo"] + `</p>`
    }

    let type = data["userInfo"][0]["tipo"];
    type = type.charAt(0).toUpperCase() + type.slice(1);

    let profile = `
    <header>
        <div class="row">
            <div class="col-sm-1"></div>
            <div class="col-12 col-sm-8 card">
                <div class="card-body">
                    <div class="row mt-2 mb-1">
                        <div class="col-2 col-sm-3 col-md-3 col-lg-2 col-xl-2">
                            <img src="` + data["userInfo"][0]["imgProfilo"] + `"
                                class="img-fluid rounded-circle img-thumbnail p-1 propic" alt=""/>
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
                            <p class="m-0 fw-lighter">Type: ` + type + `</p>
                            ` + address + `
                            <div class="mt-3">
                                <article>
								<h2 hidden>Bio</h2>
                                ` + data["userInfo"][0]["bio"] + `
                                </article>
                            </div>
                        </div>
                    </div>
                    ` + buttonRow + `
                </div>
            </div>
            <div class="col-sm-3"></div>
        </div>
    </header>
    `;

    return profile;
}

const buttonEdit = `<button id="btnedit" type="button" onclick="edit()" class="mt-2 btn wine text-white col-12 col-sm-12 col-md-3 col-lg-2">Edit</button>`;
const buttonLogout = `<button id="btnlogout" type="button" onclick="logout()" class="mt-2 btn wine text-white col-12 col-sm-12 col-md-3 col-lg-2">Logout</button>`;
const buttonFollow = `<button id="btnfollow" type="button" onclick="follow()" class="btn wine text-white col-12 col-sm-12 col-md-3 col-lg-2">Follow</button>`;
const buttonUnfollow = `<button id="btnunfollow" type="button" onclick="unfollow()" class="btn wine text-white col-12 col-sm-12 col-md-3 col-lg-2">Unfollow</button>`;
const main = document.querySelector("main");

axios.get('./api/api-profile.php').then(response => {
    if (response.data["islogged"]) {
        const posts = response.data["posts"];
        main.innerHTML = generaUtente(response.data["info"], response.data["isMine"]);
        for (let i = 0; i < posts.length; i++) {
            posts[i]["liked"] = (posts[i]["liked"] == null) ? "fa-regular" : "fa-solid";
            main.insertAdjacentHTML("beforeend", generaPost(posts[i]));
        }
    } else {
        window.location.replace("./login.php");
    }
});

function edit() {
    window.location.replace("./profile-editor.php");
}

function follow() {
    const formData = new FormData();
    formData.append("type", "follow");
    axios.post('./api/api-follow.php', formData).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./index.php");
        } else {
            if (response.data["updateSuccess"]) {
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
    axios.post('./api/api-follow.php', formData).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./login.php");
        } else {
            if (response.data["updateSuccess"] == 1) {
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

    axios.get('./api/api-profile.php').then(response => {
        if (response.data["islogged"]) {
            const posts = response.data["posts"];
            for (let i = 0; i < posts.length; i++) {
                posts[i]["liked"] = (posts[i]["liked"] == null) ? "fa-regular" : "fa-solid";
                main.insertAdjacentHTML("beforeend", generaPost(posts[i]));
            }
        } else {
            window.location.replace("./login.php");
        }
    });
}

function getFollowers() {
    const mainElements = main.querySelectorAll(".mainElement");
    mainElements.forEach(elem => main.removeChild(elem));

    const formData = new FormData();
    formData.append("type", "followers")

    axios.post("./api/api-followList.php", formData).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./login.php");
        } else {
            const users = response.data["users"];
            for (let i = 0; i < users.length; i++) {
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

    axios.post("./api/api-followList.php", formData).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./login.php");
        } else {
            const users = response.data["users"];
            for (let i = 0; i < users.length; i++) {
                main.insertAdjacentHTML("beforeend", generaRiga(users[i]));
            }
        }
    });
}

function logout() {
    axios.get("./api/api-logout.php").then(response => {
        window.location.replace("./login.php");
    });
}