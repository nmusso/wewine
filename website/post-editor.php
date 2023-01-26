<?php 
require_once 'bootstrap.php';

$templateParams["js"] = array(  "https://unpkg.com/axios/dist/axios.min.js",   
                                "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
                                "https://kit.fontawesome.com/7dda2fa6a2.js",
                                "https://unpkg.com/html5-qrcode@2.0.9/dist/html5-qrcode.min.js",
                                "js/post-editor.js",
                                "js/bootstrap.js");

require 'template/base.php';
?>