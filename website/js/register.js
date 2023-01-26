function generaForm() {
    let form = `
    <section>
        <h2 hidden>Register</h2>
        <div class="row d-flex justify-content-center align-items-center h-100 mx-2">
            <div class="col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
            <div class="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
                <div class="card">
                    <div class="card-body p-5">
                        <form id="register_form"> 
                            <fieldset>
                                <legend class="mb-4 text-center">Create an account</legend>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="imgProfile">Profile picture *</label>
                                    <input type="file" class="form-control" id="imgProfile" /> 
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="name">Name *</label>
                                    <input type="text" id="name" class="form-control form-control-lg" />   
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="surname">Surname *</label>
                                    <input type="text" id="surname" class="form-control form-control-lg" />      
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="email">Email *</label>
                                    <input type="email" id="email" class="form-control form-control-lg" />  
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="dateBirth">Date of birth *</label>
                                    <input type="date" id="dateBirth" class="form-control form-control-lg" />  
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="selectType">User type *</label>
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
                                    <input type="text" id="address" class="form-control form-control-lg" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="bio">Bio *</label> 
                                    <textarea class="form-control" id="bio" rows="5"></textarea>
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="username">Username *</label>
                                    <input type="text" id="username" class="form-control form-control-lg" />       
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="password">Password *</label>
                                    <input type="password" id="password" class="form-control form-control-lg" />
                                </div>   
                                <div class="mb-4">
                                    <label>* Field required</label>
                                </div>                    
                                <div id="error" class="text-danger mb-4">
                                </div>
                                <div class="d-flex justify-content-center">
                                    <button id="submit" type="button" class="btn wine text-white btn-block btn-lg text-white">Register</button>
                                </div>
                                <p class="text-center text-muted mt-5 mb-0">Have already an account? <a id="loginhere" href="./login.php"
                                    class="fw-bold text-body"><u>Login here</u></a></p>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
            <div class="mt-4">
        </div>
    </section>`;

    return form;
}

const main = document.querySelector("main");
main.innerHTML = generaForm();

const type = document.getElementById("selectType");
addressManager();

type.addEventListener("change", addressManager);

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    const form = document.getElementById("register_form");
    const pw = document.getElementById("password").value;
    formhash(form, pw);

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#p_hex").value;
    const email = document.querySelector("#email").value;
    const nome = document.querySelector("#name").value;
    const cognome = document.querySelector("#surname").value;
    const dataNascita = document.querySelector("#dateBirth").value;
    const tipo = document.querySelector("#selectType").value;
    const indirizzo = document.querySelector("#address").value;
    const bio = document.querySelector("#bio").value;
    const imgProfilo = document.querySelector("#imgProfile").files[0];
    form.removeChild(document.getElementById("p_hex"));
    register(username, password, email, nome, cognome, dataNascita, tipo, indirizzo, bio, imgProfilo);
})

function register(username, password, email, nome, cognome, dataNascita, tipo, indirizzo, bio, imgProfilo) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('nome', nome);
    formData.append('cognome', cognome);
    formData.append('dataNascita', dataNascita);
    formData.append('tipo', tipo);
    formData.append('indirizzo', indirizzo);
    formData.append('bio', bio);
    if (imgProfilo != undefined) {
        formData.append('imgProfilo', imgProfilo);
    }

    axios.post('./api/api-register.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        if (response.data["registerOK"]) {
            window.location.replace("./login.php");
        } else {
            document.getElementById("error").innerText = response.data["errorRegister"];
        }
    });
}

function formhash(form, password) {
    var p = document.createElement("input");
    form.appendChild(p);
    p.id = "p_hex";
    p.name = "p";
    p.type = "hidden"
    p.value = hex_sha512(password);
    password.value = "";
}

function addressManager() {   
    document.getElementById("address").disabled = !(type.value == "owner" || type.value == "grower");
    if (document.getElementById("address").disabled) {
        document.getElementById("address").value = "";
    }
}


