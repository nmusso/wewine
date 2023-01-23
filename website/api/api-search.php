<?php
require_once '../bootstrap.php';
sec_session_start(); // usiamo la nostra funzione per avviare una sessione php sicura

$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;

    $result["users"] = $dbh->getUsersByName($_POST["value"]);

    foreach($result["users"] as &$user){
        $user["imgProfilo"] = UPLOAD_DIR . $user["imgProfilo"];
    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>