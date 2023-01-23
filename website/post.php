<?php 
require_once 'bootstrap.php';
sec_session_start();

$templateParams["js"] = array(  "https://unpkg.com/axios/dist/axios.min.js",   
                                "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
                                "https://kit.fontawesome.com/7dda2fa6a2.js",
                                "js/post.js",
                                "js/bootstrap.js",
                                "js/interactions.js",
                                "js/functions.js");

$_SESSION["watchedPost"] = $_GET["post"] ?? null;
$_SESSION["actionType"] = $_GET["type"] ?? null;

require 'template/base.php';
?>