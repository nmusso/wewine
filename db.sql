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

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `social` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `social`;

--
-- Table structure for table `commento`
--

DROP TABLE IF EXISTS `commento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commento` (
  `idPost` int(11) NOT NULL,
  `idUtente` int(11) NOT NULL,
  `testo` varchar(280) NOT NULL,
  `dataOra` datetime NOT NULL,
  PRIMARY KEY (`idPost`,`idUtente`),
  KEY `utente_2` (`idUtente`),
  CONSTRAINT `post_1` FOREIGN KEY (`idPost`) REFERENCES `post` (`idPost`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `utente_2` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commento`
--

LOCK TABLES `commento` WRITE;
/*!40000 ALTER TABLE `commento` DISABLE KEYS */;
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
  CONSTRAINT `post` FOREIGN KEY (`idPost`) REFERENCES `post` (`idPost`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `utente_1` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_attempts`
--

LOCK TABLES `login_attempts` WRITE;
/*!40000 ALTER TABLE `login_attempts` DISABLE KEYS */;
INSERT INTO `login_attempts` VALUES (3,'1671919467'),(3,'1671919471'),(4,'1671919512'),(5,'1671919684'),(4,'1671920258'),(7,'1671920265'),(9,'1672244503'),(9,'1672244506'),(9,'1672244507'),(9,'1672244507'),(9,'1672244507'),(9,'1672244515'),(10,'1672244918'),(2,'1672244951'),(2,'1672245175');
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
  `testo` varchar(280) NOT NULL,
  `immagine` varchar(45) DEFAULT NULL,
  `dataOra` datetime NOT NULL,
  `idUtente` int(11) NOT NULL,
  PRIMARY KEY (`idPost`),
  KEY `utente` (`idUtente`),
  CONSTRAINT `utente` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Ciao',NULL,'2022-12-24 00:00:00',2),(19,'','9_1.png','2022-12-30 23:31:46',9),(20,'','9_2.png','2022-12-30 23:32:07',9),(21,'prova','9_3.png','2022-12-30 23:33:11',9),(22,'ciao amici',NULL,'2022-12-30 23:35:22',9),(23,'Ciaop roaova','9_4.png','2022-12-30 23:36:31',9),(24,'prova','9_5.png','2022-12-30 23:48:36',9);
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
  `bio` varchar(280) NOT NULL,
  `imgProfilo` varchar(45) NOT NULL,
  `ultimaLetturaNotifiche` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES (2,'test_user','test@example.com','00807432eae173f652f2064bdca1b61b290b52d40e429a7d295d76a71084aa96c0233b82f1feac45529e0726559645acaed6f3ae58a286b9f075916ebf66cacc','f9aab579fc1b41ed0c44fe4ecdbfcdb4cb99b9023abb241a6db833288f4eea3c02f76e0d35204a8695077dcf81932aa59006423976224be0390395bae152d4ef','Test','User','2000-12-24','Ciao sono test','def',NULL),(9,'aleciro','aleciro@gmail.com','499bacb2450b13d24cef2b926fc7ce51f81ffa00b342f87325a68856469724e29fe7eb564929153f9c7afb6815f9cb78433ad5c86e1b5897883d42611fa20a06','d47a84a9184db566c002aeadacf56da499c23c7d0bf0772065141ec12bf7573050b899da89c2c501b7a254fc82694f20bdab86625371a9e13ea7b377a1d61c88','Ale','Ciro','2000-12-12','Ciao','C:\\fakepath\\Screenshot (1).png','2022-12-24 23:19:19'),(10,'aleciroaaa','ss@gmail.com','adec806472fde20ffab5d47985448f0dee46bf6613da738f57006909204f3661d4f7aebca303d6bd76d40d7c8087cbf66b6f8fb74ce6579cc53570a3481861cc','d78b0ac03465ae04c24cfa4c2a0975635f24743cabd72eef0822f43289e09f8610ec41b55f89b603dbc8baf51d04bfea6ead2bde40bf89f1c74c57d96a74547c','aa','aa','0000-00-00','asd','C:\\fakepath\\Screenshot (2).png','2022-12-24 23:29:33'),(11,'aafmfmdsm','aa','ce5d211d169ef5363364839c438f894878ce329e080511a592568119d7a823318026a63c2199386d77db7b8c8dcaa4848a15eb8af1b9b96396aa432364df5f75','06f18aad1e8d19e4592c7c110ecd9b3567f72591b8be3cdf633b7f1d15ae207fa012922bb1de9cf4e09ec2fd4b2c138e4842ded263cbdc7053ad6f68d5e18535','oih','poi','2000-10-10','poif','Screenshot (2).png','2022-12-25 00:03:13'),(16,'musso','musso','667f3e0cdc089491d88c7cd9c889b39dd199cf921933f5ac186ef5df39659fb041acea3e5a95a0eb18d6f50bcb4ba52f0cee3cec4772ef76aad13fcf1044cdba','7f77125a9f87f77a75f566146d4cc671529de674abfa2b8659cde21b3d49a673395b8f4a545210414d3cb6bfb9152e4f35a4b808fee3dd87387fcf19acf7b011','musso','musso','2010-10-10','musso','16_propic.png','2022-12-30 23:58:33'),(18,'ciro','ciro','fbc62c7d8816a07249b958e18943a58de4be39be90d35c76fdd99deebc64055ba903807ad3a25689831eb33fb675015a6bab7eb1f3c3ae47515771b1eb568cdd','1f339e6ce12ba17eb470c362109cb9cc2f97ca2469bd634556e504b6a66f4acea214825e103638acff62c4cfd28e2a4d28e000b6231300a899b4bd26762579f9','ciro','ciro','2010-10-10','ciro','18_propic.png','2022-12-31 00:02:06'),(33,'nofoto','nofoto','61491d42bc109a88e36af2f83caf8967745e247633287be060886e1f3779698ef5d558848e2fdc6c31bc02c00d6f28eda752b8f30a6615aa38e6a561ec74278b','10e283cfef74d11ee1b82a66fbc995700da93276e966506217ef352e6eadcc65037784a306b602603495ea06ecc0019f2070f904db4acb5772a03056c1cdca8c','nofoto','nofoto','2010-10-10','nofoto','empty.png','2022-12-31 00:33:52'),(34,'sifoto','sifoto','fea9fcb4a5a645dc4b1521a7846319f15398573f5d85f3eeba30a1c9d9fc95f5965bed0588d36df924399734c7b62580924938b573e76539a7b587659e4bca55','e66ce81a9560f8c92607ccb624bd902dac4d5b0a244c5a5c816231102e2af961eabf23847756ab3a527fe7eb6cabb740f9dc7ca5349e8a0474c9ab59619eee6f','sifoto','sifoto','2010-10-10','sifoto','34_propic.png','2022-12-31 00:34:18');
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

-- Dump completed on 2022-12-31  0:37:08
