const main = document.querySelector("main");
axios.get('api-home.php').then(response => {
    console.log(response);
    if (response.data["islogged"]) {
        // Visualizza post
        main.innerHTML = "<h1>Feed</h1>";
    } else {
        // login
        window.location.replace("./login.php");
    }
});