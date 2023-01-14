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

    foreach($result["notifications"] as  &$age){ // new/old
        foreach($age as &$type){ // newFollow/newComment/newLike 
            foreach($type as &$n){ //elementi
                    $n["imgProfilo"] = UPLOAD_DIR . $n["imgProfilo"];

                    $diffTime="";
                    if($n["DaysAgo"]==0){
                        if($n["MinutesAgo"]==1){
                            $diffTime = $n["MinutesAgo"]." minute ";
                        } 
                        else{
                            $diffTime = $n["MinutesAgo"]." minutes ";
                        }
                    }elseif ($n["DaysAgo"]==1){
                        $diffTime = $n["DaysAgo"]." day ";
                    }else{
                        $diffTime = $n["DaysAgo"]." days ";
                    }
                    $n["diffTime"] = $diffTime;
            }
        }
    }
}

//https://getbootstrap.com/docs/4.0/components/card/#header-and-footer
header('Content-Type: application/json');
echo json_encode($result);

?>