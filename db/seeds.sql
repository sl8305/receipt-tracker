USE ReceiptTracker;

-- user login dummies
INSERT INTO Users (username, password) VALUES ('test1', 'password'), ('Catherine', 'password'), ('Aaron', 'password') ;

-- card dummies
INSERT INTO Cards (userId, card_number) VALUES (1, "0123"), (2, "2345"), (3, "1111"), (2, "9875");

-- receipt dummies
INSERT INTO Receipts (cardId, store_name, purchase_date, total_cost, category) VALUES ("0123", 'Union Deli', '2019-10-01', 10.50, 'food'),
("9875", 'Chowder', '2019-8-29', 12.50, 'food'),
("2345", 'OO ber', '2019-09-10', 5.50, 'travel'),
("2345", 'PASTA CITY', '2019-09-10', 22.50, 'food'),
("1111", 'Zara', '2019-09-11', 60.00, 'clothes');