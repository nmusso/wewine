<?php
require_once 'bootstrap.php';
sec_session_start(); // usiamo la nostra funzione per avviare una sessione php sicura

$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;

    //$result["updateSuccess"] = false;
    /*if(isset($_POST["tofollow"])){
        if($_POST["tofollow"]==true){
            $result["updateSuccess"] = $dbh->setUserFollow($_SESSION["watchedUser"], $_SESSION["user_id"]);
        }
        if($_POST["tofollow"]==false){*/
            $result["updateSuccess"] = $dbh->setUserUnfollow($_SESSION["watchedUser"], $_SESSION["user_id"]);
        /*} 
    }
    //$result["updateSuccess"] = true;*/
}

header('Content-Type: application/json');
echo json_encode($result);

?>