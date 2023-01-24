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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commento`
--

LOCK TABLES `commento` WRITE;
/*!40000 ALTER TABLE `commento` DISABLE KEYS */;
INSERT INTO `commento` VALUES (3,4,9,'bella palestra','2023-01-20 21:48:11'),(5,4,9,'sono qua','2023-01-20 21:50:46'),(6,3,9,'ciao','2023-01-20 22:33:31'),(7,7,9,'ciao','2023-01-20 22:51:41'),(15,3,33,'ciao','2023-01-22 14:40:33'),(16,7,9,'hei','2023-01-23 11:40:01');
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
INSERT INTO `like` VALUES (3,33,'2023-01-21 18:25:52'),(4,9,'2023-01-21 18:03:00');
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
INSERT INTO `login_attempts` VALUES (3,'1671919467'),(3,'1671919471'),(4,'1671919512'),(5,'1671919684'),(4,'1671920258'),(7,'1671920265'),(9,'1672244503'),(9,'1672244506'),(9,'1672244507'),(9,'1672244507'),(9,'1672244507'),(9,'1672244515'),(10,'1672244918'),(2,'1672244951'),(2,'1672245175'),(9,'1672612589'),(9,'1672612591'),(9,'1672612597'),(9,'1672612598'),(9,'1672612620'),(9,'1673646907'),(9,'1673646908'),(9,'1673646912'),(9,'1673891489'),(9,'1673891491'),(9,'1673891495'),(9,'1673891512');
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
  `note` varchar(200) DEFAULT NULL,
  `leggero` int(11) NOT NULL,
  `secco` int(11) NOT NULL,
  `piatto` int(11) NOT NULL,
  `morbido` int(11) NOT NULL,
  `valutazione` int(11) NOT NULL,
  `testo` varchar(280) DEFAULT NULL,
  `immagine` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPost`),
  KEY `utente` (`idUtente`),
  CONSTRAINT `utente` FOREIGN KEY (`idUtente`) REFERENCES `utente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (3,'2023-01-06 20:14:43',9,'','',NULL,0,0,0,0,0,'regw','9_1.jpeg'),(4,'2023-01-06 20:34:43',16,'','',NULL,0,0,0,0,0,'ciao sono musso','16_1.jpeg'),(5,'2023-01-06 20:35:12',18,'','',NULL,0,0,0,0,0,'Ciao sono ciro','empty.png'),(6,'2023-01-06 20:35:24',18,'','',NULL,0,0,0,0,0,'Ciao sono ancora ciro','empty.png'),(7,'2023-01-05 20:46:47',33,'','',NULL,0,0,0,0,0,'no foto sono io','33_1.png'),(9,'2023-01-23 23:02:38',9,'','',NULL,0,0,0,0,0,'ciao sono io',NULL),(11,'2023-01-24 14:39:36',41,'','',NULL,0,0,0,0,0,'la mia azienda!','41_1.jpg'),(12,'2023-01-24 15:59:35',9,'Prosecco','Valmarecchia',NULL,50,50,50,50,3,'',NULL),(13,'2023-01-24 16:07:08',9,'Nero Magis','Bertinoro ','Carne rossa e latte',33,68,18,53,4,'Molto buono e sapore delicato','9_2.jpg'),(14,'2023-01-24 17:25:40',9,'ciao','prova','grappa',50,50,50,50,3,'',NULL);
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
INSERT INTO `segue` VALUES (9,33,'2023-01-21 18:27:32'),(16,9,'2023-01-06 20:00:00'),(33,9,'2023-01-14 17:57:03');
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES (2,'test_user','test@example.com','00807432eae173f652f2064bdca1b61b290b52d40e429a7d295d76a71084aa96c0233b82f1feac45529e0726559645acaed6f3ae58a286b9f075916ebf66cacc','f9aab579fc1b41ed0c44fe4ecdbfcdb4cb99b9023abb241a6db833288f4eea3c02f76e0d35204a8695077dcf81932aa59006423976224be0390395bae152d4ef','Test','User','2000-12-24','sommelier','','Ciao sono test','2_propic.png',NULL),(9,'aleciro','aleciro@gmail.com','412d7c4bbf2189c6dd61a5239d112966504e0485157e92095bffe3a926a12865eb6ab579a500b3a8cf18c2bb940f712321208ad5c27b3740c1cd35b4ea23a1d9','cc162737baaccce2c47efa258e30b58e8010c2d8de6f1431085593a07e70d78e15ce3ce07f878a044b379021345db4c8a607016cda475afbced90a88a3e45c6b','Ale','Ciro','2000-12-12','sommelier','','Ciao sono alino tatino','9_propic.jpg','2023-01-23 23:02:28'),(16,'musso','musso','667f3e0cdc089491d88c7cd9c889b39dd199cf921933f5ac186ef5df39659fb041acea3e5a95a0eb18d6f50bcb4ba52f0cee3cec4772ef76aad13fcf1044cdba','7f77125a9f87f77a75f566146d4cc671529de674abfa2b8659cde21b3d49a673395b8f4a545210414d3cb6bfb9152e4f35a4b808fee3dd87387fcf19acf7b011','musso','musso','2010-10-10','novice','','musso','16_propic.png','2022-12-30 23:58:33'),(18,'ciro','ciro','fbc62c7d8816a07249b958e18943a58de4be39be90d35c76fdd99deebc64055ba903807ad3a25689831eb33fb675015a6bab7eb1f3c3ae47515771b1eb568cdd','1f339e6ce12ba17eb470c362109cb9cc2f97ca2469bd634556e504b6a66f4acea214825e103638acff62c4cfd28e2a4d28e000b6231300a899b4bd26762579f9','ciro','ciro','2010-10-10','passionate','','ciro','18_propic.png','2022-12-31 00:02:06'),(33,'nofoto','nofoto','61491d42bc109a88e36af2f83caf8967745e247633287be060886e1f3779698ef5d558848e2fdc6c31bc02c00d6f28eda752b8f30a6615aa38e6a561ec74278b','10e283cfef74d11ee1b82a66fbc995700da93276e966506217ef352e6eadcc65037784a306b602603495ea06ecc0019f2070f904db4acb5772a03056c1cdca8c','nofoto','nofoto','2010-10-10','grower','via mia ','nofoto','empty.png','2023-01-21 17:55:41'),(34,'sifoto','sifoto','fea9fcb4a5a645dc4b1521a7846319f15398573f5d85f3eeba30a1c9d9fc95f5965bed0588d36df924399734c7b62580924938b573e76539a7b587659e4bca55','e66ce81a9560f8c92607ccb624bd902dac4d5b0a244c5a5c816231102e2af961eabf23847756ab3a527fe7eb6cabb740f9dc7ca5349e8a0474c9ab59619eee6f','sifoto','sifoto','2010-10-10','owner','via del duomo 80 milano','sifoto','34_propic.png','2022-12-31 00:34:18'),(35,'musso1','musso1','07f4792ee0605fd9b66b4ee030b1994099f8184ba568317f1118aa9dfabccf1b72654fe1ba10f88845ac7cfe2f6ccb508cf1c72a9b1c93668d60f22d81617309','b5484ef5a9466e58278f4269f127ef0cb5c588355e33ba581e192603c76e50afb63b2795de69bce456721ea8068b0381f950795f114d4449664e9d68035dba38','musso1','musso1','2010-10-10','novice','','musso','empty.png','2023-01-02 21:47:05'),(36,'marti','fartifoca@gmail.foc','224924c703c09e6d695a3c3923534a9d8edaad6f9595e4347c231ce4f890060a895a7a0a685e58fb3cf9e01ff1304dcd57fcb361d745b35f13be1ecef24cdd53','8e585d111699414ca97db492748a14b3f260c09531e57f3808759167124050a3d6726c0786451929d9d939e59aa35ac6a739e76bf49400ba2a48207789d70893','marti','foca','2023-01-03','sommelier','','Ciao sono una farti foca','empty.png','2023-01-04 20:45:24'),(37,'provatest','provatest@gmail.com','fea7576fc73465d2f26fd8175fdeb42ad54d74714d36703c0c87e24711ea6a6148c09df264ce080c2706f0690e21f2e4bcbeb67abeb00208dbd328e1c706fec6','cd4d1b1c4c866410370865904f5dfac17c7675296886df9b23dc8b06683782f60f6eb65da12bca08fd78eb41ad55afbc42e2d0f2cd329e27372050efc0bf8510','provatest','provatest','2020-10-10','passionate','','fds','empty.png','2023-01-23 23:17:29'),(41,'tipotest','tipo@gmail.com','5838d342455eba9a223985cebaa1b16298e0a91f77a5d42240729747054fc3ce89cbd01974a6e9580601f60e4f57a7610bba7fad0c7e1e238ada7dc1392bb505','15b17194631aaede9894a34622c368542a087f447453faa3e414798f7875f1e4160f10d1610c7bbe42dd42f3046081dce5966d06e26f7dfa1e0dc37aa8960bf7','tipo','test','2010-10-10','owner','via bella','ciao','41_propic.jpg','2023-01-24 14:37:44');
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

-- Dump completed on 2023-01-24 17:54:33
