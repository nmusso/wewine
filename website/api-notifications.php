<?php
require_once 'bootstrap.php';

sec_session_start();
$result["islogged"] = false;

if ($dbh->login_check()){
    $result["islogged"] = true;

    $result["notifications"]["new"] = $dbh->getNewNotifications($_SESSION["user_id"]);
    $result["notifications"]["old"] = $dbh->getOldNotifications($_SESSION["user_id"]);
    // differenziare tra notifiche vecchie e nuove in base ad ultima lettura // create  notifica sia per segue che commento (obbligatorio)
    // aggiornare lettura notifiche ad ora 
    // DISABLED FOR TEST $dbh->getNotifications($_SESSION["user_id"])

    for($i=0; $i<count($result["notifications"]["new"]); $i++){
        $result["notifications"]["new"][$i]["imgProfilo"] = UPLOAD_DIR . $result["notifications"]["new"][$i]["imgProfilo"];

        $diffTime="";
        if($result["notifications"]["new"][$i]["DaysAgo"]==0){
            if($result["notifications"]["new"][$i]["MinutesAgo"]==1){
                $diffTime = $result["notifications"]["new"][$i]["MinutesAgo"]." minute ";
            } 
            else{
                $diffTime = $result["notifications"]["new"][$i]["MinutesAgo"]." minutes ";
            }
        }elseif ($result["notifications"]["new"][$i]["DaysAgo"]==1){
            $diffTime = $result["notifications"]["new"][$i]["DaysAgo"]." day ";
        }else{
            $diffTime = $result["notifications"]["new"][$i]["DaysAgo"]." days ";
        }
        $result["notifications"]["new"][$i]["diffTime"] = $diffTime;
    }
    for($i=0; $i<count($result["notifications"]["old"]); $i++){
        $result["notifications"]["old"][$i]["imgProfilo"] = UPLOAD_DIR . $result["notifications"]["old"][$i]["imgProfilo"];

        $diffTime="";
        if($result["notifications"]["old"][$i]["DaysAgo"]==0){
            if($result["notifications"]["old"][$i]["MinutesAgo"]==1){
                $diffTime = $result["notifications"]["old"][$i]["MinutesAgo"]." minute ";
            } 
            else{
                $diffTime = $result["notifications"]["old"][$i]["MinutesAgo"]." minutes ";
            }
        }elseif ($result["notifications"]["old"][$i]["DaysAgo"]==1){
            $diffTime = $result["notifications"]["old"][$i]["DaysAgo"]." day ";
        }else{
            $diffTime = $result["notifications"]["old"][$i]["DaysAgo"]." days ";
        }
        $result["notifications"]["old"][$i]["diffTime"] = $diffTime;
    }
}

//https://getbootstrap.com/docs/4.0/components/card/#header-and-footer
header('Content-Type: application/json');
echo json_encode($result);

?>