<?php 

require_once 'bootstrap.php';
sec_session_start();

$result["islogged"] = false;
$result["updateOK"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;

    if (isset($_POST["type"]) && $_POST["type"] == "form") {
        $username = $_POST['username'];
        $nome = $_POST['nome'];
        $cognome = $_POST['cognome'];
        $dataNascita = $_POST['dataNascita'];
        $bio = $_POST['bio'];
        $email = $_POST['email'];
        $res = $dbh->updateInfo($username, $email, $nome, $cognome, $dataNascita, $bio);

        if ($res < 2) {        
            $result["updateOK"] = true;
            // Update profile picture
            if (isset($_FILES["imgProfilo"])) {
                array_map("unlink", glob(UPLOAD_DIR . $_SESSION["user_id"] . "_propic.*"));
                list($checkImage, $msg) = uploadImage($dbh, UPLOAD_DIR, $_FILES["imgProfilo"], $_SESSION["user_id"], false);
                if ($checkImage != false) {
                    $res = $dbh->addProfilePath($_SESSION["user_id"], $msg);
                    $result["updateOK"] = true;
                } else {
                    $result["errorUpdate"] = $msg;
                    $result["updateOK"] = false;
                }
            }
    
            // Update profile picture
            if ($result["updateOK"] && isset($_POST["oldPassword"]) && $_POST["oldPassword"] != "") {
                if ($dbh->checkOldPassword($_POST["oldPassword"])) {
                    $random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
                    // Crea una password usando la chiave appena creata.
                    $result["updateOK"] = ($dbh->updatePassword($_POST["newPassword"], $random_salt) == 1);
                } else {
                    $result["updateOK"] = false;
                    $result["errorUpdate"] = "The old password is not correct. Please insert the correct password to continue.";
                }
            }
        } else {
            $result["errorUpdate"] = "Something went wrong while updating your information. Please retry.";
        }
    } else {
        $result["info"] = $dbh->getUserInfo($_SESSION["user_id"]);
        $result["info"] = $result["info"]["userInfo"][0];
    }

}

header('Content-Type: application/json');
echo json_encode($result);

?>