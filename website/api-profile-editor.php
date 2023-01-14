<?php 

require_once 'bootstrap.php';
sec_session_start();

$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;

    if (isset($_POST["setUser"])) {
        // inserisci i dati nel db
    } else {
        $result["info"] = $dbh->getUserInfo($_SESSION["user_id"]);
        $result["info"] = $result["info"]["userInfo"][0];
    }

}

header('Content-Type: application/json');
echo json_encode($result);

?>