<?php
require_once 'bootstrap.php';

sec_session_start();
$result["islogged"] = false;

if ($dbh->login_check()){
    $result["islogged"] = true;

    if($_POST["type"]=="like"){
        if($dbh->getLikeState($_POST["id"])[0]["liked"]==1){
            $result["changeOk"]=$dbh->removeLike($_POST["id"]);
        }else{
            $result["changeOk"]=$dbh->insertLike($_POST["id"]);
        }
    }elseif($_POST["type"]=="comment"){

    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>