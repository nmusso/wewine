<?php
require_once 'bootstrap.php';

sec_session_start();
$result["islogged"] = false;

if ($dbh->login_check()){
    $result["islogged"] = true;

    $notificationsType = array("newFollow", "newComment", "newLike");

    $result["notifications"] = $dbh->getNewNotifications($_SESSION["user_id"]);
    if(!isset($_POST["filter"])){
        $result["notifications"] = $result["notifications"] + $dbh->getOldNotifications($_SESSION["user_id"]);
        $notificationsType = array("newFollow", "newComment", "newLike", "oldFollow", "oldComment", "oldLike");
    }
     
    // DISABLED FOR TEST
    //$dbh->updateLastNotificationsRead($_SESSION["user_id"]);

    $result["allnotifications"] = array();
    foreach($notificationsType as $type){
        foreach($result["notifications"][$type]  as &$n){
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

            $n["type"] = $type;

            if($type==$notificationsType[0] || (!isset($_POST["filter"]) && $type==$notificationsType[3])){
                $n["text"] = "Started following you.";
            }elseif($type==$notificationsType[1] || (!isset($_POST["filter"]) && $type==$notificationsType[4])){
                $n["text"] = "Commented your post.";
            }elseif($type==$notificationsType[2] || (!isset($_POST["filter"]) && $type==$notificationsType[5])){
                $n["text"] = "Liked your post.";
            }
        }
        $result["allnotifications"] = array_merge($result["allnotifications"], $result["notifications"][$type] );
    }

    $key_values = array_column($result["allnotifications"] , 'dataOra'); 
    array_multisort($key_values, SORT_DESC, $result["allnotifications"] );
}

//TODO eliminare result["notifications"]

header('Content-Type: application/json');
echo json_encode($result);

?>