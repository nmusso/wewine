<?php
require_once 'bootstrap.php';

sec_session_start();
$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;
    //prendi post e mettili in $result["posts"]
    //$result["posts"][$i]["diffTime"]=;
    // prendere post da mostrare in feed di utente corrente
    $result["posts"] = $dbh->getFeed($_SESSION["user_id"]);

    //$result["posts"][$i]["diffTime"]

    for($i=0; $i<count($result["posts"]); $i++){
        $result["posts"][$i]["immagine"] = UPLOAD_DIR . $result["posts"][$i]["immagine"];
        $result["posts"][$i]["imgProfilo"] = UPLOAD_DIR . $result["posts"][$i]["imgProfilo"];

        if($result["posts"][$i]["DaysAgo"]==0){
            if($result["posts"][$i]["MinutesAgo"]==1){
                $result["posts"][$i]["diffTime"] = $result["posts"][$i]["MinutesAgo"]." minute ";
            } 
            else{
                $result["posts"][$i]["diffTime"] = $result["posts"][$i]["MinutesAgo"]." minutes ";
            }
        }elseif ($result["posts"][$i]["DaysAgo"]==1){
            $result["posts"][$i]["diffTime"] = $result["posts"][$i]["DaysAgo"]." day ";
        }else{
            $result["posts"][$i]["diffTime"] = $result["posts"][$i]["DaysAgo"]." days ";
        }
    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>