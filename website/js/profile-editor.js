function generaForm() {
    let form = `
    <section>
        <div class="row d-flex justify-content-center align-items-center h-100 mx-2">
            <div class="col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
            <div class="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
                <div class="card">
                    <div class="card-body p-5">
                        <p class="text-center mb-5 fs-2">Create an account</p>
                        <form id="update_form"> 
                            <div class="form-outline mb-4">
                                <label class="form-label" for="imgProfile">Profile picture</label>
                                <input type="file" class="form-control" id="imgProfile" /> 
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="name">Name</label>
                                <input type="text" id="name" class="form-control form-control-lg" />   
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="surname">Surname</label>
                                <input type="text" id="surname" class="form-control form-control-lg" />      
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="email">Email</label>
                                <input type="email" id="email" class="form-control form-control-lg" />  
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="dateBirth">Date of birth</label>
                                <input type="date" id="dateBirth" class="form-control form-control-lg" />  
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="selectType">User type</label>
                                <select id="selectType" class="form-select" aria-label="User type select">
                                    <option value="owner" selected>Company owner</option>
                                    <option value="grower">Grape grower</option>
                                    <option value="sommelier">Sommelier</option>
                                    <option value="passionate">Passionate</option>
                                    <option value="novice">Novice</option>
                                </select>
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="address">Your address</label>
                                <input type="text" id="address" class="form-control form-control-lg">
                            </div>
                            <div class="form-outline mb-4">
                                <label for="bio">Bio</label> 
                                <textarea class="form-control" id="bio" rows="5"></textarea>
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="username">Username</label>
                                <input type="text" id="username" class="form-control form-control-lg" />       
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="oldpassword">Old password</label>
                                <input type="password" id="oldpassword" class="form-control form-control-lg" />
                            </div>   
                            <div class="form-outline mb-4">
                                <label class="form-label" for="newpassword">New password</label>
                                <input type="password" id="newpassword" class="form-control form-control-lg" />
                            </div>                   
                            <div id="error" class="text-danger mb-4">
                            </div>
                            <div class="d-flex justify-content-center">
                                <button id="submit" type="button" class="btn btn-primary btn-block btn-lg text-white">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
        </div>
    </section>`;

    return form;
}

const main = document.querySelector("main");
main.innerHTML = generaForm();
let data = [];

const type = document.getElementById("selectType");
type.addEventListener("change", addressManager);

axios.get("./api/api-profile-editor.php").then(response => {
    if (response.data["islogged"]) {
        data = response.data["info"];
        fillForm();
        addressManager();
    } else {
        window.location.replace("./login.php");
    }
})

function fillForm() {
    document.getElementById("name").value = data["nome"];
    document.getElementById("surname").value = data["cognome"];
    document.getElementById("bio").value = data["bio"];
    document.getElementById("username").value = data["username"];
    document.getElementById("email").value = data["email"];
    document.getElementById("dateBirth").value = data["dataNascita"];
    document.getElementById("selectType").value = data["tipo"];
    document.getElementById("address").value = data["indirizzo"];
}

document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.getElementById("update_form");
    const oldPw = document.getElementById("oldpassword").value;
    const newPw = document.getElementById("newpassword").value;

    if ((oldPw == "" && newPw != "") || (oldPw != "" && newPw == "")) {
        document.getElementById("error").innerText = "You filled only one password field. Please fill both or neither to update.";
    } else {
        let oldPassword = "";
        let newPassword = "";
        
        if (oldPw != "" && newPw != "") {
            formhash(form, oldPw, newPw); 
            oldPassword = document.querySelector("#oldp_hex").value;
            newPassword = document.querySelector("#newp_hex").value;
        }

        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const nome = document.querySelector("#name").value;
        const cognome = document.querySelector("#surname").value;
        const dataNascita = document.querySelector("#dateBirth").value;
        const tipo = document.querySelector("#selectType").value;
        const indirizzo = document.querySelector("#address").value;
        const bio = document.querySelector("#bio").value;
        const imgProfilo = document.querySelector("#imgProfile").files[0];
        update(username, oldPassword, newPassword, email, nome, cognome, dataNascita, tipo, indirizzo, bio, imgProfilo);
    }
})

function update(username, oldPassword, newPassword, email, nome, cognome, dataNascita, tipo, indirizzo, bio, imgProfilo) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('oldPassword', oldPassword);
    formData.append('newPassword', newPassword);
    formData.append('email', email);
    formData.append('nome', nome);
    formData.append('cognome', cognome);
    formData.append('dataNascita', dataNascita);
    formData.append('tipo', tipo);
    formData.append('indirizzo', indirizzo);
    formData.append('bio', bio);
    formData.append('type', "form");

    if (imgProfilo != undefined) {
        formData.append('imgProfilo', imgProfilo);
    }

    axios.post('./api/api-profile-editor.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log(response.data);
        if (response.data["islogged"]) {
            if (response.data["updateOK"]) {
                window.location.replace("./profile.php?profile=0")
            } else {
                document.getElementById("error").innerText = response.data["errorUpdate"];
            }
        } else {
            window.location.replace("./login.php");
        }
    });
}

function formhash(form, oldPass, newPass) {
    // Crea un elemento di input che verrà usato come campo di output per la vecchia password criptata.
    var p = document.createElement("input");
    // Aggiungi un nuovo elemento al tuo form.
    form.appendChild(p);
    p.id = "oldp_hex";
    p.name = "newp";
    p.type = "hidden"
    p.value = hex_sha512(oldPass);
    // Assicurati che la vecchia password non venga inviata in chiaro.
    oldPass.value = "";

    // Crea un elemento di input che verrà usato come campo di output per la nuova password criptata.
    var p = document.createElement("input");
    // Aggiungi un nuovo elemento al tuo form.
    form.appendChild(p);
    p.id = "newp_hex";
    p.name = "newp";
    p.type = "hidden"
    p.value = hex_sha512(newPass);
    // Assicurati che la nuova password non venga inviata in chiaro.
    newPass.value = "";
}

function addressManager() {   
    document.getElementById("address").disabled = !(type.value == "owner" || type.value == "grower");
}