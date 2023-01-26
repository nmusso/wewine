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
    public function insertUser($username, $email, $password, $salt, $nome, $cognome, $dataNascita, $tipo, $indirizzo, $bio, $imgProfilo)
    {
        $query = "INSERT INTO utente(username, email, password, salt, nome, cognome, dataNascita, tipo, indirizzo, bio, imgProfilo, ultimaLetturaNotifiche) VALUES(?,?,?,?,?,?,?,?,?,?,?, NOW())";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('sssssssssss', $username, $email, $password, $salt, $nome, $cognome, $dataNascita, $tipo, $indirizzo, $bio, $imgProfilo);
        $stmt->execute();

        return $stmt->insert_id;
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

    public function deleteUser($id) {
        $query = "DELETE FROM utente WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->affected_rows;
        
        return $result>0;
    }

    public function getUserInfo($id){
        $query = "SELECT u.id, u.username, u.nome, u.cognome, u.imgProfilo, u.bio, u.tipo, u.indirizzo, u.dataNascita, u.email, COUNT(p.idPost) as nPosts
        FROM post AS p
        JOIN utente AS u ON p.idUtente = u.id
        WHERE u.id = ?
        ORDER BY p.dataOra DESC
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $res["userInfo"] = $result->fetch_all(MYSQLI_ASSOC);

        $query = "SELECT COUNT(s.idFollower) as Followed
        FROM utente AS u 
        JOIN segue AS s ON s.idFollower = u.id
        WHERE u.id = ?
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $res["followed"] = $result->fetch_all(MYSQLI_ASSOC);

        $query = "SELECT COUNT(s.idFollowed) as Follower
        FROM utente AS u 
        JOIN segue AS s ON s.idFollowed = u.id
        WHERE u.id = ?
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $res["follower"] = $result->fetch_all(MYSQLI_ASSOC);

        $query = "SELECT COUNT(s.idFollowed) as isFollowing
        FROM segue AS s
        WHERE s.idFollowed = ?
        AND s.idFollower = ?
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $id, $_SESSION["user_id"]);
        $stmt->execute();
        $result = $stmt->get_result();
        $res["isFollowing"] = $result->fetch_all(MYSQLI_ASSOC);

        return $res;
    }

    public function getUsersByName($value){
        $query = "SELECT id, username, imgProfilo FROM utente WHERE username LIKE CONCAT ('%', ?, '%') ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('s',$value);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function deletePost($id) {
        $query = "DELETE FROM post WHERE idPost = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->affected_rows;
        
        return $result>0;
    }

    public function getFeed($id, $num){
        $query = "SELECT u.id, u.username, u.imgProfilo, s.*, p.*, DATEDIFF(NOW(),p.dataOra) as DaysAgo, TIMESTAMPDIFF(MINUTE,p.dataOra,NOW()) as MinutesAgo, l.dataOra as liked, COUNT(l2.dataOra) AS numLike
        FROM segue AS s
        JOIN post AS p ON s.idFollowed = p.idUtente
        JOIN utente AS u ON p.idUtente = u.id
        LEFT JOIN `like` AS l ON p.idPost = l.idPost AND l.idUtente = ?
        LEFT JOIN `like` AS l2 ON p.idPost = l2.idPost
        WHERE s.idFollower = ?
        GROUP BY p.idPost
        ORDER BY p.dataOra DESC
        LIMIT ?, 5
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('iii', $id, $id, $num);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostsByProfileId($id){
        $query = "SELECT u.id, u.username, u.imgProfilo, p.*, DATEDIFF(NOW(),p.dataOra) as DaysAgo, TIMESTAMPDIFF(MINUTE,p.dataOra,NOW()) as MinutesAgo, l.dataOra as liked, COUNT(l2.dataOra) as numLike
        FROM post AS p
        JOIN utente AS u ON p.idUtente = u.id
        LEFT JOIN `like` AS l ON p.idPost = l.idPost AND l.idUtente = ?
        LEFT JOIN `like` AS l2 ON p.idPost = l2.idPost
        WHERE u.id = ?
        GROUP BY p.idPost
        ORDER BY p.dataOra DESC
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $id, $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getPostById($id){
        $query = "SELECT u.id, u.username, u.imgProfilo, p.*, DATEDIFF(NOW(),p.dataOra) as DaysAgo, TIMESTAMPDIFF(MINUTE,p.dataOra,NOW()) as MinutesAgo, l.dataOra as liked, COUNT(l2.dataOra) as numLike
        FROM post AS p
        JOIN utente AS u ON p.idUtente = u.id
        LEFT JOIN `like` AS l ON p.idPost = l.idPost AND l.idUtente = ?
        LEFT JOIN `like` AS l2 ON p.idPost = l2.idPost
        WHERE p.idPost = ?
        GROUP BY p.idPost
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $_SESSION["user_id"], $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getLikesForPost($id){
        $query = "SELECT u.id, u.username, u.imgProfilo
        FROM `like` AS l
        JOIN post AS p ON p.idPost = l.idPost
        JOIN utente AS u ON l.idUtente = u.id
        WHERE l.idPost = ? 
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getFollowInfo($id){
        $query = "SELECT COUNT(s.idFollower) as Followed
        FROM utente AS u 
        JOIN segue AS s ON s.idFollower = u.id
        WHERE u.id = ?
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        $res[0] = $result->fetch_all(MYSQLI_ASSOC);

        $query = "SELECT COUNT(s.idFollowed) as Follower
        FROM utente AS u 
        JOIN segue AS s ON s.idFollowed = u.id
        WHERE u.id = ?
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        $res[1] = $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getFollowers($id) {
        $query = "SELECT u.id, u.username, u.imgProfilo 
        FROM segue AS s
        JOIN utente AS u ON s.idFollower = u.id
        WHERE idFollowed = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getFollowed($id) {
        $query = "SELECT u.id, u.username, u.imgProfilo 
        FROM segue AS s
        JOIN utente AS u ON s.idFollowed = u.id
        WHERE idFollower = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function setUserFollow($idFollowed, $idFollower){
        $query = "INSERT INTO segue VALUES ( ? , ? , NOW() );";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$idFollowed, $idFollower);
        $result = $stmt->execute();

        return $result;
    }

    public function setUserUnfollow($idFollowed, $idFollower){
        $query = "DELETE FROM segue WHERE idFollowed = ? AND idFollower = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$idFollowed, $idFollower);
        $stmt->execute();
        $result = $stmt->affected_rows;
        
        return $result;
    }

    public function getLikeState($idPost){
        $query = "SELECT COUNT(idPost) AS liked 
        FROM `like` 
        WHERE idUtente= ? AND idPost= ? ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$_SESSION["user_id"], $idPost);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insertLike($idPost){
        $query = "INSERT INTO `like` VALUES ( ? , ? , NOW() );";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$idPost, $_SESSION["user_id"]);
        $result = $stmt->execute();

        return $result;
    }

    public function removeLike($idPost){
        $query = "DELETE FROM `like` WHERE idPost= ? AND idUtente= ? ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii',$idPost, $_SESSION["user_id"]);
        $result = $stmt->execute();

        return $result;
    }

    public function getComments($id) {
        $query = "SELECT c.testo, u.imgProfilo, u.id, u.username
        FROM commento AS c
        JOIN utente AS u ON u.id = c.idUtente 
        WHERE idPost = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function insertComment($idPost, $text){
        $query = "INSERT INTO commento (idPost, idUtente, testo, dataOra) VALUES (?, ?, ?, NOW()) ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('iis', $idPost, $_SESSION["user_id"], $text);
        $result = $stmt->execute();

        return $result;
    }

    public function getNewNotifications($id){
        // new followers
        $query = "SELECT u2.id, u2.username, u2.imgProfilo, s.dataOra, DATEDIFF(NOW(),s.dataOra) as DaysAgo, TIMESTAMPDIFF(MINUTE,s.dataOra,NOW()) as MinutesAgo
        FROM segue AS s
        JOIN utente AS u1 ON s.idFollowed = u1.id
        JOIN utente AS u2 ON s.idFollower = u2.id
        WHERE idFollowed = ?
        AND u1.ultimaLetturaNotifiche <= s.dataOra 
        ORDER BY s.dataOra DESC  ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$id);
        $stmt->execute();
        $result = $stmt->get_result();
        $res["newFollow"] = $result->fetch_all(MYSQLI_ASSOC);

        // new comments
        $query = "SELECT p.idPost, u1.username, u1.imgProfilo, u1.id, c.dataOra, DATEDIFF(NOW(),c.dataOra) as DaysAgo, TIMESTAMPDIFF(MINUTE,c.dataOra,NOW()) as MinutesAgo
        FROM post AS p
        JOIN commento AS c ON p.idPost = c.idPost
        JOIN utente AS u1 ON c.idUtente = u1.id
        JOIN utente AS u2 ON p.idUtente = u2.id
        WHERE p.idUtente = ? AND c.idUtente != ?
        AND u2.ultimaLetturaNotifiche <= c.dataOra 
        ORDER BY c.dataOra DESC ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $id, $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $res["newComment"] = $result->fetch_all(MYSQLI_ASSOC);

        // new likes
        $query = "SELECT p.idPost, u1.username, u1.imgProfilo, u1.id, l.dataOra, DATEDIFF(NOW(),l.dataOra) as DaysAgo, TIMESTAMPDIFF(MINUTE,l.dataOra,NOW()) as MinutesAgo
        FROM post AS p
        JOIN `like` AS l ON p.idPost = l.idPost
        JOIN utente AS u1 ON l.idUtente = u1.id
        JOIN utente AS u2 ON p.idUtente = u2.id
        WHERE p.idUtente = ? AND l.idUtente != ?
        AND u2.ultimaLetturaNotifiche <= l.dataOra 
        ORDER BY l.dataOra DESC  ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $id, $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $res["newLike"] = $result->fetch_all(MYSQLI_ASSOC);

        return $res;
    }

    public function getOldNotifications($id){
        // per il Follow Nuove
        $query = "SELECT u2.id, u2.username, u2.imgProfilo, s.dataOra, DATEDIFF(NOW(),s.dataOra) as DaysAgo, TIMESTAMPDIFF(MINUTE,s.dataOra,NOW()) as MinutesAgo
        FROM segue AS s
        JOIN utente AS u1 ON s.idFollowed = u1.id
        JOIN utente AS u2 ON s.idFollower = u2.id
        WHERE idFollowed = ?
        AND u1.ultimaLetturaNotifiche > s.dataOra 
        ORDER BY s.dataOra DESC  ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$id);
        $stmt->execute();
        $result = $stmt->get_result();
        $res["oldFollow"] = $result->fetch_all(MYSQLI_ASSOC);

        // new comments
        $query = "SELECT p.idPost, u1.username, u1.imgProfilo, u1.id, c.dataOra, DATEDIFF(NOW(),c.dataOra) as DaysAgo, TIMESTAMPDIFF(MINUTE,c.dataOra,NOW()) as MinutesAgo
        FROM post AS p
        JOIN commento AS c ON p.idPost = c.idPost
        JOIN utente AS u1 ON c.idUtente = u1.id
        JOIN utente AS u2 ON p.idUtente = u2.id
        WHERE p.idUtente = ? AND c.idUtente != ?
        AND u2.ultimaLetturaNotifiche > c.dataOra 
        ORDER BY c.dataOra DESC ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $id, $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $res["oldComment"] = $result->fetch_all(MYSQLI_ASSOC);

        // new likes
        $query = "SELECT p.idPost, u1.username, u1.imgProfilo, l.dataOra, DATEDIFF(NOW(),l.dataOra) as DaysAgo, TIMESTAMPDIFF(MINUTE,l.dataOra,NOW()) as MinutesAgo
        FROM post AS p
        JOIN `like` AS l ON p.idPost = l.idPost
        JOIN utente AS u1 ON l.idUtente = u1.id
        JOIN utente AS u2 ON p.idUtente = u2.id
        WHERE p.idUtente = ? AND l.idUtente != ?
        AND u2.ultimaLetturaNotifiche > l.dataOra 
        ORDER BY l.dataOra DESC  ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ii', $id, $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $res["oldLike"] = $result->fetch_all(MYSQLI_ASSOC);

        return $res;
    }

    public function updateInfo($username, $email, $nome, $cognome, $dataNascita, $tipo, $indirizzo, $bio) {
        $query = "UPDATE utente
        SET username = ?,
        email = ?,
        nome = ?,
        cognome = ?,
        dataNascita = ?,
        tipo = ?,
        indirizzo = ?,
        bio = ?
        WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssssssssi', $username, $email, $nome, $cognome, $dataNascita, $tipo, $indirizzo, $bio, $_SESSION["user_id"]);
        $stmt->execute();
        $result = $stmt->affected_rows;
        
        return $result;
    }    
    
    public function updatePassword($password, $random_salt) {
        $user_browser = $_SERVER['HTTP_USER_AGENT'];
        $newPass = hash('sha512', $password . $random_salt);
        $_SESSION['login_string'] = hash('sha512', $newPass . $user_browser);

        $query = "UPDATE utente
        SET password = ?,
        salt = ?
        WHERE id = ?";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('ssi', $newPass, $random_salt, $_SESSION["user_id"]);
        $stmt->execute();
        $result = $stmt->affected_rows;
        
        return $result;
    }

    public function checkOldPassword($password) {
        $query = "SELECT password, salt
        FROM utente
        WHERE id = ?
        ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i', $_SESSION["user_id"]);
        $stmt->execute();
        $result = $stmt->get_result();

        $res = $result->fetch_all(MYSQLI_ASSOC)[0];
        $oldPass = hash('sha512', $password . $res["salt"]);

        return $oldPass == $res["password"];
    }

    public function updateLastNotificationsRead($id){
        $query = "UPDATE utente
        SET ultimaLetturaNotifiche = NOW()
        WHERE id = ? ";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('i',$id);
        $stmt->execute();
        $result = $stmt->affected_rows;
        
        return $result;
    }

    function addPost($id, $name, $origin, $barcode, $notes, $light, $dry, $flat, $soft, $balance, $valutation, $text, $photo)
    {
        $query = "INSERT INTO post(dataOra, idUtente, nome, origine, barcode, note, leggero, secco, piatto, morbido, 
                    bilanciamento, valutazione, testo, immagine) 
                    VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param('issssiiiisiss', $id, $name, $origin, $barcode, $notes, $light, $dry, $flat, $soft, $balance, $valutation, $text, $photo);
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
                    }
                }
            }
        }

        return false;
    }
}
?>