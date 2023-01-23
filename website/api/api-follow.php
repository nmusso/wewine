<?php
require_once '../bootstrap.php';
sec_session_start();

$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;
    $result["updateSuccess"] = false;
    
    if(isset($_POST["type"])){
        if($_POST["type"] == "follow"){
            $result["updateSuccess"] = $dbh->setUserFollow($_SESSION["watchedUser"], $_SESSION["user_id"]);
        }
        if($_POST["type"] == "unfollow"){
            $result["updateSuccess"] = $dbh->setUserUnfollow($_SESSION["watchedUser"], $_SESSION["user_id"]);
        } 
    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>