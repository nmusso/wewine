<?php
require_once 'bootstrap.php';

sec_session_start();
$result["islogged"] = false;

if ($dbh->login_check()){
    $result["islogged"] = true;

    if ($_POST["type"]=="like"){
        if ($dbh->getLikeState($_POST["id"])[0]["liked"]==1) {
            $result["changeOk"]=$dbh->removeLike($_POST["id"]);
        } else {
            $result["changeOk"]=$dbh->insertLike($_POST["id"]);
        }
    } elseif ($_POST["type"]=="comment") {
        if (isset($_POST["text"])) {
            $dbh->insertComment($_POST["id"], $_POST["text"]);
        } else {
            $result["comments"] = $dbh->getComments($_POST["id"]);
            foreach($result["comments"] as &$comment){
                $comment["imgProfilo"] = UPLOAD_DIR . $comment["imgProfilo"];
            }
        }
    } elseif ($_POST["type"] == "likelist") {
        $result["users"] = $dbh->getLikesForPost($_POST["id"]);

        foreach($result["users"] as &$user){
            $user["imgProfilo"] = UPLOAD_DIR . $user["imgProfilo"];
        }
    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>