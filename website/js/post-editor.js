function generaForm() {
    let form = `
    <div class="row d-flex justify-content-center align-items-center h-100 mx-2">
        <div class="col col-sm-10 col-md-8 col-lg-8">
            <div class="my-2 p-3">
                <h2 class="text-center mb-3">Make a Post</h2>
                <form id="post_form">
                    <div class="form-outline mb-4">
                        <label class="form-label" for="wineName">Wine name *</label>
                        <input id="wineName" type="text" class="form-control form-control-lg" required>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="origin">Origin *</label>
                        <input id="origin" type="text" class="form-control form-control-lg" required>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="food">Food recommended as an accompaniment</label>
                        <input id="food" type="text" class="form-control form-control-lg" required>
                    </div>
                    <div class="form-outline mb-4">
                        <label id="lightValue" for="light">Light: </label>
                        <input id="light" type="range" class="form-range slider" min="0" max="100" step="1"">
                        <label id="dryValue" for="dry">Dry: </label>
                        <input id="dry" type="range" class="form-range slider" min="0" max="100" step="1">
                        <label id="flatValue" for="flat">Flat: </label>
                        <input id="flat" type="range" class="form-range slider" min="0" max="100" step="1">
                        <label id="softValue" for="soft">Soft: </label>
                        <input id="soft" type="range" class="form-range slider" min="0" max="100" step="1">
                    </div>
                    <div class="form-outline mb-4">
                        <label>Rating:</label>         
                        <span class="fa-solid fa-star" onclick="changeRating(1)"></span>
                        <span class="fa-regular fa-star" onclick="changeRating(2)"></span>
                        <span class="fa-regular fa-star" onclick="changeRating(3)"></span>
                        <span class="fa-regular fa-star" onclick="changeRating(4)"></span>
                        <span class="fa-regular fa-star" onclick="changeRating(5)"></span>
                    </div>
                    <div class="form-outline mb-4">
                        <label for="text">Text</label>
                        <textarea class="form-control" id="text" rows="5" placeholder="Write a review.."></textarea>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="photo">Photo</label>
                        <input type="file" class="form-control" id="photo" />
                    </div>
                    <div id="error" class="text-danger mb-4">
                    </div>
                    <div class="mb-4">
                        <label>* Field required</label>
                    </div>             
                    <div class="d-flex justify-content-center">
                        <button id="submit" type="button" class="btn wine btn-block btn-lg text-white">Post</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-sm-1 col-md-2 col-lg-2"></div>
    </div>
    `;

    return form;
}

const types=["light", "dry", "flat", "soft"]
const main = document.querySelector("main");
main.innerHTML = generaForm();

types.forEach(type => {
    changeValue(type);
    document.getElementById(type).addEventListener("input", () => changeValue(type));
});

document.getElementById("submit").addEventListener("click", () => {
    const name = document.querySelector("#wineName").value;
    const origin = document.querySelector("#origin").value;
    const food = document.querySelector("#food").value;
    const light = document.querySelector("#light").value;
    const dry = document.querySelector("#dry").value;
    const flat = document.querySelector("#flat").value;
    const soft = document.querySelector("#soft").value;
    const valutation = document.querySelectorAll(".starOn").length;
    const text = document.querySelector("#text").value;
    const photo = document.querySelector("#photo").files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("origin", origin);
    formData.append("food", food);
    formData.append("light", light);
    formData.append("dry", dry);
    formData.append("flat", flat);
    formData.append("soft", soft);
    formData.append("valutation", valutation);
    formData.append("text", text);

    if (photo != undefined) {
        formData.append("photo", photo);
    }

    axios.post("./api/api-post-editor.php", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./login.php");
        } else {
            if (response.data["postOK"]) {
                window.location.replace("./profile.php?profile=0");
            } else {
                document.getElementById("error").innerText = response.data["errorPost"];
            }
        }
    })
})

function changeValue(type) {
    let string = type.charAt(0).toUpperCase() + type.slice(1);
    document.getElementById(type + "Value").innerText = string + ": " + document.getElementById(type).value + "%";
}

function changeRating(val) {
    const stars = document.querySelectorAll(".fa-star");

    for (let i = 0; i < stars.length; i++) {
        if (i < val) {
            if (stars[i].classList.contains("fa-regular")) {
                stars[i].classList.replace("fa-regular", "fa-solid");
                stars[i].classList.add("starOn");
            }
        } else {
            if (stars[i].classList.contains("fa-solid")) {
                stars[i].classList.replace("fa-solid", "fa-regular");
                stars[i].classList.remove("starOn");
            }   

        }
    }
}