function generaForm() {
    let form = `
    <section>
        <h2 hidden>Form</h2>
        <div class="row d-flex justify-content-center align-items-center h-100 mx-2">
            <div class="col col-sm-10 col-md-8 col-lg-8">
                <div class="my-2 p-3">
                    <h2 class="text-center mb-3">Make a Post</h2>
                    <form id="post_form">
                        <fieldset>
                            <legend class="my-4">Information</legend>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="wineName">Wine name *</label>
                                <input id="wineName" type="text" class="form-control form-control-lg" required />
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="origin">Origin *</label>
                                <input id="origin" type="text" class="form-control form-control-lg" required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend class="my-4">Taste</legend>
                            <div class="form-outline mb-4 mt-2">
                                <div class="row">
                                    <div class="col-6 col-sm-6"><label for="light">Light</label></div> 
                                    <div class="col-6 col-sm-6"><label class="d-flex justify-content-end">Structured</label></div> 
                                </div>
                                <input id="light" type="range" class="form-range slider" min="0" max="100" step="1" />
                                <div class="row">
                                    <div class="col-6 col-sm-6"><label for="soft">Soft</label></div> 
                                    <div class="col-6 col-sm-6"><label class="d-flex justify-content-end">Tannic</label></div> 
                                </div>
                                <input id="soft" type="range" class="form-range slider" min="0" max="100" step="1" />   
                                <div class="row">
                                    <div class="col-6 col-sm-6"><label for="dry">Dry</label></div> 
                                    <div class="col-6 col-sm-6"><label class="d-flex justify-content-end">Sweet</label></div> 
                                </div>
                                <input id="dry" type="range" class="form-range slider" min="0" max="100" step="1" />
                                <div class="row">
                                    <div class="col-6 col-sm-6"><label for="flat">Flat</label></div> 
                                    <div class="col-6 col-sm-6"><label class="d-flex justify-content-end">Sour</label></div> 
                                </div>
                                <input id="flat" type="range" class="form-range slider" min="0" max="100" step="1" />     
                                <div class="row mt-3 text-center">
                                    <span id="balance"></span>   
                                </div>    
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="notes">Taste notes</label>
                                <input id="notes" type="text" class="form-control form-control-lg" required />
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend class="my-4">Opinion</legend>
                            <div class="form-outline mb-4">
                                <label>Rating:</label>         
                                <span class="fa-solid fa-star starOn" onclick="changeRating(1)"></span>
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
                            <div class="form-outline mb-4">
                                <label class="form-label" for="barcode">Barcode</label>
                                <input id="barcode" type="text" class="form-control" placeholder="Insert manually the codebar or scan it.." />
                                <label class="form-babel" for="qr-reader__filescan_input" hidden>Input scan</label>
                                <div id="qr-reader" class="mt-2"></div>
                            </div>
                        </fieldset>
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
    </section>
    `;

    return form;
}

const types=["light", "dry", "flat", "soft"]
const main = document.querySelector("main");
main.innerHTML = generaForm();

const sliLight = document.querySelector("#light");
const sliDry = document.querySelector("#dry");
const sliFlat = document.querySelector("#flat");
const sliSoft = document.querySelector("#soft");

let html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10 , aspectRatio: 1.777778}); 
html5QrcodeScanner.render(onScanSuccess);

let classes = ["btn", "wine", "text-white"];
document.querySelector("button").classList.add(...classes);
document.querySelector("#qr-reader__status_span").style = "";

types.forEach(type => {
    changeValue(type);
    document.getElementById(type).addEventListener("input", () => changeValue());
});

document.getElementById("submit").addEventListener("click", () => {
    const name = document.querySelector("#wineName").value;
    const origin = document.querySelector("#origin").value;
    const barcode = document.querySelector("#barcode").value;
    const notes = document.querySelector("#notes").value;
    const balance = document.querySelector("#balance").innerText;
    const valutation = document.querySelectorAll(".starOn").length;
    const text = document.querySelector("#text").value;
    const photo = document.querySelector("#photo").files[0];
    const light = sliLight.value;
    const dry = sliDry.value;
    const flat = sliFlat.value;
    const soft = sliSoft.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("origin", origin);
    formData.append("barcode", barcode);
    formData.append("notes", notes);
    formData.append("light", light);
    formData.append("dry", dry);
    formData.append("flat", flat);
    formData.append("soft", soft);
    formData.append("balance", balance);
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
});

function changeValue() {
    const balanceSpan = document.querySelector("#balance");
    const light = Math.abs(50-parseInt(sliLight.value));
    const dry = Math.abs(50-parseInt(sliDry.value));
    const flat = Math.abs(50-parseInt(sliFlat.value));
    const soft = Math.abs(50-parseInt(sliSoft.value));
    const dist = light+dry+flat+soft;

    if(dist<30){
        balanceSpan.innerText = "Balanced";
        balanceSpan.classList.remove(...balanceSpan.classList);
        balanceSpan.classList.add("balanced");
    } else if(dist<80){
        balanceSpan.innerText = "Quite Balanced";
        balanceSpan.classList.remove(...balanceSpan.classList);
        balanceSpan.classList.add("quite-balanced");
    } else if(dist<150){
        balanceSpan.innerText = "Slightly unbalanced";
        balanceSpan.classList.remove(...balanceSpan.classList);
        balanceSpan.classList.add("slightly-unbalanced");
    }else{
        balanceSpan.innerText = "Unbalanced";
        balanceSpan.classList.remove(...balanceSpan.classList);
        balanceSpan.classList.add("unbalanced");
    }
    
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

function onScanSuccess(decodedText) {
    document.querySelector("#barcode").value = decodedText;
}


