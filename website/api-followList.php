<?php 

require_once 'bootstrap.php';
sec_session_start();

$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;
    
    if(isset($_POST["type"])){
        $id = ($_SESSION["watchedUser"] == 0) ? $_SESSION["user_id"] : $_SESSION["watchedUser"];

        if($_POST["type"] == "followers"){
            $result["users"] = $dbh->getFollowers($id);
        }
        if($_POST["type"] == "followed"){
            $result["users"] = $dbh->getFollowed($id);
        }

        if (isset($result["users"])) {
            for($i=0; $i<count($result["users"]); $i++){
                $result["users"][$i]["imgProfilo"] = UPLOAD_DIR . $result["users"][$i]["imgProfilo"];
            }
        }
    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>