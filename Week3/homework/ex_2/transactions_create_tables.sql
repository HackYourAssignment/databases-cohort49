DROP DATABASE IF EXISTS account_db;
CREATE DATABASE account_db;
USE account_db;

CREATE TABLE account (
    account_number INT PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL
);

CREATE TABLE account_changes (
    change_number INT AUTO_INCREMENT PRIMARY KEY,
    account_number INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    changed_date DATE NOT NULL,
    remark VARCHAR(255),

    FOREIGN KEY (account_number) 
    REFERENCES account(account_number)
);