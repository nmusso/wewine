<?php
require_once 'bootstrap.php';
sec_session_start(); // usiamo la nostra funzione per avviare una sessione php sicura

$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;

    $result["users"] = $dbh->getUsersByName($_POST["value"]);

    for($i=0; $i<count($result["users"]); $i++){
        $result["users"][$i]["imgProfilo"] = UPLOAD_DIR . $result["users"][$i]["imgProfilo"];
    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>