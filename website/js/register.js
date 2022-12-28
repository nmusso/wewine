function generaLoginForm(loginerror = null) {
    let form = `
    <div class="row d-flex justify-content-center align-items-center h-100 mx-2">
        <div class="col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
        <div class="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div class="card">
                <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">Create an account</h2>
                    <form id="register_form"> 
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
                            <button id="submit" type="button" class="btn btn-primary btn-block btn-lg text-white">Register</button>
                        </div>
                        <p class="text-center text-muted mt-5 mb-0">Have already an account? <a id="loginhere" href="#!"
                            class="fw-bold text-body"><u>Login here</u></a></p>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
    </div>`;
    return form;
}

const main = document.querySelector("main");
main.innerHTML = generaLoginForm();

document.getElementById("loginhere").addEventListener("click", () => window.location.replace("./login.php"))

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
    const bio = document.querySelector("#bio").value;
    const imgProfilo = document.querySelector("#imgProfile").files[0];
    register(username, password, email, nome, cognome, dataNascita, bio, imgProfilo);
})

function register(username, password, email, nome, cognome, dataNascita, bio, imgProfilo) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('nome', nome);
    formData.append('cognome', cognome);
    formData.append('dataNascita', dataNascita);
    formData.append('bio', bio);
    formData.append('imgProfilo', imgProfilo);

    axios.post('api-register.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log(response);
        if (response.data["registerOK"]) {
            window.location.replace("./index.php")
        } else {
            document.getElementById("error").innerText = response.data["errorRegister"];
        }
    });
}

function formhash(form, password) {
    // Crea un elemento di input che verrà usato come campo di output per la password criptata.
    var p = document.createElement("input");
    // Aggiungi un nuovo elemento al tuo form.
    form.appendChild(p);
    p.id = "p_hex";
    p.name = "p";
    p.type = "hidden"
    p.value = hex_sha512(password);
    // Assicurati che la password non venga inviata in chiaro.
    password.value = "";
}

