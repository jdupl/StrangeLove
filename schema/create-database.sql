SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `strangelove` ;
CREATE SCHEMA IF NOT EXISTS `strangelove` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `strangelove` ;

-- -----------------------------------------------------
-- Table `strangelove`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `strangelove`.`users` ;

CREATE  TABLE IF NOT EXISTS `strangelove`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(20) NOT NULL ,
  `password` VARCHAR(64) NOT NULL ,
  `salt` VARCHAR(36) NOT NULL ,
  `email` VARCHAR(150) NULL ,
  `wallet` VARCHAR(60) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `strangelove`.`machines`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `strangelove`.`machines` ;

CREATE  TABLE IF NOT EXISTS `strangelove`.`machines` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(40) NULL ,
  `total_slots` INT NULL ,
  `occupied_slots` INT NULL ,
  `installation_date` DATE NULL ,
  `motherboard_model` VARCHAR(80) NULL ,
  `motherboard_serial_number` VARCHAR(45) NULL ,
  `value` DOUBLE NULL ,
  `ip_adress` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `strangelove`.`units`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `strangelove`.`units` ;

CREATE  TABLE IF NOT EXISTS `strangelove`.`units` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `machine_id` INT NOT NULL ,
  `model` VARCHAR(120) NULL ,
  `installation_date` DATE NULL ,
  `purchase_date` DATE NULL ,
  `serial_number` VARCHAR(80) NULL ,
  `warranty_expiration_date` DATE NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_units_machine_id_idx` (`machine_id` ASC) ,
  CONSTRAINT `fk_units_machine_id`
    FOREIGN KEY (`machine_id` )
    REFERENCES `strangelove`.`machines` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `strangelove`.`users_units`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `strangelove`.`users_units` ;

CREATE  TABLE IF NOT EXISTS `strangelove`.`users_units` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NOT NULL ,
  `unit_id` INT NOT NULL ,
  `share` DECIMAL NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_users_units_1_idx` (`user_id` ASC) ,
  INDEX `fk_users_units_unit_id_idx` (`unit_id` ASC) ,
  CONSTRAINT `fk_users_units_user_id`
    FOREIGN KEY (`user_id` )
    REFERENCES `strangelove`.`users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_units_unit_id`
    FOREIGN KEY (`unit_id` )
    REFERENCES `strangelove`.`units` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `strangelove`.`stats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `strangelove`.`stats` ;

CREATE  TABLE IF NOT EXISTS `strangelove`.`stats` (
  `stat_id` INT NOT NULL AUTO_INCREMENT ,
  `device_id` INT NOT NULL ,
  `temperature` FLOAT NOT NULL ,
  `device_voltage` FLOAT NOT NULL ,
  `engine_clock` INT NOT NULL ,
  `memory_clock` INT NULL ,
  `fan_rpm` INT NULL ,
  `hardware_errors` INT NULL ,
  `shares_rejected` INT NULL ,
  `shares_accepted` INT NULL ,
  `hashrate` INT NULL ,
  `intensity` INT NULL ,
  `time_since_last_work` INT NULL ,
  `time_since_last_valid_work` INT NULL ,
  PRIMARY KEY (`stat_id`) ,
  INDEX `fk_stats_units1_idx` (`device_id` ASC) ,
  CONSTRAINT `fk_stats_units1`
    FOREIGN KEY (`device_id` )
    REFERENCES `strangelove`.`units` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `strangelove`.`stats_machines`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `strangelove`.`stats_machines` ;

CREATE  TABLE IF NOT EXISTS `strangelove`.`stats_machines` (
  `id` INT NOT NULL ,
  `machine_id` INT NULL ,
  `uptime` INT NULL ,
  `load_avg` INT NULL ,
  `timestamp` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_stats_machines_idx` (`machine_id` ASC) ,
  CONSTRAINT `fk_stats_machines`
    FOREIGN KEY (`machine_id` )
    REFERENCES `strangelove`.`machines` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `strangelove` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
