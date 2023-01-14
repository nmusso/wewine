<?php
require_once 'bootstrap.php';

sec_session_start();
$result["islogged"] = false;

if ($dbh->login_check()){
    $result["islogged"] = true;
    $result["isMine"] = $_SESSION["watchedUser"] == 0 ? true : false;

    if ($_SESSION["watchedUser"] == 0) {
        $result["posts"] = $dbh->getPostsById($_SESSION["user_id"]);
        $result["info"] = $dbh->getUserInfo($_SESSION["user_id"]);
    } else {
        $result["posts"] = $dbh->getPostsById($_SESSION["watchedUser"]);
        $result["info"] = $dbh->getUserInfo($_SESSION["watchedUser"]);
    }

    $result["info"]["userInfo"][0]["imgProfilo"] = UPLOAD_DIR . $result["info"]["userInfo"][0]["imgProfilo"];

    foreach($result["posts"] as &$post){
        $post["immagine"] = UPLOAD_DIR . $post["immagine"];
        $post["imgProfilo"] = UPLOAD_DIR . $post["imgProfilo"];

        if($post["DaysAgo"]==0){
            if($post["MinutesAgo"]==1){
                $post["diffTime"] = $post["MinutesAgo"]." minute ";
            } 
            else{
                $post["diffTime"] = $post["MinutesAgo"]." minutes ";
            }
        }elseif ($post["DaysAgo"]==1){
            $post["diffTime"] = $post["DaysAgo"]." day ";
        }else{
            $post["diffTime"] = $post["DaysAgo"]." days ";
        }
    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>