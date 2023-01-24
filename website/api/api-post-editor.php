<?php
require_once '../bootstrap.php';
sec_session_start();
$result["postOK"] = false;
$result["islogged"] = false;

if ($dbh->login_check()) {
    $result["islogged"] = true;
    $name = $_POST["name"];
    $origin = $_POST["origin"];
    $notes = $_POST["notes"];
    $light = $_POST["light"];
    $dry = $_POST["dry"];
    $flat = $_POST["flat"];
    $soft = $_POST["soft"];
    $balance = $_POST["balance"];
    $valutation = $_POST["valutation"];
    $text = $_POST["text"];
    $photo = $_FILES["photo"] ?? null;
    
    if ($name != "" && $origin != "") {
        $user_id = $_SESSION["user_id"];
        $checkImage = true;
        $msg = null;

        if ($photo != null) {
            list($checkImage, $msg) = uploadImage($dbh, ".".UPLOAD_DIR, $photo, $user_id, true);
        }

        if ($checkImage != false) {
            $id = $dbh->addPost($user_id, $name, $origin, $notes, $light, $dry, $flat, $soft, $balance, $valutation, $text, $msg);

            if ($id != false) {
                $result["postOK"] = true;
            } else {
                $result["errorPost"] = "Something went wrong while creating the post, please retry.";
            }
        } else {
            $result["errorPost"] = $msg;
        }
    } else {
        $result["errorPost"] = "The name and origin fields are empty, please fill them and retry.";
    }
}


header('Content-Type: application/json');
echo json_encode($result);

?>