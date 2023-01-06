function generaPost(data) {
    let post = `
    <div class="row mt-3">
        <div class="col-sm-1"></div>
        <div class="col-12 col-sm-8 card">
            <div class="card-body">
                <a>
                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-1">
                            <img src="./upload/rit.jpg"
                                class="img-fluid rounded-circle img-thumbnail p-1 propic" />
                        </div>
                        <div class="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-11">
                            <div class="card-body p-0">
                                <p class="card-text">Ciao</p>
                            </div>
                        </div>
                    </div>
                </a>
                <p class="card-text my-3">This is a wider card with supporting text below as a natural
                    lead-in to
                    additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                <img class="card-img-bottom" src="./upload/9_1.png" alt="Card image cap">
            </div>
        </div>
        <div class="col-sm-3"></div>
    </div>
    `;

    return post;
}

function generaUtente(isMyProfile) {
    let profile = `
    <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-12 col-sm-8 card">
            <div class="card-body">
                <div class="row mt-2 mb-1">
                    <div class="col-2 col-sm-3 col-md-3 col-lg-2 col-xl-2">
                        <img src="./upload/rit.jpg"
                            class="img-fluid rounded-circle img-thumbnail p-1 propic" />
                    </div>
                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <a href="" class="profileSwitch">
                            <div class="info">
                                <div class="row">
                                    <div class="col-12 text-center fw-bold num">
                                        21
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
                                        103
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
                                        51
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
                        <p class="mt-2 mb-0 fs-4 fw-bold">username</p>
                        <p class="m-0 fw-lighter">Nome Cognome</p>
                        <div class="mt-3">
                            Questa è la mia bio ciao mi piacciono i cani e il padel.
                            Ho pochi follower ma faccio tanti post.
                            Ciao voi come state io sto bene.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-3"></div>
    </div>
    `;

    return profile;
}

const main = document.querySelector("main");
main.innerHTML = generaUtente(true);
main.insertAdjacentHTML("beforeend", generaPost("ciao"));
main.insertAdjacentHTML("beforeend", generaPost("ciao"));
main.insertAdjacentHTML("beforeend", generaPost("ciao"));

axios.get('api-profile.php').then(response => {
    console.log(response);
    if (response.data["islogged"]) {
        // Visualizza post
        //main.innerHTML = "<h1>Feed</h1>";
    } else {
        // login
        window.location.replace("./login.php");
    }
});