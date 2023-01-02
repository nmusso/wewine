<?php
class DatabaseHelper
{
    private $db;

    public function __construct($servername, $username, $password, $dbname, $port)
    {
        $this->db = new mysqli($servername, $username, $password, $dbname, $port);
        if ($this->db->connect_error) {
            die("Connection failed: " . $this->db->connect_error);
        }
    }
    public function insertUser($username, $email, $password, $salt, $nome, $cognome, $dataNascita, $bio, $imgProfilo)
    {
        $query = "INSERT INTO utente(username, email, password, salt, nome, cognome, dataNascita, bio, imgProfilo, ultimaLetturaNotifiche) VALUES(?,?,?,?,?,?,?,?,?, NOW())";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssssssss', $username, $email, $password, $salt, $nome, $cognome, $dataNascita, $bio, $imgProfilo);
        $stmt->execute();

        return $stmt->insert_id;
    }

    public function getUsersByName($value){
        $query = "SELECT username, imgProfilo FROM utente WHERE username LIKE CONCAT ('%', ?, '%') ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$value);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function checkLogin($username, $password)
    {
        $query = "SELECT idUtente FROM Utente WHERE username = ? AND password = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ss', $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function checkUniqueUser($username, $email)
    {
        if ($stmt = $this->db->prepare("SELECT username, email FROM utente WHERE username = ? OR email = ?")) {
            $stmt->bind_param('ss', $username, $email); // esegue il bind del parametro '$email'.
            $stmt->execute(); // esegue la query appena creata.
            $stmt->store_result();
            $stmt->fetch();

            return ($stmt->num_rows == 0);
        }

        return false;
    }

    function checkbrute($user_id)
    {
        // Recupero il timestamp
        $now = time();
        // Vengono analizzati tutti i tentativi di login a partire dalle ultime due ore.
        $valid_attempts = $now - (2 * 60 * 60);
        if ($stmt = $this->db->prepare("SELECT time FROM login_attempts WHERE user_id = ? AND time > '$valid_attempts'")) {
            $stmt->bind_param('i', $user_id);
            // Eseguo la query creata.
            $stmt->execute();
            $stmt->store_result();
            // Verifico l'esistenza di più di 5 tentativi di login falliti.
            if ($stmt->num_rows > 5) {
                return true;
            } else {
                return false;
            }
        }
    }

    function login($username, $password)
    {
        // Usando statement sql 'prepared' non sarà possibile attuare un attacco di tipo SQL injection.
        if ($stmt = $this->db->prepare("SELECT id, username, password, salt FROM utente WHERE username = ? LIMIT 1")) {
            $stmt->bind_param('s', $username); // esegue il bind del parametro '$email'.
            $stmt->execute(); // esegue la query appena creata.
            $stmt->store_result();
            $stmt->bind_result($user_id, $username, $db_password, $salt); // recupera il risultato della query e lo memorizza nelle relative variabili.
            $stmt->fetch();
            $password = hash('sha512', $password . $salt); // codifica la password usando una chiave univoca.
            if ($stmt->num_rows == 1) { // se l'utente esiste
                // verifichiamo che non sia disabilitato in seguito all'esecuzione di troppi tentativi di accesso errati.
                if ($this->checkbrute($user_id) == true) {
                    // Account disabilitato
                    // Invia un e-mail all'utente avvisandolo che il suo account è stato disabilitato.
                    return false;
                } else {
                    if ($db_password == $password) { // Verifica che la password memorizzata nel database corrisponda alla password fornita dall'utente.
                        // Password corretta!            
                        $user_browser = $_SERVER['HTTP_USER_AGENT']; // Recupero il parametro 'user-agent' relativo all'utente corrente.

                        $user_id = preg_replace("/[^0-9]+/", "", $user_id); // ci proteggiamo da un attacco XSS
                        $_SESSION['user_id'] = $user_id;
                        $username = preg_replace("/[^a-zA-Z0-9_\-]+/", "", $username); // ci proteggiamo da un attacco XSS
                        $_SESSION['username'] = $username;
                        $_SESSION['login_string'] = hash('sha512', $password . $user_browser);
                        // Login eseguito con successo.
                        return true;
                    } else {
                        // Password incorretta.
                        // Registriamo il tentativo fallito nel database.
                        $now = time();
                        $this->db->query("INSERT INTO login_attempts (user_id, time) VALUES ('$user_id', '$now')");
                        return false;
                    }
                }
            } else {
                // L'utente inserito non esiste.
                return false;
            }
        }
    }

    function login_check()
    {
        // Verifica che tutte le variabili di sessione siano impostate correttamente
        if (isset($_SESSION['user_id'], $_SESSION['username'], $_SESSION['login_string'])) {
            $user_id = $_SESSION['user_id'];
            $login_string = $_SESSION['login_string'];
            $username = $_SESSION['username'];
            $user_browser = $_SERVER['HTTP_USER_AGENT']; // reperisce la stringa 'user-agent' dell'utente.
            if ($stmt = $this->db->prepare("SELECT password FROM utente WHERE id = ? LIMIT 1")) {
                $stmt->bind_param('i', $user_id); // esegue il bind del parametro '$user_id'.
                $stmt->execute(); // Esegue la query creata.
                $stmt->store_result();

                if ($stmt->num_rows == 1) { // se l'utente esiste
                    $stmt->bind_result($password); // recupera le variabili dal risultato ottenuto.
                    $stmt->fetch();
                    $login_check = hash('sha512', $password . $user_browser);
                    if ($login_check == $login_string) {
                        // Login eseguito!!!!
                        return true;
                    } else {
                        //  Login non eseguito
                        return false;
                    }
                } else {
                    // Login non eseguito
                    return false;
                }
            } else {
                // Login non eseguito
                return false;
            }
        } else {
            // Login non eseguito
            return false;
        }
    }

    function addPost($id, $text, $photo)
    {
        $query = "INSERT INTO post(testo, immagine, dataOra, idUtente) VALUES (?,?,NOW(),?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sss', $text, $photo, $id);
        $stmt->execute();

        return $stmt->insert_id;
    }

    function nextPostId($id)
    {
        $query = "SELECT immagine FROM post WHERE immagine IS NOT NULL AND idUtente = ? ORDER BY dataOra DESC LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        if (count($result) > 0) {
            $result = $result[0];
            $imgName = $result["immagine"];
            $id = str_replace($id . "_", "", $imgName);
            return intval($id) + 1;
        } else {
            return 1;
        }    
    }

    function getIdByUsername($username) {
        $query = "SELECT id FROM utente WHERE username = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC)[0];

        return $result["id"];
    }

    function addProfilePath($id, $path) {
        $query = "UPDATE utente SET imgProfilo = ? WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('si', $path, $id);
        $stmt->execute();

        return $stmt->insert_id;
    }
}
?>