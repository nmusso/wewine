const main = document.querySelector("main");

const btnDel = `
<div class="row mt-3">
    <div class="col-1 col-sm-1"></div>
    <div class="col-10 col-sm-8 d-flex justify-content-end ">
        <button id="btnDel" type="button" onclick="deletePost()" class="mt-2 btn wine text-white col-12 col-sm-12 col-md-3 col-lg-2">Delete Post</button>
    </div>
    <div class="col-1 col-sm-1"></div>
</div>`;
    

let idPost;

axios.get("./api/api-post.php").then(response => {
    if (response.data["islogged"]) {
        if (response.data["getPost"]){
            const post = response.data["postInfo"][0];
            idPost = post["idPost"];
            if(response.data["isMine"]){
                main.insertAdjacentHTML("beforeend", btnDel);
            }

            post["liked"] = (post["liked"] == null) ? "fa-regular" : "fa-solid";
            main.insertAdjacentHTML("beforeend", generaPost(post));  
            document.querySelector(".like").addEventListener("click", () => getLikeList(idPost));

            if (response.data["type"] != null && response.data["type"] == "comment") {
                commentManager(post["idPost"]);
            }
        }
    } else {
        window.location.replace("./login.php");
    }
});

function deletePost(){
    const formData = new FormData();
    formData.append("idPost", idPost);
    axios.post('./api/api-delete-post.php', formData).then(response => {
        if (!response.data["islogged"]) {
            window.location.replace("./index.php");
        } else {
            if (response.data["deleteSuccess"]) {
                window.location.replace("./profile.php?profile=0");
            }
        }
    });
}