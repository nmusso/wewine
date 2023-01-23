<?php
function checkNoEmpty()
{
   return ($_POST['username'] != "" &&
      $_POST['password'] != "" &&
      $_POST['nome'] != "" &&
      $_POST['cognome'] != "" &&
      $_POST['dataNascita'] != "" &&
      $_POST['bio'] != "" &&
      $_POST['email'] != "");
}

require_once '../bootstrap.php';
$result["registerOK"] = false;

if (checkNoEmpty()) {
   // Recupero i dati dal form di inserimento.
   $username = $_POST['username'];
   $password = $_POST['password'];
   $nome = $_POST['nome'];
   $cognome = $_POST['cognome'];
   $dataNascita = $_POST['dataNascita'];
   $bio = $_POST['bio'];
   $email = $_POST['email'];
   
   // Crea una chiave casuale
   $random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
   // Crea una password usando la chiave appena creata.
   $password = hash('sha512', $password . $random_salt);
   // Inserisci a questo punto il codice SQL per eseguire la INSERT nel tuo database
   // Assicurati di usare statement SQL 'prepared'.
   $checkFields = $dbh->checkUniqueUser($username, $email);

   if ($checkFields != false) {
      $res = $dbh->insertUser($username, $email, $password, $random_salt, $nome, $cognome, $dataNascita, $bio, "empty.png");
      if ($res != false && isset($_FILES["imgProfilo"])) {
         $id = $dbh->getIdByUsername($username);
         list($checkImage, $msg) = uploadImage($dbh, UPLOAD_DIR, $_FILES["imgProfilo"], $id, false);
         if ($checkImage != false) {
            $res = $dbh->addProfilePath($id, $msg);
            $result["registerOK"] = true;
         } else {
            $dbh->deleteUser($id);
            $result["errorRegister"] = $msg;
         }
      } else if ($res != false) {
         $result["registerOK"] = true;
      } else {
         $result["errorRegister"] = "Registration went wrong. Check all the fields and retry.";
      }
   } else {
      $result["errorRegister"] = "An account with this username or email already exists. Please login.";
   }
} else {
   $result["errorRegister"] = "All the fields are required. Please check again.";
}

header('Content-Type: application/json');
echo json_encode($result);
?>