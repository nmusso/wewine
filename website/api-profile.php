<?php
require_once 'bootstrap.php';

sec_session_start();
$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;
    //$result     $_SESSION["user_id"]
}

header('Content-Type: application/json');
echo json_encode($result);

?>