function generaPost(data) {
    let post = `
    <div class="row mt-3">
        <div class="col-sm-1"></div>
        <div class="col-12 col-sm-8 card">
            <div class="card-body">
                <a>
                    <div class="row">
                        <div class="col-2 col-sm-3 col-md-2 col-lg-2 col-xl-2">
                            <img src="./upload/empty.png" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
                        </div>
                        <div class="col-10 col-sm-9 col-md-10 col-lg-10 col-xl-10">
                            <div class="card-body px-0">
                                <p class="card-text">Ciao</p>
                            </div>
                        </div>
                    </div>
                </a>
                <p class="card-text">This is a wider card with supporting text below as a natural
                    lead-in to
                    additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            <img class="card-img-bottom" src="./upload/dog.jpg" alt="Card image cap">
        </div>
        <div class="col-sm-3"></div>
    </div>
    `;

    return post;
}

const main = document.querySelector("main");
main.innerHTML = generaPost("ciao");
main.innerHTML += generaPost("ciao");
main.innerHTML += generaPost("ciao");
axios.get('api-home.php').then(response => {
    console.log(response);
    if (response.data["islogged"]) {
        // Visualizza post
        //main.innerHTML = "<h1>Feed</h1>";
    } else {
        // login
        window.location.replace("./login.php");
    }
});