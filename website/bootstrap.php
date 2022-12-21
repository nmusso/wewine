<?php
session_start();
define("UPLOAD_DIR", "./upload/");
require_once("utils/functions.php");
require_once("db/database.php");
$dbh = new DatabaseHelper("sql7.freesqldatabase.com", "sql7584954", "NC9dpNir5Y", "sql7584954", 3306);
?>