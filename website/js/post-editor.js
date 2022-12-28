function generaForm() {
    let form = `
    <div class="row d-flex justify-content-center align-items-center h-100 mx-2">
        <div class="col col-sm-10 col-md-8 col-lg-8">
            <div class="my-2 p-5">
                <h2 class="text-uppercase text-center mb-5">Make a post</h2>
                <form id="post_form">
                    <div class="form-outline mb-4">
                        <label for="text">Text</label>
                        <textarea class="form-control " id="text" rows="5"
                            placeholder="What's new?"></textarea>
                    </div>
                    <div class="form-outline mb-4">
                        <label class="form-label" for="photo">Photo</label>
                        <input type="file" class="form-control" id="photo" />
                    </div>
                    <div id="error" class="text-danger mb-4">
                    </div>
                    <div class="d-flex justify-content-center">
                        <button id="submit" type="button"
                            class="btn btn-dark btn-block btn-lg text-white">Post</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-sm-1 col-md-2 col-lg-2"></div>
    </div>
    `;

    return form;
}

const main = document.querySelector("main");
main.innerHTML = generaForm();