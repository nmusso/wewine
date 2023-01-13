function generaPost(data) {
    let post = `
    <div class="row mt-3">
        <div class="col-sm-1"></div>
        <div class="col-12 col-sm-8 card">
            <div class="card-body">
                <a href="profile.php?profile=`+data["id"]+`">
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
                </a>
                <p class="card-text my-3">`+data["testo"]+`</p>
                <p class="card-text"><small class="text-muted">Posted `+data["diffTime"]+`ago</small></p>
                <img class="card-img-bottom" src="`+data["immagine"]+`" alt="Card image cap">
            </div>
        </div>
        <div class="col-sm-3"></div>
    </div>
    `;

    return post;
}

function generaUtente(data, isMine) {
    let buttonContent = "";
    if (isMine) {
        buttonContent = `<button id="edit" type="button" class="btn btn-dark col-12 col-sm-12 col-md-3 col-lg-2 col-xl-1">Edit</button>`;
    } else if (data["isFollowing"][0]["isFollowing"] == 0) {
        buttonContent = `<button id="follow" type="button" class="btn btn-dark">Follow</button>`;
    } else {
        buttonContent = `<button id="unfollow" type="button" class="btn btn-dark">Unfollow</button>`;
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
                        <a href="" class="profileSwitch">
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
                        <a href="" class="profileSwitch">
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
                        <a href="" class="profileSwitch">
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

                <div class="row mt-3">
                    <div class="col-md-9 col-lg-10 col-xl-11"></div>
                    ` + buttonContent + `
                </div>
            </div>
        </div>
        <div class="col-sm-3"></div>
    </div>
    `;

    return profile;
}

const main = document.querySelector("main");

axios.get('api-profile.php').then(response => {
    if (response.data["islogged"]) {
        //Visualizza post
        const posts = response.data["posts"];
        main.innerHTML = generaUtente(response.data["info"], response.data["isMine"]);
        for(let i=0; i<posts.length; i++){
            main.insertAdjacentHTML("beforeend", generaPost(posts[i]));
        }
    } else {
        // login
        window.location.replace("./login.php");
    }
});