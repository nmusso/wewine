<?php
require_once 'bootstrap.php';
sec_session_start(); // usiamo la nostra funzione per avviare una sessione php sicura
$result["logindone"] = false;

if (isset($_POST['username'], $_POST['password'])) {
    $user = $_POST['username'];
    $password = $_POST['password']; // Recupero la password criptata.
    if ($dbh->login($user, $password) == true) {
        $result["logindone"] = true;
    } else {
        //Login fallito
        $result["errorelogin"] = "Username e/o password errati";
    }
} else {
    // Le variabili corrette non sono state inviate a questa pagina dal metodo POST.
    $result["errorelogin"] = 'Invalid Request';
}

header('Content-Type: application/json');
echo json_encode($result);

?>