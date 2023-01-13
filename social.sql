-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Gen 13, 2023 alle 20:41
-- Versione del server: 10.4.27-MariaDB
-- Versione PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `commento`
--

CREATE TABLE `commento` (
  `idPost` int(11) NOT NULL,
  `idUtente` int(11) NOT NULL,
  `testo` varchar(280) NOT NULL,
  `dataOra` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `like`
--

CREATE TABLE `like` (
  `idPost` int(11) NOT NULL,
  `idUtente` int(11) NOT NULL,
  `dataOra` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `login_attempts`
--

CREATE TABLE `login_attempts` (
  `user_id` int(11) NOT NULL,
  `time` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `login_attempts`
--

INSERT INTO `login_attempts` (`user_id`, `time`) VALUES
(3, '1671919467'),
(3, '1671919471'),
(4, '1671919512'),
(5, '1671919684'),
(4, '1671920258'),
(7, '1671920265'),
(9, '1672244503'),
(9, '1672244506'),
(9, '1672244507'),
(9, '1672244507'),
(9, '1672244507'),
(9, '1672244515'),
(10, '1672244918'),
(2, '1672244951'),
(2, '1672245175'),
(9, '1672612589'),
(9, '1672612591'),
(9, '1672612597'),
(9, '1672612598'),
(9, '1672612620');

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE `post` (
  `idPost` int(11) NOT NULL,
  `testo` varchar(280) NOT NULL,
  `immagine` varchar(45) DEFAULT NULL,
  `dataOra` datetime NOT NULL,
  `idUtente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `post`
--

INSERT INTO `post` (`idPost`, `testo`, `immagine`, `dataOra`, `idUtente`) VALUES
(3, 'regw', '9_1.jpeg', '2023-01-06 20:14:43', 9),
(4, 'ciao sono musso', '16_1.jpeg', '2023-01-06 20:34:43', 16),
(5, 'Ciao sono ciro', 'empty.png', '2023-01-06 20:35:12', 18),
(6, 'Ciao sono ancora ciro', 'empty.png', '2023-01-06 20:35:24', 18),
(7, 'no foto sono io', '33_1.png', '2023-01-05 20:46:47', 33),
(8, 'sono io loris', '33_2.png', '2023-01-06 21:23:26', 33);

-- --------------------------------------------------------

--
-- Struttura della tabella `segue`
--

CREATE TABLE `segue` (
  `idFollowed` int(11) NOT NULL,
  `idFollower` int(11) NOT NULL,
  `dataOra` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `segue`
--

INSERT INTO `segue` (`idFollowed`, `idFollower`, `dataOra`) VALUES
(16, 9, '2023-01-06 20:00:00'),
(33, 9, '2023-01-06 20:57:05');

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(128) NOT NULL,
  `salt` char(128) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `cognome` varchar(45) NOT NULL,
  `dataNascita` date NOT NULL,
  `bio` varchar(280) NOT NULL,
  `imgProfilo` varchar(45) NOT NULL,
  `ultimaLetturaNotifiche` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`id`, `username`, `email`, `password`, `salt`, `nome`, `cognome`, `dataNascita`, `bio`, `imgProfilo`, `ultimaLetturaNotifiche`) VALUES
(2, 'test_user', 'test@example.com', '00807432eae173f652f2064bdca1b61b290b52d40e429a7d295d76a71084aa96c0233b82f1feac45529e0726559645acaed6f3ae58a286b9f075916ebf66cacc', 'f9aab579fc1b41ed0c44fe4ecdbfcdb4cb99b9023abb241a6db833288f4eea3c02f76e0d35204a8695077dcf81932aa59006423976224be0390395bae152d4ef', 'Test', 'User', '2000-12-24', 'Ciao sono test', '2_propic.png', NULL),
(9, 'aleciro', 'aleciro@gmail.com', '499bacb2450b13d24cef2b926fc7ce51f81ffa00b342f87325a68856469724e29fe7eb564929153f9c7afb6815f9cb78433ad5c86e1b5897883d42611fa20a06', 'd47a84a9184db566c002aeadacf56da499c23c7d0bf0772065141ec12bf7573050b899da89c2c501b7a254fc82694f20bdab86625371a9e13ea7b377a1d61c88', 'Ale', 'Ciro', '2000-12-12', 'Ciao', '9_propic.jpg', '2022-12-24 23:19:19'),
(16, 'musso', 'musso', '667f3e0cdc089491d88c7cd9c889b39dd199cf921933f5ac186ef5df39659fb041acea3e5a95a0eb18d6f50bcb4ba52f0cee3cec4772ef76aad13fcf1044cdba', '7f77125a9f87f77a75f566146d4cc671529de674abfa2b8659cde21b3d49a673395b8f4a545210414d3cb6bfb9152e4f35a4b808fee3dd87387fcf19acf7b011', 'musso', 'musso', '2010-10-10', 'musso', '16_propic.png', '2022-12-30 23:58:33'),
(18, 'ciro', 'ciro', 'fbc62c7d8816a07249b958e18943a58de4be39be90d35c76fdd99deebc64055ba903807ad3a25689831eb33fb675015a6bab7eb1f3c3ae47515771b1eb568cdd', '1f339e6ce12ba17eb470c362109cb9cc2f97ca2469bd634556e504b6a66f4acea214825e103638acff62c4cfd28e2a4d28e000b6231300a899b4bd26762579f9', 'ciro', 'ciro', '2010-10-10', 'ciro', '18_propic.png', '2022-12-31 00:02:06'),
(33, 'nofoto', 'nofoto', '61491d42bc109a88e36af2f83caf8967745e247633287be060886e1f3779698ef5d558848e2fdc6c31bc02c00d6f28eda752b8f30a6615aa38e6a561ec74278b', '10e283cfef74d11ee1b82a66fbc995700da93276e966506217ef352e6eadcc65037784a306b602603495ea06ecc0019f2070f904db4acb5772a03056c1cdca8c', 'nofoto', 'nofoto', '2010-10-10', 'nofoto', 'empty.png', '2022-12-31 00:33:52'),
(34, 'sifoto', 'sifoto', 'fea9fcb4a5a645dc4b1521a7846319f15398573f5d85f3eeba30a1c9d9fc95f5965bed0588d36df924399734c7b62580924938b573e76539a7b587659e4bca55', 'e66ce81a9560f8c92607ccb624bd902dac4d5b0a244c5a5c816231102e2af961eabf23847756ab3a527fe7eb6cabb740f9dc7ca5349e8a0474c9ab59619eee6f', 'sifoto', 'sifoto', '2010-10-10', 'sifoto', '34_propic.png', '2022-12-31 00:34:18'),
(35, 'musso1', 'musso1', '07f4792ee0605fd9b66b4ee030b1994099f8184ba568317f1118aa9dfabccf1b72654fe1ba10f88845ac7cfe2f6ccb508cf1c72a9b1c93668d60f22d81617309', 'b5484ef5a9466e58278f4269f127ef0cb5c588355e33ba581e192603c76e50afb63b2795de69bce456721ea8068b0381f950795f114d4449664e9d68035dba38', 'musso1', 'musso1', '2010-10-10', 'musso', '35_propic.png', '2023-01-02 21:47:05'),
(36, 'marti', 'fartifoca@gmail.foc', '224924c703c09e6d695a3c3923534a9d8edaad6f9595e4347c231ce4f890060a895a7a0a685e58fb3cf9e01ff1304dcd57fcb361d745b35f13be1ecef24cdd53', '8e585d111699414ca97db492748a14b3f260c09531e57f3808759167124050a3d6726c0786451929d9d939e59aa35ac6a739e76bf49400ba2a48207789d70893', 'marti', 'foca', '2023-01-03', 'Ciao sono una farti foca', '36_propic.jpg', '2023-01-04 20:45:24');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `commento`
--
ALTER TABLE `commento`
  ADD PRIMARY KEY (`idPost`,`idUtente`),
  ADD KEY `utente_2` (`idUtente`);

--
-- Indici per le tabelle `like`
--
ALTER TABLE `like`
  ADD PRIMARY KEY (`idPost`,`idUtente`),
  ADD KEY `utente_1` (`idUtente`);

--
-- Indici per le tabelle `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`idPost`),
  ADD KEY `utente` (`idUtente`);

--
-- Indici per le tabelle `segue`
--
ALTER TABLE `segue`
  ADD PRIMARY KEY (`idFollowed`,`idFollower`),
  ADD KEY `utente_4` (`idFollower`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `post`
--
ALTER TABLE `post`
  MODIFY `idPost` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `commento`
--
ALTER TABLE `commento`
  ADD CONSTRAINT `post_1` FOREIGN KEY (`idPost`) REFERENCES `post` (`idPost`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `utente_2` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `post` FOREIGN KEY (`idPost`) REFERENCES `post` (`idPost`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `utente_1` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `utente` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `segue`
--
ALTER TABLE `segue`
  ADD CONSTRAINT `utente_3` FOREIGN KEY (`idFollowed`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `utente_4` FOREIGN KEY (`idFollower`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
