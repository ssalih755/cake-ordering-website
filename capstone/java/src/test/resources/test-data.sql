BEGIN TRANSACTION;

INSERT INTO users (username,password_hash,role) VALUES ('user1','user1','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('user2','user2','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('user3','user3','ROLE_USER');

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
                   VALUES ( 1, 1, 1, 1,1, 1,1,1, 'a nice chocolatey cake' , true);

INSERT INTO cake (cake_id, cakeFlavor_id, cakeFrosting_id, cakeFilling_id, cakeStyle_id,
                   cakeSize_id, cakeType_id, cakePrice_id,description,isAvailable)
                   VALUES ( 2, 1, 1, 1, 1, 1, 1, 1, 'a nice lemony cake', true);

COMMIT TRANSACTION;
