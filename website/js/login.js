function generaLoginForm() {
    let form = `
    <section>
        <h2 hidden>Login</h2>
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
                            <input type="text" class="form-control" id="username" required />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" required />
                        </div>
                        <div class="d-flex flex-row-reverse mb-3">
                            <button id="submit" type="submit" class="btn wine text-white">Login</button>
                        </div>
                        <div class="d-flex flex-row-reverse mb-3 text-end">
                            <a id="register" href="./register.php"><p class="text-right fw-light">If you don't already have an account <br/><u class="fw-bold ">Register now</u></p></a>
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

document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
    const form = document.getElementById("login_form");
    const pw = document.getElementById("password").value;
    formhash(form, pw);
    
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#p_hex").value;
    form.removeChild(document.getElementById("p_hex")); 
    
    login(username, password);
})

function login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    axios.post('./api/api-login.php', formData).then(response => {
        if (response.data["logindone"]) {
            window.location.replace("./index.php");
        } else {
            document.getElementById("error").innerText = response.data["errorLogin"];
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


