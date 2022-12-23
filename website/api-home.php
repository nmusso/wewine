<?php
require_once 'bootstrap.php';

sec_session_start();
$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;
    //prendi post e mettili in $result["posts"]
}

header('Content-Type: application/json');
echo json_encode($result);

?>