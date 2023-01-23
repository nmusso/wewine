function generaNotifica(data, age) {
    const type = (data["type"] == "newLike") ? "like" : "comment";
    const ref = (data["type"] == "newFollow") ? "profile.php?profile=" + data["id"] : "post.php?post=" + data["idPost"] + "&type=" + type;  
    const style = (age=="new") ? 'wine' : '';
    const style_text = (age=="new") ? 'text-white' : '';
    let notification = `
    <section>
        <div class="row mt-2 userCard">
            <div class="col-12 col-sm-12 col-md-10 col-lg-8">
                <div class="card mx-2 px-2 ` + style + `">
                    <a href="` + ref + `">
                        <div class="row">
                            <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 p-2">
                                <img src=" `+data["imgProfilo"]+`" alt="" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
                            </div>
                            <div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
                                <div class="row">
                                    <div class="card-body col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 ` + style_text + `">
                                        <p class="card-text">`+data["username"]+`</p>
                                    </div>
                                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 ` + style_text + `">
                                        <p>`+data["diffTime"]+` ago</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-sm-12 ` + style_text + `">
                                        <p>`+data["text"]+`</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
    `;

    return notification;
}

const main = document.querySelector("main");

axios.get('api-notifications.php').then(response => {
    if (!response.data["islogged"]) {
        window.location.replace("./login.php");
    } else {
        const notifications = response.data["allnotifications"];

        notifications.forEach(n => {
            console.log(n);
            let age = (n["type"]=="newFollow" || n["type"]=="newComment" || n["type"]=="newLike") ? "new" : "old";
            main.insertAdjacentHTML("beforeend", generaNotifica(n,age));
        });
    }
});