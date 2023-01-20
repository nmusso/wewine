function generaPost(data) {
    let post = `
    <div class="row mt-3">
        <div class="col-sm-1"></div>
        <div class="col-12 col-sm-8 card">
            <div id="postID-` + data["idPost"] + `" class="card-body">
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

const main = document.querySelector("main");

axios.get('api-home.php').then(response => {
    console.log(response.data["posts"]);
    if (response.data["islogged"]) {
        // Visualizza post
        const posts = response.data["posts"];
        for(let i=0; i<posts.length; i++){
            posts[i]["liked"] = (posts[i]["liked"]==null) ? "fa-regular" : "fa-solid";
            main.insertAdjacentHTML("beforeend", generaPost(posts[i]));
        }
        
    } else {
        // login
        window.location.replace("./login.php");
    }
});