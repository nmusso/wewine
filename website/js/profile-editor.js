function generaForm() {
    let form = `
    <div class="row d-flex justify-content-center align-items-center h-100 mx-2">
        <div class="col-sm-1 col-md-2 col-lg-3 col-xl-4"></div>
        <div class="col col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div class="card">
                <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">Modify your informations</h2>
                    <form id="register_form"> 
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
                            <label for="bio">Bio</label> 
                            <textarea class="form-control" id="bio" rows="5"></textarea>
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="username">Username</label>
                            <input type="text" id="username" class="form-control form-control-lg" />       
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="password">Old password</label>
                            <input type="password" id="oldpassword" class="form-control form-control-lg" />
                        </div>   
                        <div class="form-outline mb-4">
                            <label class="form-label" for="password">New password</label>
                            <input type="password" id="newpassword" class="form-control form-control-lg" />
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
main.innerHTML = generaForm();

axios.get("api-profile-editor.php").then(response => {
    if (response.data["islogged"]) {
        console.log(response.data["info"]);
        const data = response.data["info"];
        document.getElementById("name").value = data["nome"];
        document.getElementById("surname").value = data["cognome"];
        document.getElementById("bio").value = data["bio"];
        document.getElementById("username").value = data["username"];
        document.getElementById("email").value = data["email"];
        document.getElementById("dateBirth").value = data["dataNascita"];
    } else {
        window.location.replace("./login.php");
    }
})

