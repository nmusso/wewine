<?php 
require_once 'bootstrap.php';

if($_GET["profile"]==0){
    $templateParams["js"] = array(  "https://unpkg.com/axios/dist/axios.min.js",   
                                    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
                                    "https://kit.fontawesome.com/7dda2fa6a2.js",
                                    "js/myprofile.js",
                                    "js/bootstrap.js");
}
else{
    array(  "https://unpkg.com/axios/dist/axios.min.js",   
                                    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
                                    "https://kit.fontawesome.com/7dda2fa6a2.js",
                                    "js/profile.js",
                                    "js/bootstrap.js");
}
/*
per gli altri utenti andrà messo il loro id nel campo class="" del tag <a> 
    - da javascrit quando verrà fatto il redirect nel valore del get metterà il valore del campo messso nel tag
    - Caso speciale: uno clicca un proprio post nel proprio feed
        - da php dovremmo fare controllo id==$_SESSION[id] e in quel caso mettere =0
*/

require 'template/base.php';
?>
