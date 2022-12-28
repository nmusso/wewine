<?php
require_once 'bootstrap.php';

sec_session_start();
$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;
    //prendi post e mettili in $result["posts"]
    //https://getbootstrap.com/docs/4.0/components/card/#images
    //https://getbootstrap.com/docs/4.0/components/card/#header-and-footer
    //https://getbootstrap.com/docs/5.3/components/toasts/#basic
}

header('Content-Type: application/json');
echo json_encode($result);

?>