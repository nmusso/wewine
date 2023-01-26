<?php
session_start();
define("UPLOAD_DIR", "./upload/");
require_once("utils/functions.php");
require_once("db/database.php");

$dbh = new DatabaseHelper("localhost", "sec_user", "f&4@YXuC9$5C^nLQ", "social", 3306);

?>