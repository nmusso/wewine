<?php 

require_once 'bootstrap.php';
sec_session_start();

$result["islogged"] = false;

if($dbh->login_check()){
    $result["islogged"] = true;
    $result["getPost"] = false;

    if (isset($_SESSION["watchedPost"])) {
        $result["postInfo"] = $dbh->getPostById($_SESSION["watchedPost"]);
        $result["getPost"] = true;

        $diffTime="";
        if($result["postInfo"][0]["DaysAgo"]==0){
            if($result["postInfo"][0]["MinutesAgo"]==1){
                $diffTime = $result["postInfo"][0]["MinutesAgo"]." minute ";
            } 
            else{
                $diffTime = $result["postInfo"][0]["MinutesAgo"]." minutes ";
            }
        }elseif ($result["postInfo"][0]["DaysAgo"]==1){
            $diffTime = $result["postInfo"][0]["DaysAgo"]." day ";
        }else{
            $diffTime = $result["postInfo"][0]["DaysAgo"]." days ";
        }
        $result["postInfo"][0]["diffTime"] = $diffTime;

        $result["postInfo"][0]["imgProfilo"] = UPLOAD_DIR . $result["postInfo"][0]["imgProfilo"];

        if (isset($result["postInfo"][0]["immagine"])) {
            $result["postInfo"][0]["immagine"] = UPLOAD_DIR . $result["postInfo"][0]["immagine"];
        }
    }
}

header('Content-Type: application/json');
echo json_encode($result);

?>