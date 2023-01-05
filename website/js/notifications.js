function generaNotifica() {
    let notification = `
    <div class="row mt-2 userCard">
        <div class="col-12 col-sm-12 col-md-10 col-lg-8">
            <div class="card mx-2 px-2">
                <div class="row">
                    <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 p-2">
                        <img src="./upload/empty.png" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
                    </div>
                    <div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
                        <div class="row">
                            <div class="card-body col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <p class="card-text">Username</p>
                            </div>
                            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                11 min ago
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-12">
                                Liked your post
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return notification;
}

const main = document.querySelector("main");
main.innerHTML = generaNotifica();