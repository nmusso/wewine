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

const main = document.querySelector("main");
//main.insertAdjacentHTML("beforeend", generaPost("ciao"));
//main.insertAdjacentHTML("beforeend", generaPost("ciao"));
//main.insertAdjacentHTML("beforeend", generaPost("ciao"));

axios.get('api-home.php').then(response => {
    console.log(response);
    if (response.data["islogged"]) {
        // Visualizza post
        //main.innerHTML = "<h1>Feed</h1>";
        const posts = response.data["posts"];
        for(let i=0; i<posts.length; i++){
            main.insertAdjacentHTML("beforeend", generaPost(posts[i]));
        }
        
    } else {
        // login
        window.location.replace("./login.php");
    }
});