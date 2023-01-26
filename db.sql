-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: social
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `social`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `social` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `social`;

--
-- Table structure for table `commento`
--

DROP TABLE IF EXISTS `commento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commento` (
  `idCommento` int(11) NOT NULL AUTO_INCREMENT,
  `idPost` int(11) NOT NULL,
  `idUtente` int(11) NOT NULL,
  `testo` varchar(280) NOT NULL,
  `dataOra` datetime NOT NULL,
  PRIMARY KEY (`idCommento`),
  KEY `utente_2` (`idUtente`),
  KEY `post_1` (`idPost`),
  CONSTRAINT `post_1` FOREIGN KEY (`idPost`) REFERENCES `post` (`idPost`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `utente_2` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commento`
--

LOCK TABLES `commento` WRITE;
/*!40000 ALTER TABLE `commento` DISABLE KEYS */;
INSERT INTO `commento` VALUES (17,25,49,'mi Ã¨ piaciuto molto','2023-01-24 23:37:25'),(18,20,47,'Confermo molto buono','2023-01-25 19:35:40');
/*!40000 ALTER TABLE `commento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `idPost` int(11) NOT NULL,
  `idUtente` int(11) NOT NULL,
  `dataOra` datetime NOT NULL,
  PRIMARY KEY (`idPost`,`idUtente`),
  KEY `utente_1` (`idUtente`),
  CONSTRAINT `post` FOREIGN KEY (`idPost`) REFERENCES `post` (`idPost`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `utente_1` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (19,49,'2023-01-24 23:40:53'),(23,49,'2023-01-24 23:40:48'),(24,49,'2023-01-24 23:40:45'),(25,49,'2023-01-24 23:37:14'),(26,51,'2023-01-24 23:42:35');
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_attempts`
--

DROP TABLE IF EXISTS `login_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_attempts` (
  `user_id` int(11) NOT NULL,
  `time` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_attempts`
--

LOCK TABLES `login_attempts` WRITE;
/*!40000 ALTER TABLE `login_attempts` DISABLE KEYS */;
INSERT INTO `login_attempts` VALUES (42,'1674598264'),(42,'1674598268'),(43,'1674599569'),(43,'1674599582'),(43,'1674599583'),(43,'1674599594'),(43,'1674599698'),(43,'1674599704');
/*!40000 ALTER TABLE `login_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `idPost` int(11) NOT NULL AUTO_INCREMENT,
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
  `immagine` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPost`),
  KEY `utente` (`idUtente`),
  CONSTRAINT `utente` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (18,'2023-01-24 22:53:09',42,'Prosecco Parigino','Parigi','','uva, sughero',29,45,87,65,'Quite Balanced',3,'Non male, provato durante un viaggio a Parigi di 3 anni fa. Niente di speciale','42_1.jpg'),(19,'2023-01-24 22:55:14',51,'Ca\' del Bosco Satèn 2015','Ca\'  del Bosco Franciacorta Vintage Collectio','8032727260841','legno, agrumi',43,58,57,15,'Quite Balanced',4,'Bottiglia speciale aperta durante il mio Diciottesimo compleanno. Ottima annata, note limpide.','43_1.jpeg'),(20,'2023-01-24 22:55:46',42,'Ca\' del bosco','Romagna','8032727260841','uva, legno',25,41,73,57,'Quite Balanced',4,'Bevuto ad un diciottesimo, molto buono e poco stancante. Estremamente consigliato','42_2.jpg'),(21,'2023-01-24 23:09:16',51,'Dom Pérignon 2009','Cantine Dom Pérignon Brut Vintage 2009','0000416698','noce, fragola',57,22,64,15,'Slightly unbalanced',4,'Un classico Dom Pérignon 2009','43_2.jpg'),(22,'2023-01-24 23:12:41',51,'Bellavista Brut','Brut Franciacorta','MOVIFRAGRACUV','fruttato',64,57,54,13,'Quite Balanced',3,'Sovrapprezzato rispetto alla resa del gusto.','43_3.jpg'),(23,'2023-01-24 23:20:14',51,'Nespoli Snagiovese Superiore Prugneto 2019','Emilia Romagna','8000154000019','uva, legno, cuoio',75,36,69,70,'Quite Balanced',5,'Estremamento consigliato.\r Qualità /Prezzo eccellente, un sangiovese davvero eccezionale.','43_4.jpg'),(24,'2023-01-24 23:23:58',51,'Helmut Dönnhoff 2020','Germania','140432225508','prugna, legno',79,45,68,67,'Quite Balanced',5,'Leggenda vivente dell\'enologia tedesca e mondiale, Helmut Dönnhoff.','43_5.jpg'),(25,'2023-01-24 23:30:58',51,'Braschi 2019','Mercato Saraceno, Emilia Romagna','8051773984167','uva, paglia',42,29,47,39,'Quite Balanced',4,'Sangiovese di Mercato Saraceno, ottima annata, cantina di fiducia.\r\nGustato in \"aperitivo\" accomapagnato da salsiccia casereccia.','43_6.jpg'),(26,'2023-01-24 23:39:56',49,'Amarone','Italia','8015822000048','legno, agrumi',78,48,69,60,'Quite Balanced',5,'Lo volevo assaggiare da tanto','49_1.jpg');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `segue`
--

DROP TABLE IF EXISTS `segue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `segue` (
  `idFollowed` int(11) NOT NULL,
  `idFollower` int(11) NOT NULL,
  `dataOra` varchar(45) NOT NULL,
  PRIMARY KEY (`idFollowed`,`idFollower`),
  KEY `utente_4` (`idFollower`),
  CONSTRAINT `utente_3` FOREIGN KEY (`idFollowed`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `utente_4` FOREIGN KEY (`idFollower`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `segue`
--

LOCK TABLES `segue` WRITE;
/*!40000 ALTER TABLE `segue` DISABLE KEYS */;
INSERT INTO `segue` VALUES (42,51,'2023-01-24 23:01:02'),(49,51,'2023-01-24 23:41:58'),(51,42,'2023-01-24 23:01:17'),(51,49,'2023-01-24 23:40:27'),(51,51,'2023-01-24 23:43:23');
/*!40000 ALTER TABLE `segue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `ultimaLetturaNotifiche` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES (42,'nicomusso','niccolo.mussoni@gmail.com','554a6e7065b553b53b2d0c844b3bcbcd11e3153d82f6121df4adc5d9bfcc2771451280d26e80e8ec92761341c45e1c21a4629113997f79cfdbe73e49cbdbaa06','6620ef4d5132310f4363ee494f8f0f6612a890518a03b395bcd3fb7676db66969032b6e5d300ac9cab43dbf63cfaeb84815f7565644a80efc9bc95b6e068c861','Niccolò','Mussoni','2001-05-18','novice','','Ciao sono Niccolò e non so niente di vini','42_propic.jpg','2023-01-25 22:13:49'),(44,'matteo.marchetti','matteo.marchetti@gmail.com','50883f54de759bc2f3e3576c2896d002147e437f59f044d50c398b7269e8ce3aae3da52faebf966e0637d2ba166ecee417759df985fd554dbbd9c75da2fa7e25','144f490508de7d09038a9245af392b152153842a066773e2f496da7ce8c7da347dce9521835e6a28e3ae86f461af7b137cb7ce8b7bf6f9a8d63b77ef59d22a36','Matteo','Marchetti','1980-10-10','sommelier','','Sono un sommelier e faccio questo lavoro da 20 anni','empty.png','2023-01-24 23:09:34'),(45,'laurasantelli','laurasantelli90@gmail.com','3c2485b1e3469304ce6237bb631f1394b79cab4ea09353a5931d88d5b6c1c073b1b29dde67d0d93b68897d3cd4b8fd1b82d8147bad3cc9fde9712307032513fe','5ff90d0f2c6eb27f1d9c90350ee5b135595861501d18028fd4c883201505db3edc0efa9c44e78bb9313a4e197424d9cd9b998498076d32cb144e4c9993b1c550','Laura','Santelli','1990-07-12','owner','Via Giovanni Pascoli 14, Milano (MI)','Gestisco l\'azienda di famiglia da qualche anno','empty.png','2023-01-24 23:10:51'),(46,'tommyparra','tommyparra@alice.it','860f44b04a829dcd85841722b4ac60ff1b6d7dfcaa440013fded2f8a893e326e726f5b15118453ba53b0d885f68dad2fd510564c4435f8889207888a4f2ded7c','1045e606a879a79dfb308809a0b2b7094e2cf96cf8ce8594ed952fdb47590093c97b949ed2068f90e917e1362ec4d1409d376856c146a24567f8266b623674fb','Tommaso','Parrazzi','1970-10-10','passionate','','Appassionato di vini sin dalla giovane etÃ ','empty.png','2023-01-24 23:11:50'),(47,'pam.beesly','pam.beesly@gmail.com','b00b20bc945ed53889fd71a25c7057d85216a1c0e0268aa13b3c95274527336ba000a28769e54a38b694785793f3e7413592d16d66c1dedc6174de256666250b','83baf1ce904f386e67d8eea7b19b5fee9ceec9430f318b9baba3314495ed7a817f9915ef29f010d3d6fce55af9f73619d8add7bb3b7e048a9052350c56304e9c','Pamela','Beesly','1974-03-07','novice','','Hi I\'m Pam','47_propic.jpg','2023-01-24 23:14:46'),(48,'jakemarcus75','jakemarcus@gmail.com','477a10729b54fc02f537e52826d61dc632e24efa7b6e9f3e5ec5fc0d2eda0993dd47e96eeca5353ca54c51a4ef02eb1d8dd06af499fcc734369932c3314e3b0b','2a4872bc7c09f90f749c54cb1cfce303daac8278e80edc8c15ef0c5d3d0e9f969891a319c224c8446e8ed3e8121c735884b07ccac51154e40740702832365221','Jake','Marcus','1975-10-09','grower','U.S. Route 395 Business (Carson City, Nevada)','Hello I am a grape grower in Nevada','48_propic.jpg','2023-01-24 23:17:36'),(49,'claudio','cla@gmail.com','d79a77e62c13d8c41d40263cceb62ed34d85359a57e1a3603c4cddbf792deac55289c3db59c5785dab9b93deeebccfba2716a2e9430cbd542f85722e4f16e399','aea2f3cf988f286539f52f62832b7a9a1cd931be1a8e967353cbe869957051a88864c779256b69862f30a65db9ef9e69549052cb6a54457e5dc60cdc7c0abd4c','Claudio','Sciarrillo','1974-12-12','sommelier','','Mi piace il vino','49_propic.jpg','2023-01-24 23:42:48'),(51,'alesciarrillo','alessandrosciarrillo@gmail.com','82711fb83e33d83d9cedebfb26fcf77f999c57886e38435adc64589fbd3a2e2e2d512d46e1464c217c504668b106d1f0ee84a8659c17b09e010647d77fc9bb56','f827576c4d0fe8d8ba5833a7150e02485d1ef4675f8cf2554661abcb7f1ddd588719c79690ffeb7a3ac689390e928cad36a04c7ca8e98ba93b02001f02b96466','Alessandro','Sciarrillo','2001-12-19','passionate','Via G. Leopardi 23','Sono un giovane studente di ingegneria informatica che si diletta anche nella degustazione di vini.\r\nLi bevo alle grigliate.','51_propic.jpg','2023-01-24 23:55:55');
/*!40000 ALTER TABLE `utente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-26  8:56:33
