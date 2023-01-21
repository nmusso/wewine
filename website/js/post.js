function generaPost(data) {
    let post = `
    <div class="row mt-3">
        <div class="col-sm-1"></div>
        <div class="col-12 col-sm-8 card">
            <div id="postID-` + data["idPost"] + `" class="card-body">
                <a href="profile.php?profile=`+ data["id"] + `">
                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-1">
                            <img src="`+ data["imgProfilo"] + `"
                                class="img-fluid rounded-circle img-thumbnail p-1 propic" />
                        </div>
                        <div class="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-11">
                            <div class="card-body p-0">
                                <p class="card-text">`+ data["username"] + `</p>
                            </div>
                        </div>
                    </div>
                </a>
                <p class="card-text my-3">`+ data["testo"] + `</p>
                <p class="card-text"><small class="text-muted">Posted `+ data["diffTime"] + `ago</small></p>
                <img class="card-img-bottom" src="`+ data["immagine"] + `" alt="Card image cap">
                <div class="row pt-3 pr-1 mb-1">
                    <div class="col-9 col-sm-9"></div>      
                    <div class="col-1 col-sm-1 font-weight-bold">
                        <a href="#!" onclick="getLikeList(` + data["idPost"] + `)">
                            <p id="numLikeID-` + data["idPost"] + `" class="text-end fw-bold">` + data["numLike"] + `</p> 
                        </a>
                    </div>     
                    <div class="col-1 col-sm-1">
                        <a href="#!" onclick="likeChange(`+ data["idPost"] + `)">
                            <i class="`+ data["liked"] + ` fa-heart" id="idLike-` + data["idPost"] + `"></i>
                        </a>
                    </div>
                    <div class="col-1 col-sm-1">
                        <a href="#!" onclick="commentManager(`+ data["idPost"] + `)">
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

axios.get("api-post.php").then(response => {
    if (response.data["islogged"]) {
        if (response.data["getPost"]){
            const post = response.data["postInfo"][0];
            post["liked"] = (post["liked"] == null) ? "fa-regular" : "fa-solid";
            main.insertAdjacentHTML("beforeend", generaPost(post));

            if (response.data["type"] != null && response.data["type"] == "comment") {
                commentManager(post["idPost"]);
            }
        }
    } else {
        window.location.replace("./login.php");
    }
})