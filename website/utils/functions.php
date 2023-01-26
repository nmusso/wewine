<?php

function sec_session_start() {
    $session_name = 'sec_session_id'; 
    $secure = false; 
    $httponly = true;
    $cookieParams = session_get_cookie_params(); 

    if(isset($_SESSION)) {
        if ($cookieParams["lifetime"] != 0) {
            setcookie(session_name(), session_id(), time() + $cookieParams["lifetime"]);
        } else {
            setcookie(session_name(), session_id(), $cookieParams["lifetime"]);
        }
    } else {
        ini_set('session.use_only_cookies', 1); 
        session_name($session_name); 
        session_set_cookie_params(
            $cookieParams["lifetime"],
            $cookieParams['path'],
            $cookieParams['domain'],
            $secure,
            $httponly
        );
        session_regenerate_id(); 
        session_start(); 
    }    
}

function uploadImage($dbh, $path, $image, $id, $isPost){
    $fileName = $id."_";
    if ($isPost) {
        $nextId = $dbh->nextPostId($id);
        $fileName = $fileName . $nextId;
    } else {
        $fileName = $fileName . "propic";
    }
    
    $maxKB = 4000;
    $acceptedExtensions = array("jpg", "jpeg", "png", "gif");
    $result = 0;
    $msg = "";
    //Controllo se immagine è veramente un'immagine
    $imageSize = getimagesize($image["tmp_name"]);
    if($imageSize === false) {
        $msg .= "The uploaded file is not an image! ";
    }
    //Controllo dimensione dell'immagine < 4MB
    if ($image["size"] > $maxKB * 1024) {
        $msg .= "The size of the uploaded file is over $maxKB KB. ";
    }

    //Controllo estensione del file
    $imageFileType = strtolower(pathinfo(basename($image["name"]),PATHINFO_EXTENSION));
    if(!in_array($imageFileType, $acceptedExtensions)){
        $msg .= "Accepted only the following extensions: ".implode(",", $acceptedExtensions);
    } else {
        $fileName = $fileName . "." . $imageFileType;
    }

    //Se non ci sono errori, sposto il file dalla posizione temporanea alla cartella di destinazione
    if(strlen($msg)==0){
        if(!move_uploaded_file($image["tmp_name"], $path.$fileName)){
            $msg.= "Error while uploading the image.";
        }
        else {
            $result = 1;
            $msg = $fileName;
        }
    }
    return array($result, $msg);
}

?>