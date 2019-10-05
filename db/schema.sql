DROP DATABASE IF EXISTS ReceiptTracker;
CREATE DATABASE ReceiptTracker;
USE ReceiptTracker;

-- Table holding the user log in information
CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(16) NOT NULL,
    PRIMARY KEY (id)
);

-- Table holding the receipts
CREATE TABLE Receipts (
    id INT NOT NULL AUTO_INCREMENT,
    -- possible issues with numbers starting with 0 (possibly switch this to a string)
    card_number VARCHAR(4) NOT NULL,
    store_name VARCHAR(45) NOT NULL,
    --  YYYY-MM-DD
    purchase_date DATE NOT NULL,
    total_cost FLOAT(20,2) NOT NULL,
    category VARCHAR(45) NOT NULL,
    -- will be filled out by authentication when logged in
    user_id INT NOT NULL,
    PRIMARY KEY (id)
);