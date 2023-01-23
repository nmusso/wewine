function generaPost(data) {
    let post = `
    <article>
        <div class="row mt-3">
            <div class="col-sm-1"></div>
            <div class="col-12 col-sm-8 card">
                <div id="postID-` + data["idPost"] + `" class="card-body">
                    <header>
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
                    </header>
                    <section>
                        <a href="post.php?post=` + data["idPost"] + `&type=like">
                            <p class="card-text my-3">`+ data["testo"] + `</p>
                            <p class="card-text"><small class="text-muted">Posted `+ data["diffTime"] + `ago</small></p>
                            <img class="card-img-bottom" src="`+ data["immagine"] + `" alt="">           
                        </a>
                    </section>
                    <footer>
                        <div class="row pt-3 pr-1 mb-1">
                            <div class="col-9 col-sm-9"></div>      
                            <div class="col-1 col-sm-1 font-weight-bold">
                                <p id="numLikeID-` + data["idPost"] + `" class="text-end fw-bold text-wine">`+ data["numLike"] + `</p> 
                            </div> 
                            <div class="col-1 col-sm-1">
                                <a href="#!" onclick="likeChange(`+ data["idPost"] + `)">
                                    <i class="`+ data["liked"] + ` fa-heart text-wine" id="idLike-` + data["idPost"] + `"></i>
                                </a>
                            </div>
                            <div class="col-1 col-sm-1">
                                <a href="#!" onclick="commentManager(`+ data["idPost"] + `)">
                                    <i class="fa-regular fa-comment text-wine"></i>
                                </a>
                            </div>  
                        </div>
                    </footer>
                </div>
            </div>
            <div class="col-sm-3"></div>
        </div>
    </article>
    `;

    return post;
}