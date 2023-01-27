<?php 

require_once '../bootstrap.php';
sec_session_start();

$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;
    $result["deleteSuccess"] = $dbh->deletePost($_POST["idPost"]);
    $result["delete"] = array_map("unlink", glob("." . UPLOAD_DIR . $_SESSION["user_id"] . "_" . $dbh->nextPostId($_SESSION["user_id"]) . ".*"));
}

header('Content-Type: application/json');
echo json_encode($result);

?>