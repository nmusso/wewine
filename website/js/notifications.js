function generaNotificaNew(data) {
    let notification = `
    <div id="notificationNew" class="row mt-2 userCard">
        <div class="col-12 col-sm-12 col-md-10 col-lg-8">
            <div class="card mx-2 px-2 text-white bg-dark">
                <div class="row">
                    <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 p-2">
                        <img src=" `+data["imgProfilo"]+`" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
                    </div>
                    <div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
                        <div class="row">
                            <div class="card-body col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <p class="card-text">`+data["username"]+`</p>
                            </div>
                            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                `+data["diffTime"]+` ago
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-12">
                                Started following you
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

function generaNotificaOld(data) {
    let notification = `
    <div id="notificationOld" class="row mt-2 userCard">
        <div class="col-12 col-sm-12 col-md-10 col-lg-8">
            <div class="card mx-2 px-2">
                <div class="row">
                    <div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-1 p-2">
                        <img src=" `+data["imgProfilo"]+`" class="img-fluid rounded-circle img-thumbnail p-1 propic" />
                    </div>
                    <div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-11">
                        <div class="row">
                            <div class="card-body col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <p class="card-text">`+data["username"]+`</p>
                            </div>
                            <div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                `+data["diffTime"]+` ago
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-12">
                                Started following you
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
//main.innerHTML = generaNotifica();

axios.get('api-notifications.php').then(response => {
    console.log(response);
    if (!response.data["islogged"]) {
        window.location.replace("./login.php");
    } else {
        const newNotifications = response.data["notifications"]["new"];
        const oldNotifications = response.data["notifications"]["old"];
        for(let i=0; i<newNotifications.length; i++){
            main.insertAdjacentHTML("beforeend", generaNotificaNew(newNotifications[i]));
        }
        for(let i=0; i<oldNotifications.length; i++){
            main.insertAdjacentHTML("beforeend", generaNotificaOld(oldNotifications[i]));
        }
    }
});