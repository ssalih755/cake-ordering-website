BEGIN TRANSACTION;

INSERT INTO users (username,password_hash,role,firstname, lastname, email, phone) VALUES ('user1','user1','ROLE_USER','user1first', 'user1last', 'user1@gmail.com', '6146146144');
INSERT INTO users (username,password_hash,role,firstname, lastname, email, phone) VALUES ('user2','user2','ROLE_USER', 'user2first', 'user2last', 'user2@gmail.com', '6126126122');
INSERT INTO users (username,password_hash,role,firstname, lastname, email, phone) VALUES ('user3','user3','ROLE_USER','user3first', 'user3last', 'user3@gmail.com', '6136136133');

-- Insert into cakeFlavor table
INSERT INTO cakeFlavor (flavor, isAvailable)
VALUES ('Chocolate', TRUE);

-- Insert into cakeFrosting table
INSERT INTO cakeFrosting (frosting, isAvailable)
VALUES ('Buttercream', TRUE);

-- Insert into cakeFilling table
INSERT INTO cakeFilling (filling, isAvailable)
VALUES ('Raspberry', TRUE);

-- Insert into cakeStyle table
INSERT INTO cakeStyle (style, isAvailable)
VALUES ('Round', TRUE);

-- Insert into cakeType table
INSERT INTO cakeType (type)
VALUES ('standard');

-- Insert into cakePrice table
INSERT INTO cakePrice (price)
VALUES (25);

-- Insert into cakeSize table
INSERT INTO cakeSize (cakeStyle_id, size, isAvailable)
VALUES (1, '8-inch', TRUE);


INSERT INTO cake (cake_id, cakeFlavor_id, cakeFrosting_id, cakeFilling_id, cakeStyle_id,
                   cakeSize_id, cakeType_id, cakePrice_id,description,isAvailable)
                   VALUES ( 'chocolate cake', 'www.cakes.org', 1, 1, 1, 1,1, 1,1,1, 'a nice chocolatey cake' , true);

INSERT INTO cake (cake_id, cakeFlavor_id, cakeFrosting_id, cakeFilling_id, cakeStyle_id,
                   cakeSize_id, cakeType_id, cakePrice_id,description,isAvailable)
                   VALUES ( 'lemon cake', 'www.cakes.org', 2, 1, 1, 1, 1, 1, 1, 1, 'a nice lemony cake', true);

COMMIT TRANSACTION;
