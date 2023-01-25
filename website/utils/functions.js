function generaPost(data) {
    let stars=``;
    for (let i = 0; i < 5; i++) {
        if (i < parseInt(data["valutazione"])) {
            stars +=`<span class="fa-solid fa-star"></span>`;
        } else {
            stars +=`<span class="fa-regular fa-star"></span>`;
        }
    }

    let searchBarcode = ``;
    if(data["barcode"]!=""){
        searchBarcode = `<a href="https://www.google.com/search?q=`+data["barcode"]+`" target="_blank" class="btn wine text-white mt-2">Search barcode</a>`;
    }
    
    let post = `
    <article class="mainElement">
        <div class="row mt-3">
            <div class="col-sm-1"></div>
            <div class="col-12 col-sm-8 card">
                <div id="postID-` + data["idPost"] + `" class="card-body">
                    <header>
                        <a href="profile.php?profile=`+ data["id"] + `" title="Profile link">
                            <div class="row">
                                <div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-1">
                                    <img src="`+ data["imgProfilo"] + `"
                                        class="img-fluid rounded-circle img-thumbnail p-1 propic" alt="`+ data["username"] + `'s profile picture"/>
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
                        <a href="post.php?post=` + data["idPost"] + `&type=like" title="Open post">
                            <p class="card-text my-3 fw-light wineData">Wine name: `+ data["nome"] + `</p>
                            <p class="card-text my-3 fw-light wineData">Origin: `+ data["origine"] + `</p>
                            <div class="form-outline mb-4 wineData">
                                <span>Rating:</span>         
                                `+ stars + `
                            </div>
                            <p class="card-text my-3 fw-bold">`+ data["testo"] + `</p>
                            <p class="card-text my-3 fw-light wineData">Taste notes: `+ data["note"] + `</p>          
                        </a>

                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-12 col-sm-10">
                                <div class="row">
                                    <div class="col-6 col-sm-6"><label for="light-` + data["idPost"] + `">Light</label></div> 
                                    <div class="col-6 col-sm-6"><label class="d-flex justify-content-end">Structured</label></div> 
                                </div>
                                <input id="light-` + data["idPost"] + `" type="range" disabled class="form-range slider" min="0" max="100" step="1" value="`+ data["leggero"] + `">
                                <div class="row">
                                    <div class="col-6 col-sm-6"><label for="soft-` + data["idPost"] + `">Soft</label></div> 
                                    <div class="col-6 col-sm-6"><label class="d-flex justify-content-end">Tannic</label></div> 
                                </div>
                                <input id="soft-` + data["idPost"] + `" type="range" disabled class="form-range slider" min="0" max="100" step="1" value="`+ data["morbido"] + `">   
                                <div class="row">
                                    <div class="col-6 col-sm-6"><label for="dry-` + data["idPost"] + `">Dry</label></div> 
                                    <div class="col-6 col-sm-6"><label class="d-flex justify-content-end">Sweet</label></div> 
                                </div>
                                <input id="dry-` + data["idPost"] + `" type="range" disabled class="form-range slider" min="0" max="100" step="1" value="`+ data["secco"] + `">
                                <div class="row">
                                    <div class="col-6 col-sm-6"><label for="flat-` + data["idPost"] + `">Flat</label></div> 
                                    <div class="col-6 col-sm-6"><label class="d-flex justify-content-end">Sour</label></div> 
                                </div>
                                <input id="flat-` + data["idPost"] + `" type="range" disabled class="form-range slider" min="0" max="100" step="1" value="`+ data["piatto"] + `">     
                                <div class="row mt-3 text-center">
                                    <span id="balance-` + data["idPost"] + `">`+data["bilanciamento"]+`</span>   
                                </div>   
                            </div>
                            <div class="col-sm-1"></div> 
                        </div>
                        <p class="card-text"><small class="text-muted">Posted `+ data["diffTime"] + `ago</small></p>
                        <img class="card-img-bottom" src="`+ data["immagine"] + `" alt=""> 
                        `+ searchBarcode + `
                    </section>    
                    <footer>
                        <div class="row pt-3 pr-1 mb-1">
                            <div class="col-9 col-sm-9"></div>      
                            <div class="col-1 col-sm-1 font-weight-bold">
                                <p id="numLikeID-` + data["idPost"] + `" class="text-end fw-bold text-wine">`+ data["numLike"] + `</p> 
                            </div> 
                            <div class="col-1 col-sm-1">
                                <a href="#!" onclick="likeChange(`+ data["idPost"] + `)" title="Add or remove like">
                                    <span class="`+ data["liked"] + ` fa-heart text-wine" id="idLike-` + data["idPost"] + `"></span>
                                </a>
                            </div>
                            <div class="col-1 col-sm-1">
                                <a href="#!" onclick="commentManager(`+ data["idPost"] + `)" title="Open comments">
                                    <span class="fa-regular fa-comment text-wine"></span>
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

