function generaLoginForm(loginerror = null) {
    let form = `
    <div class="row my-5">
        <div class="col-2 col-sm-4"></div>
        <div class="col-8 col-sm-4">
            <div id="error" class="text-danger mb-3">
            </div>
            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Mail</label>
                    <input type="" class="form-control" id="email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" required>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="check">
                    <label class="form-check-label" for="check">Remember me</label>
                </div>
                <div class="d-flex flex-row-reverse mb-3">
                    <button id="submit" type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div class="d-flex flex-row-reverse mb-3">
                    <a id="register" href="#">Register now</a>
                </div>       
            </form>
        </div>
        <div class="col-2 col-sm-4"></div>
    </div>`;
    return form;
}

const main = document.querySelector("main");
main.innerHTML = generaLoginForm();