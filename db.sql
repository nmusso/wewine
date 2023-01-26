-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Gen 26, 2023 alle 22:14
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
  `idCommento` int(11) NOT NULL,
  `idPost` int(11) NOT NULL,
  `idUtente` int(11) NOT NULL,
  `testo` varchar(280) NOT NULL,
  `dataOra` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `commento`
--

INSERT INTO `commento` (`idCommento`, `idPost`, `idUtente`, `testo`, `dataOra`) VALUES
(17, 25, 49, 'mi è piaciuto molto', '2023-01-24 23:37:25'),
(18, 20, 47, 'Confermo molto buono', '2023-01-25 19:35:40'),
(19, 35, 51, 'davvero un ottimo vino', '2023-01-26 22:00:11'),
(20, 18, 51, 'Vorrei provarlo anche io!!', '2023-01-26 22:00:30'),
(21, 20, 51, 'Ottima scelta!!', '2023-01-26 22:00:45'),
(22, 25, 42, 'Che aperitivo!!!', '2023-01-26 22:02:23'),
(23, 24, 42, 'Ottima scelta', '2023-01-26 22:02:33'),
(24, 23, 42, 'Uno dei miei preferiti', '2023-01-26 22:02:47'),
(25, 21, 42, 'Delizia!', '2023-01-26 22:03:00'),
(26, 19, 42, 'Mi ricordo quando lo abbiamo assaggiato! Buonissimo!', '2023-01-26 22:03:17'),
(27, 23, 47, 'è anche il mio preferito!', '2023-01-26 22:05:03'),
(28, 25, 47, 'Ottima scelta!!', '2023-01-26 22:05:20'),
(29, 32, 42, 'Ottimo vino!', '2023-01-26 22:07:46'),
(30, 33, 42, 'Buonissimo!', '2023-01-26 22:07:53'),
(31, 26, 42, 'Davvero buono!', '2023-01-26 22:08:03');

-- --------------------------------------------------------

--
-- Struttura della tabella `like`
--

CREATE TABLE `like` (
  `idPost` int(11) NOT NULL,
  `idUtente` int(11) NOT NULL,
  `dataOra` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `like`
--

INSERT INTO `like` (`idPost`, `idUtente`, `dataOra`) VALUES
(18, 51, '2023-01-26 22:00:17'),
(19, 42, '2023-01-26 22:03:02'),
(19, 49, '2023-01-24 23:40:53'),
(20, 51, '2023-01-26 22:00:15'),
(21, 42, '2023-01-26 22:02:53'),
(22, 42, '2023-01-26 22:02:50'),
(23, 42, '2023-01-26 22:02:38'),
(23, 49, '2023-01-24 23:40:48'),
(24, 42, '2023-01-26 22:02:34'),
(24, 47, '2023-01-26 22:04:44'),
(24, 49, '2023-01-24 23:40:45'),
(25, 42, '2023-01-26 22:02:04'),
(25, 47, '2023-01-26 22:04:42'),
(25, 49, '2023-01-24 23:37:14'),
(26, 42, '2023-01-26 22:07:37'),
(26, 51, '2023-01-24 23:42:35'),
(32, 42, '2023-01-26 22:07:34'),
(33, 42, '2023-01-26 22:07:33'),
(34, 51, '2023-01-26 22:00:13'),
(35, 51, '2023-01-26 22:00:01');

-- --------------------------------------------------------

--
-- Struttura della tabella `login_attempts`
--

CREATE TABLE `login_attempts` (
  `user_id` int(11) NOT NULL,
  `time` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dump dei dati per la tabella `login_attempts`
--

INSERT INTO `login_attempts` (`user_id`, `time`) VALUES
(42, '1674598264'),
(42, '1674598268'),
(43, '1674599569'),
(43, '1674599582'),
(43, '1674599583'),
(43, '1674599594'),
(43, '1674599698'),
(43, '1674599704'),
(42, '1674766897');

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE `post` (
  `idPost` int(11) NOT NULL,
  `dataOra` datetime NOT NULL,
  `idUtente` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `origine` varchar(45) NOT NULL,
  `barcode` varchar(45) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  `leggero` int(11) NOT NULL,
  `secco` int(11) NOT NULL,
  `piatto` int(11) NOT NULL,
  `morbido` int(11) NOT NULL,
  `bilanciamento` varchar(45) NOT NULL,
  `valutazione` int(11) NOT NULL,
  `testo` varchar(280) DEFAULT NULL,
  `immagine` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `post`
--

INSERT INTO `post` (`idPost`, `dataOra`, `idUtente`, `nome`, `origine`, `barcode`, `note`, `leggero`, `secco`, `piatto`, `morbido`, `bilanciamento`, `valutazione`, `testo`, `immagine`) VALUES
(18, '2023-01-24 22:53:09', 42, 'Prosecco Parigino', 'Parigi', '', 'uva, sughero', 29, 45, 87, 65, 'Quite Balanced', 3, 'Non male, provato durante un viaggio a Parigi di 3 anni fa. Niente di speciale', '42_1.jpg'),
(19, '2023-01-24 22:55:14', 51, 'Ca\' del Bosco Satèn 2015', 'Ca\'  del Bosco Franciacorta Vintage Collectio', '8032727260841', 'legno, agrumi', 43, 58, 57, 15, 'Quite Balanced', 4, 'Bottiglia speciale aperta durante il mio Diciottesimo compleanno. Ottima annata, note limpide.', '51_1.jpeg'),
(20, '2023-01-24 22:55:46', 42, 'Ca\' del bosco', 'Romagna', '8032727260841', 'uva, legno', 25, 41, 73, 57, 'Quite Balanced', 4, 'Bevuto ad un diciottesimo, molto buono e poco stancante. Estremamente consigliato', '42_2.jpg'),
(21, '2023-01-24 23:09:16', 51, 'Dom Pérignon 2009', 'Cantine Dom Pérignon Brut Vintage 2009', '0000416698', 'noce, fragola', 57, 22, 64, 15, 'Slightly unbalanced', 4, 'Un classico Dom Pérignon 2009', '51_2.jpg'),
(22, '2023-01-24 23:12:41', 51, 'Bellavista Brut', 'Brut Franciacorta', 'MOVIFRAGRACUV', 'fruttato', 64, 57, 54, 13, 'Quite Balanced', 3, 'Sovrapprezzato rispetto alla resa del gusto.', '51_3.jpg'),
(23, '2023-01-24 23:20:14', 51, 'Nespoli Sangiovese Superiore Prugneto 2019', 'Emilia Romagna', '8000154000019', 'uva, legno, cuoio', 75, 36, 69, 70, 'Quite Balanced', 5, 'Estremamento consigliato.\r Qualità /Prezzo eccellente, un sangiovese davvero eccezionale.', '51_4.jpg'),
(24, '2023-01-24 23:23:58', 51, 'Helmut Dönnhoff 2020', 'Germania', '140432225508', 'prugna, legno', 79, 45, 68, 67, 'Quite Balanced', 5, 'Leggenda vivente dell\'enologia tedesca e mondiale, Helmut Dönnhoff.', '51_5.jpg'),
(25, '2023-01-24 23:30:58', 51, 'Braschi 2019', 'Mercato Saraceno, Emilia Romagna', '8051773984167', 'uva, paglia', 42, 29, 47, 39, 'Quite Balanced', 4, 'Sangiovese di Mercato Saraceno, ottima annata, cantina di fiducia.\r\nGustato in \"aperitivo\" accomapagnato da salsiccia casereccia.', '51_6.jpg'),
(26, '2023-01-24 23:39:56', 49, 'Amarone', 'Italia', '8015822000048', 'legno, agrumi', 78, 48, 69, 60, 'Quite Balanced', 5, 'Lo volevo assaggiare da tanto', '49_1.jpg'),
(31, '2023-01-26 21:48:32', 49, 'Lambrusco Doc', 'Italy', '', 'paglia, miele', 76, 65, 42, 63, 'Quite Balanced', 3, 'Nuovo vino,  continua il percorso enologico...', '49_2.jpg'),
(32, '2023-01-26 21:50:50', 49, 'Prosecco Doc 2019', 'Friuli Venezia Giulia Veneto, Italia', '', 'limone, paglia', 25, 18, 44, 29, 'Slightly unbalanced', 4, 'Prosecco di ottima qualitò, da provare!', '49_3.jpg'),
(33, '2023-01-26 21:52:50', 49, 'Trebbiano d\'Abruzzo DOC 2019', 'Abruzzo', '', 'legno, uva, prugna', 71, 29, 59, 63, 'Quite Balanced', 4, 'Specialità abruzzese, ottimo assaggio per un pranzo Domenicale.', '49_4.jpg'),
(34, '2023-01-26 21:55:49', 42, 'Pentelico 7.0', 'Italia', '', 'fragola, legno', 82, 32, 61, 72, 'Slightly unbalanced', 3, 'Presentazione impeccabile ma sostanza non all\'altezza dell\'eticehtta!', '42_3.jpg'),
(35, '2023-01-26 21:58:38', 42, 'Brunello di Montalcino', 'Montalcino, Italia', '', 'legno, paglia, cuoio', 65, 45, 67, 71, 'Quite Balanced', 5, 'Sangiovese eccezionale, perfetto per deliziare degli ospiti durante una grigliata!\r\nConsigliatissimo.', '42_4.jpg');

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
(42, 51, '2023-01-24 23:01:02'),
(47, 42, '2023-01-26 22:07:23'),
(49, 42, '2023-01-26 22:07:30'),
(49, 51, '2023-01-24 23:41:58'),
(51, 42, '2023-01-24 23:01:17'),
(51, 47, '2023-01-26 22:05:23'),
(51, 49, '2023-01-24 23:40:27');

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
  `tipo` varchar(45) NOT NULL,
  `indirizzo` varchar(200) NOT NULL,
  `bio` varchar(280) NOT NULL,
  `imgProfilo` varchar(45) NOT NULL,
  `ultimaLetturaNotifiche` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`id`, `username`, `email`, `password`, `salt`, `nome`, `cognome`, `dataNascita`, `tipo`, `indirizzo`, `bio`, `imgProfilo`, `ultimaLetturaNotifiche`) VALUES
(42, 'nicomusso', 'niccolo.mussoni@gmail.com', 'd1349552d3e9c0766d7bac1f16a246dcf2671a1d0ec723f14a132dd6fdedafaea04b1f0da5d9af91fb2b8452b3ee5bbf3df0f319ab414a02d45f305814609b80', '08682b0143997c0afe9639dfccd27c00f6bc2eb4d64a6c7b1790998a61f4c4539623dd11df2aaee2f72ea1ce713cf585a40ff63e2c60dd711597f96a994dc512', 'Niccolò', 'Mussoni', '2001-05-18', 'novice', '', 'Ciao sono Niccolò e non so niente di vini', '42_propic.jpg', '2023-01-26 22:01:57'),
(44, 'matteo.marchetti', 'matteo.marchetti@gmail.com', '50883f54de759bc2f3e3576c2896d002147e437f59f044d50c398b7269e8ce3aae3da52faebf966e0637d2ba166ecee417759df985fd554dbbd9c75da2fa7e25', '144f490508de7d09038a9245af392b152153842a066773e2f496da7ce8c7da347dce9521835e6a28e3ae86f461af7b137cb7ce8b7bf6f9a8d63b77ef59d22a36', 'Matteo', 'Marchetti', '1980-10-10', 'sommelier', '', 'Sono un sommelier e faccio questo lavoro da 20 anni', '44_propic.png', '2023-01-24 23:09:34'),
(45, 'laurasantelli', 'laurasantelli90@gmail.com', '3c2485b1e3469304ce6237bb631f1394b79cab4ea09353a5931d88d5b6c1c073b1b29dde67d0d93b68897d3cd4b8fd1b82d8147bad3cc9fde9712307032513fe', '5ff90d0f2c6eb27f1d9c90350ee5b135595861501d18028fd4c883201505db3edc0efa9c44e78bb9313a4e197424d9cd9b998498076d32cb144e4c9993b1c550', 'Laura', 'Santelli', '1990-07-12', 'owner', 'Via Giovanni Pascoli 14, Milano (MI)', 'Gestisco l\'azienda di famiglia da qualche anno', '45_propic.jpeg', '2023-01-24 23:10:51'),
(46, 'tommyparra', 'tommyparra@alice.it', '860f44b04a829dcd85841722b4ac60ff1b6d7dfcaa440013fded2f8a893e326e726f5b15118453ba53b0d885f68dad2fd510564c4435f8889207888a4f2ded7c', '1045e606a879a79dfb308809a0b2b7094e2cf96cf8ce8594ed952fdb47590093c97b949ed2068f90e917e1362ec4d1409d376856c146a24567f8266b623674fb', 'Tommaso', 'Parrazzi', '1970-10-10', 'passionate', '', 'Appassionato di vini sin dalla giovane età ', '46_propic.png', '2023-01-24 23:11:50'),
(47, 'pam.beesly', 'pam.beesly@gmail.com', 'b00b20bc945ed53889fd71a25c7057d85216a1c0e0268aa13b3c95274527336ba000a28769e54a38b694785793f3e7413592d16d66c1dedc6174de256666250b', '83baf1ce904f386e67d8eea7b19b5fee9ceec9430f318b9baba3314495ed7a817f9915ef29f010d3d6fce55af9f73619d8add7bb3b7e048a9052350c56304e9c', 'Pamela', 'Beesly', '1974-03-07', 'novice', '', 'Hi I\'m Pam', '47_propic.jpg', '2023-01-26 22:04:25'),
(48, 'jakemarcus75', 'jakemarcus@gmail.com', '477a10729b54fc02f537e52826d61dc632e24efa7b6e9f3e5ec5fc0d2eda0993dd47e96eeca5353ca54c51a4ef02eb1d8dd06af499fcc734369932c3314e3b0b', '2a4872bc7c09f90f749c54cb1cfce303daac8278e80edc8c15ef0c5d3d0e9f969891a319c224c8446e8ed3e8121c735884b07ccac51154e40740702832365221', 'Jake', 'Marcus', '1975-10-09', 'grower', 'U.S. Route 395 Business (Carson City, Nevada)', 'Hello I am a grape grower in Nevada', '48_propic.jpg', '2023-01-24 23:17:36'),
(49, 'claudio', 'cla@gmail.com', 'd79a77e62c13d8c41d40263cceb62ed34d85359a57e1a3603c4cddbf792deac55289c3db59c5785dab9b93deeebccfba2716a2e9430cbd542f85722e4f16e399', 'aea2f3cf988f286539f52f62832b7a9a1cd931be1a8e967353cbe869957051a88864c779256b69862f30a65db9ef9e69549052cb6a54457e5dc60cdc7c0abd4c', 'Claudio', 'Sciarrillo', '1974-12-12', 'sommelier', '', 'Romagnolo dalla nascita, adoro il vino!', '49_propic.jpg', '2023-01-24 23:42:48'),
(51, 'alesciarrillo', 'alessandrosciarrillo@gmail.com', '82711fb83e33d83d9cedebfb26fcf77f999c57886e38435adc64589fbd3a2e2e2d512d46e1464c217c504668b106d1f0ee84a8659c17b09e010647d77fc9bb56', 'f827576c4d0fe8d8ba5833a7150e02485d1ef4675f8cf2554661abcb7f1ddd588719c79690ffeb7a3ac689390e928cad36a04c7ca8e98ba93b02001f02b96466', 'Alessandro', 'Sciarrillo', '2001-12-19', 'passionate', 'Via G. Leopardi 23', 'Sono un giovane studente di ingegneria informatica che si diletta anche nella degustazione di vini.\r\nLi bevo alle grigliate.', '51_propic.jpg', '2023-01-26 22:06:15');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `commento`
--
ALTER TABLE `commento`
  ADD PRIMARY KEY (`idCommento`),
  ADD KEY `utente_2` (`idUtente`),
  ADD KEY `post_1` (`idPost`);

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
-- AUTO_INCREMENT per la tabella `commento`
--
ALTER TABLE `commento`
  MODIFY `idCommento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT per la tabella `post`
--
ALTER TABLE `post`
  MODIFY `idPost` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `commento`
--
ALTER TABLE `commento`
  ADD CONSTRAINT `post_1` FOREIGN KEY (`idPost`) REFERENCES `post` (`idPost`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `utente_2` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limiti per la tabella `like`
--
ALTER TABLE `like`
  ADD CONSTRAINT `post` FOREIGN KEY (`idPost`) REFERENCES `post` (`idPost`) ON DELETE CASCADE ON UPDATE NO ACTION,
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
