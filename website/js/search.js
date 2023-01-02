function generaBarra() {
    let bar = `
    <div class="row mt-2">
        <div class="col-10 col-sm-6">
            <div class="d-flex form-inputs mx-2">
                <input id="searchBar" class="form-control" type="text" placeholder="Search any profile...">
                <i class="bx bx-search"></i>
            </div>
        </div>
        <div class="col-2 col-sm-6 p-0">
            <button id="but" type="button" class="btn btn-dark">
                <i class="fas fa-search"></i>
            </button>
        </div>
    </div>
    `;

    return bar;
}

function generaProfilo(user) {
    let profile = `
    <div class="row mt-2 userCard">
        <div class="col-12 col-sm-12 col-md-6">
            <div class="card mx-2">
                <div class="row">
                    <div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-2">
                        <img src="" class="img-fluid rounded-circle p-1" />
                    </div>
                    <div class="col-10 col-sm-10 col-md-9 col-lg-9 col-xl-10">
                        <div class="card-body">
                            <p class="card-text">`+ user["username"] +`</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return profile;
}

const main = document.querySelector("main");
main.innerHTML = generaBarra();
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', updateResults);

function updateResults() {
    // rimuovo risultati precedenti
    let userCards = main.querySelectorAll('.userCard');
    userCards.forEach((elem) => main.removeChild(elem));

    const value = document.getElementById("searchBar").value;
    if (value != "") {
        const formData = new FormData();
        formData.append('value', value);
        axios.post('api-search.php', formData).then(response => {
            if (!response.data["islogged"]) {
                window.location.replace("./index.php");
            } else {
                let result = response.data["users"];
                for(let i=0; i<result.length; i++){
                    main.insertAdjacentHTML("beforeend", generaProfilo(result[i]));
                }
            }
        });
    }
}

/*
const canvas = document.getElementById('imgProfileId');
const context = canvas.getContext('2d');
var image = new Image();
image.src = "../upload/empty.png"; //la prendiamo da api-search

image.onload = function () {
    context.drawImage(image, 0, 0, 50, 50);
}
*/

//researchBar.onchange = function(){updateResults}
//researchBar.addEventListener("keydown", updateResults)
//source.addEventListener('propertychange', updateResults); 
//researchBar.oninput = function(){updateResults}