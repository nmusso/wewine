<?php
require_once("bootstrap.php");
sec_session_start();
$result["postOK"] = false;
$result["islogged"] = false;

if ($dbh->login_check()) {
    $result["islogged"] = true;
    $text = $_POST["text"];
    $photo = $_FILES["photo"] ?? null;
    
    if ($text != "" || $photo != null) {
        $user_id = $_SESSION["user_id"];
        $checkImage = true;
        $msg = null;

        if ($photo != null) {
            list($checkImage, $msg) = uploadImage($dbh, UPLOAD_DIR, $photo, $user_id, true);
        }

        if ($checkImage != false) {
            $id = $dbh->addPost($user_id, $text, $msg);

            if ($id != false) {
                $result["postOK"] = true;
            } else {
                $result["errorPost"] = "Something went wrong while creating the post, please retry.";
            }
        } else {
            $result["errorPost"] = $msg;
        }
    } else {
        $result["errorPost"] = "The fields are empty, please insert text or a photo";
    }
}


header('Content-Type: application/json');
echo json_encode($result);

?>