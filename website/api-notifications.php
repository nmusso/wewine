<?php
require_once 'bootstrap.php';

sec_session_start();
$result["islogged"] = false;

if ($dbh->login_check()){
    $result["islogged"] = true;

    $result["notifications"] = $dbh->getNotifications($_SESSION["user_id"]);
    // differenziare tra notifiche vecchie e nuove in base ad ultima lettura // create  notifica sia per segue che commento (obbligatorio)
    // aggiornare lettura notifiche ad ora  

    for($i=0; $i<count($result["notifications"]); $i++){
        $result["notifications"][$i]["imgProfilo"] = UPLOAD_DIR . $result["notifications"][$i]["imgProfilo"];

        if($result["notifications"][$i]["DaysAgo"]==0){
            if($result["notifications"][$i]["MinutesAgo"]==1){
                $result["notifications"][$i]["diffTime"] = $result["notifications"][$i]["MinutesAgo"]." minute ";
            } 
            else{
                $result["notifications"][$i]["diffTime"] = $result["notifications"][$i]["MinutesAgo"]." minutes ";
            }
        }elseif ($result["notifications"][$i]["DaysAgo"]==1){
            $result["notifications"][$i]["diffTime"] = $result["notifications"][$i]["DaysAgo"]." day ";
        }else{
            $result["notifications"][$i]["diffTime"] = $result["notifications"][$i]["DaysAgo"]." days ";
        }
    }
}

//https://getbootstrap.com/docs/4.0/components/card/#header-and-footer
header('Content-Type: application/json');
echo json_encode($result);

?>