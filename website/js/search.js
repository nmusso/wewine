function generaBarra() {
    let bar = `
    <div class="row mt-2">
        <div class="col-10 col-sm-6">
            <div class="d-flex form-inputs mx-2">
                <input class="form-control" type="text" placeholder="Search any profile...">
                <i class="bx bx-search"></i>
            </div>
        </div>
        <div class="col-2 col-sm-6 p-0">
            <button type="button" class="btn btn-dark">
                <i class="fas fa-search"></i>
            </button>
        </div>
    </div>
    `
}

function generaProfilo() {
    let profile = `
    <div class="row mt-2">
        <div class="col-12 col-sm-12 col-md-6">
            <div class="card mx-2">
                <div class="row">
                    <div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-2">
                        <img src="../upload/empty.png" class="img-fluid rounded-circle p-1" />
                    </div>
                    <div class="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-10">
                        <div class="card-body">
                            <p class="card-text">Nome</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

const canvas = document.getElementById('imgProfileId');
const context = canvas.getContext('2d');
var image = new Image();
image.src = "../upload/empty.png"; //la prendiamo da api-search

image.onload = function () {
    context.drawImage(image, 0, 0, 50, 50);
}