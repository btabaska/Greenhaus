-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS plantsdb;
-- Creates the "blogger" database --
CREATE DATABASE plantsdb;

USE plantsdb;

CREATE TABLE plants (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    plantName varchar(64),
    scientificName varchar(128),
    commonName varchar(64),
    imageUrl varchar(256),
    lastWatered DATE DEFAULT (CURRENT_DATE),
    year INT
);
