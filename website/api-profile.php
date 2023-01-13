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

    for($i=0; $i<count($result["posts"]); $i++){
        $result["posts"][$i]["immagine"] = UPLOAD_DIR . $result["posts"][$i]["immagine"];
        $result["posts"][$i]["imgProfilo"] = UPLOAD_DIR . $result["posts"][$i]["imgProfilo"];

        if($result["posts"][$i]["DaysAgo"]==0){
            if($result["posts"][$i]["MinutesAgo"]==1){
                $result["posts"][$i]["diffTime"] = $result["posts"][$i]["MinutesAgo"]." minute ";
            } 
            else{
                $result["posts"][$i]["diffTime"] = $result["posts"][$i]["MinutesAgo"]." minutes ";
            }
        }elseif ($result["posts"][$i]["DaysAgo"]==1){
            $result["posts"][$i]["diffTime"] = $result["posts"][$i]["DaysAgo"]." day ";
        }else{
            $result["posts"][$i]["diffTime"] = $result["posts"][$i]["DaysAgo"]." days ";
        }
    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>