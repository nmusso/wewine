function generaLoginForm() {
    let form = `
    <section>
        <div class="row my-5">
            <div class="col-2 col-sm-4"></div>
            <div class="col-8 col-sm-4">
                <div id="error" class="text-danger mb-3">
                </div>
                <form id="login_form">
                    <fieldset>
                        <legend class="mb-3">Login</legend>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" required>
                        </div>
                        <div class="d-flex flex-row-reverse mb-3">
                            <button id="submit" type="submit" class="btn wine text-white">Login</button>
                        </div>
                        <div class="d-flex flex-row-reverse mb-3">
                            <a id="register" href="#">Register now</a>
                        </div>     
                    </fieldset>
                </form>
            </div>
            <div class="col-2 col-sm-4"></div>
        </div>
    </section>`;
    
    return form;
}

const main = document.querySelector("main");
main.innerHTML = generaLoginForm();

document.getElementById("register").addEventListener("click", () => {
    window.location.replace("./register.php")
})

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    const form = document.getElementById("login_form");
    const pw = document.getElementById("password").value;
    formhash(form, pw);
    
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#p_hex").value;
    login(username, password);
})

function login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    axios.post('./api/api-login.php', formData).then(response => {
        console.log(response.data);
        if (response.data["logindone"]) {
            window.location.replace("./index.php")
        } else {
            document.getElementById("error").innerText = response.data["errorLogin"];
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


