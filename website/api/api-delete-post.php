<?php 

require_once '../bootstrap.php';
sec_session_start();

$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;
    $result["deleteSuccess"] = $dbh->deletePost($_POST["idPost"]);
}

header('Content-Type: application/json');
echo json_encode($result);

?>