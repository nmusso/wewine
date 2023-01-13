<?php

function isActive($pagename){
    if(basename($_SERVER['PHP_SELF'])==$pagename){
        echo " class='active' ";
    }
}

function getIdFromName($name){
    return preg_replace("/[^a-z]/", '', strtolower($name));
}

function sec_session_start() {
    $session_name = 'sec_session_id'; // Imposta un nome di sessione
    $secure = false; // Imposta il parametro a true se vuoi usare il protocollo 'https'.
    $httponly = true; // Questo impedirà ad un javascript di essere in grado di accedere all'id di sessione.
    $cookieParams = session_get_cookie_params(); // Legge i parametri correnti relativi ai cookie.

    if(isset($_SESSION)) {
        if ($cookieParams["lifetime"] != 0) {
            setcookie(session_name(), session_id(), time() + $cookieParams["lifetime"]);
        } else {
            setcookie(session_name(), session_id(), $cookieParams["lifetime"]);
        }
    } else {
        ini_set('session.use_only_cookies', 1); // Forza la sessione ad utilizzare solo i cookie.
        session_name($session_name); // Imposta il nome di sessione con quello prescelto all'inizio della funzione.
        session_set_cookie_params(
            $cookieParams["lifetime"],
            $cookieParams['path'],
            $cookieParams['domain'],
            $secure,
            $httponly
        );
        session_regenerate_id(); // Rigenera la sessione e cancella quella creata in precedenza.
        session_start(); // Avvia la sessione php.
    }    
}


/*function isUserLoggedIn(){
    return !empty($_SESSION['user_id']);
}

function registerLoggedUser($user){
    $_SESSION["user_id"] = $user["user_id"];
    $_SESSION["username"] = $user["username"];
}*/

function getEmptyArticle(){
    return array("idarticolo" => "", "titoloarticolo" => "", "imgarticolo" => "", "testoarticolo" => "", "anteprimaarticolo" => "", "categorie" => array());
}

function getAction($action){
    $result = "";
    switch($action){
        case 1:
            $result = "Inserisci";
            break;
        case 2:
            $result = "Modifica";
            break;
        case 3:
            $result = "Cancella";
            break;
    }

    return $result;
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
        else{
            $result = 1;
            $msg = $fileName;
        }
    }
    return array($result, $msg);
}

?>