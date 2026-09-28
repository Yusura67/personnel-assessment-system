-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.44 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for final_database
CREATE DATABASE IF NOT EXISTS `final_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `final_database`;

-- Dumping structure for table final_database.assignment
CREATE TABLE IF NOT EXISTS `assignment` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `evaluator_id` int NOT NULL,
  `evaluatee_id` int NOT NULL,
  `period_id` int NOT NULL,
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `overall_comment` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signature_path` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','evaluating','completed','re_evaluate_requested') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  PRIMARY KEY (`assignment_id`),
  UNIQUE KEY `evaluator_id` (`evaluator_id`,`evaluatee_id`,`period_id`),
  KEY `evaluatee_id` (`evaluatee_id`),
  KEY `period_id` (`period_id`),
  CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`evaluator_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `assignment_ibfk_2` FOREIGN KEY (`evaluatee_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `assignment_ibfk_3` FOREIGN KEY (`period_id`) REFERENCES `evaluation_period` (`period_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table final_database.evaluatee_data
CREATE TABLE IF NOT EXISTS `evaluatee_data` (
  `data_id` int NOT NULL AUTO_INCREMENT,
  `evaluatee_id` int NOT NULL,
  `indicator_id` int NOT NULL,
  `data_content` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `self_score` decimal(5,2) NOT NULL,
  PRIMARY KEY (`data_id`),
  UNIQUE KEY `uniq_data` (`evaluatee_id`,`indicator_id`),
  KEY `indicator_id` (`indicator_id`),
  CONSTRAINT `evaluatee_data_ibfk_1` FOREIGN KEY (`evaluatee_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `evaluatee_data_ibfk_2` FOREIGN KEY (`indicator_id`) REFERENCES `indicator` (`indicator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table final_database.evaluation_period
CREATE TABLE IF NOT EXISTS `evaluation_period` (
  `period_id` int NOT NULL AUTO_INCREMENT,
  `period_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('active','closed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'closed',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`period_id`),
  UNIQUE KEY `period_name` (`period_name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table final_database.evidence
CREATE TABLE IF NOT EXISTS `evidence` (
  `evidence_id` int NOT NULL AUTO_INCREMENT,
  `data_id` int NOT NULL,
  `file_path` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`evidence_id`),
  KEY `data_id` (`data_id`),
  CONSTRAINT `evidence_ibfk_1` FOREIGN KEY (`data_id`) REFERENCES `evaluatee_data` (`data_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table final_database.indicator
CREATE TABLE IF NOT EXISTS `indicator` (
  `indicator_id` int NOT NULL AUTO_INCREMENT,
  `indicator_name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight` decimal(4,2) NOT NULL,
  `eval_type` enum('yes/no','scale') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_id` int NOT NULL,
  `topic_id` int DEFAULT NULL,
  PRIMARY KEY (`indicator_id`),
  KEY `FK_IndicatorPeriod` (`period_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `FK_IndicatorPeriod` FOREIGN KEY (`period_id`) REFERENCES `evaluation_period` (`period_id`),
  CONSTRAINT `indicator_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table final_database.score
CREATE TABLE IF NOT EXISTS `score` (
  `score_id` int NOT NULL AUTO_INCREMENT,
  `assignment_id` int NOT NULL,
  `indicator_id` int NOT NULL,
  `score` decimal(5,2) NOT NULL,
  `comment` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`score_id`),
  UNIQUE KEY `uniq_score` (`assignment_id`,`indicator_id`),
  KEY `indicator_id` (`indicator_id`),
  CONSTRAINT `score_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `assignment` (`assignment_id`),
  CONSTRAINT `score_ibfk_2` FOREIGN KEY (`indicator_id`) REFERENCES `indicator` (`indicator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table final_database.topic
CREATE TABLE IF NOT EXISTS `topic` (
  `topic_id` int NOT NULL AUTO_INCREMENT,
  `topic_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_id` int DEFAULT NULL,
  PRIMARY KEY (`topic_id`),
  KEY `period_id` (`period_id`),
  CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`period_id`) REFERENCES `evaluation_period` (`period_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table final_database.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','evaluator','evaluatee') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'evaluatee',
  `fullname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
