CREATE DATABASE pai1 DEFAULT CHARACTER SET utf8;
CREATE USER IF NOT EXISTS pai_operator@localhost IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON pai1.* TO pai_operator@localhost;

USE pai1;

CREATE TABLE auctions (
    auction_id INT AUTO_INCREMENT PRIMARY KEY,
    auction_title VARCHAR(255) NOT NULL,
    offers_start DATETIME NOT NULL,
    offers_stop DATETIME NOT NULL,
    description TEXT,
    contracting_party VARCHAR(255) NOT NULL,
    max_value DECIMAL(10,2) NOT NULL
);

CREATE TABLE offers (
    offer_id INT AUTO_INCREMENT PRIMARY KEY,
    auction_id INT,
    contractor VARCHAR(255) NOT NULL,
    offer_value DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auction_id) REFERENCES auctions(auction_id)
);
