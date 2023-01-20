function likeChange(id){
    let likeIcon = document.getElementById("idLike-"+id);
    const formData = new FormData();
    formData.append('type', "like");
    formData.append('id', id);
    axios.post('api-interaction.php', formData).then(response => {
        if (response.data["islogged"]) {
            if(response.data["changeOk"]){
                if(likeIcon.classList.contains("fa-regular")){
                    likeIcon.classList.replace("fa-regular","fa-solid")
                }else{
                    likeIcon.classList.replace("fa-solid","fa-regular")
                }   
            }   
        } else {
            // login
            window.location.replace("./login.php");
        }
    }); 
}

function commentManager(id){
    const formData = new FormData();
    formData.append('type', "comment");
    formData.append('id', id);
    axios.post('api-interaction.php', formData).then(response => {
        if (response.data["islogged"]) {
            // Visualizza post
            
        } else {
            // login
            window.location.replace("./login.php");
        }
    }); 
}