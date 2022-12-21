<?php
require_once 'bootstrap.php';

$result["islogged"] = false;

if(isUserLoggedIn()){
    $result["islogged"] = true;
    //prendi post e mettili in $result["posts"]
}

header('Content-Type: application/json');
echo json_encode($result);

?>