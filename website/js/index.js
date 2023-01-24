const main = document.querySelector("main");
let numPost = 0;

getPartialFeed();

window.onscroll = function () {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        getPartialFeed();
    }
}

function getPartialFeed() {
    const formData = new FormData();
    formData.append("num", numPost);
    axios.post('./api/api-home.php', formData).then(response => {
        if (response.data["islogged"]) {
            // Visualizza post
            const posts = response.data["posts"];
            for (let i = 0; i < posts.length; i++) {
                posts[i]["liked"] = (posts[i]["liked"] == null) ? "fa-regular" : "fa-solid";
                main.insertAdjacentHTML("beforeend", generaPost(posts[i]));
                numPost++;
            }
        } else {
            // login
            window.location.replace("./login.php");
        }
    });
}

