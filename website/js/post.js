const main = document.querySelector("main");

axios.get("api-post.php").then(response => {
    if (response.data["islogged"]) {
        if (response.data["getPost"]){
            const post = response.data["postInfo"][0];
            post["liked"] = (post["liked"] == null) ? "fa-regular" : "fa-solid";
            main.insertAdjacentHTML("beforeend", generaPost(post));

            if (response.data["type"] != null && response.data["type"] == "comment") {
                commentManager(post["idPost"]);
            }
        }
    } else {
        window.location.replace("./login.php");
    }
})