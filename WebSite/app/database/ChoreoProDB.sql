-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ChoreoProDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ChoreoProDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ChoreoProDB` DEFAULT CHARACTER SET utf8 ;
USE `ChoreoProDB` ;

-- -----------------------------------------------------
-- Table `ChoreoProDB`.`Choreographer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ChoreoProDB`.`Choreographer` (
  `ChoreographerID` INT NOT NULL AUTO_INCREMENT,
  `ChoreoFirst` VARCHAR(45) NOT NULL,
  `ChoreoLast` VARCHAR(45) NOT NULL,
  `ChoreoUser` VARCHAR(45) NOT NULL,
  `ChoreoPass` VARCHAR(45) NOT NULL,
  `ChoreoEmail` VARCHAR(90) NOT NULL,
  `About` BLOB NULL,
  `Price` DECIMAL(15,2) NOT NULL,
  `ChoreoPhone` VARCHAR(15) NULL,
  `Admin` TINYINT(1) NOT NULL,
  PRIMARY KEY (`ChoreographerID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ChoreoProDB`.`ScheduleRequest`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ChoreoProDB`.`ScheduleRequest` (
  `ScheduleRequestID` INT NOT NULL AUTO_INCREMENT,
  `GymName` VARCHAR(45) NOT NULL,
  `GymContact` VARCHAR(45) NOT NULL,
  `GymStreet` VARCHAR(45) NOT NULL,
  `GymCity` VARCHAR(45) NOT NULL,
  `GymState` VARCHAR(2) NOT NULL,
  `GymZip` VARCHAR(5) NOT NULL,
  `EmailAddress` VARCHAR(90) NOT NULL,
  `PhoneNumber` VARCHAR(15) NOT NULL,
  `GymTeams` VARCHAR(45) NOT NULL,
  `GymDivision` VARCHAR(45) NOT NULL,
  `NumberOfAthletes` VARCHAR(45) NOT NULL,
  `ChoreographerID` INT NOT NULL,
  `DateRequested` DATETIME NOT NULL,
  `DateRequested2` DATETIME NOT NULL,
  `DateRequested3` DATETIME NOT NULL,
  `DateStamp` DATETIME NOT NULL,
  PRIMARY KEY (`ScheduleRequestID`),
  INDEX `fk_ScheduleRequest_Choreographer_idx` (`ChoreographerID` ASC),
  CONSTRAINT `fk_ScheduleRequest_Choreographer`
    FOREIGN KEY (`ChoreographerID`)
    REFERENCES `ChoreoProDB`.`Choreographer` (`ChoreographerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
