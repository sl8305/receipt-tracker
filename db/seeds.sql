USE ReceiptTracker;

-- user login dummies
INSERT INTO Users (username, password) VALUES ('test1', 'password');
INSERT INTO Users (username, password) VALUES ('Catherine', 'password');
INSERT INTO Users (username, password) VALUES ('Aaron', 'password');

-- receipt dummies
INSERT INTO Receipts (card_number, store_name, purchase_date, total_cost, category, user_id) VALUES ("0123", 'Union Deli', '2019-10-01', 10.50, 'food', 1),
("0123", 'Chowder', '2019-8-29', 12.50, 'food', 1),
("2345", 'OO ber', '2019-09-10', 5.50, 'travel', 2),
("2345", 'PASTA CITY', '2019-09-10', 22.50, 'food', 2),
("1111", 'Zara', '2019-09-11', 60.00, 'clothes', 3);