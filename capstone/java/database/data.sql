BEGIN TRANSACTION;

-- the password for both users is "password"
INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

-- populates tables once they're created
-- use this file to populate tables with flavors, cake styles, fillings, icings, sizes, etc.


---- Insert into cakeFlavor table
--INSERT INTO cakeFlavor (flavor, isAvailable) VALUES
--('Chocolate', TRUE),
--('Vanilla', TRUE),
--('Red Velvet', TRUE),
--('Lemon', TRUE),
--('Carrot', TRUE);
--
---- Insert into cakeFrosting table
--INSERT INTO cakeFrosting (frosting, isAvailable) VALUES
--('Buttercream', TRUE),
--('Cream Cheese', TRUE),
--('Chocolate Ganache', TRUE),
--('Whipped Cream', TRUE),
--('Fondant', TRUE);
--
---- Insert into cakeFilling table
--INSERT INTO cakeFilling (filling, isAvailable) VALUES
--('Raspberry', TRUE),
--('Chocolate Mousse', TRUE),
--('Lemon Curd', TRUE),
--('Vanilla Custard', TRUE),
--('None', TRUE);
--
---- Insert into cakeStyle table
--INSERT INTO cakeStyle (style, isAvailable) VALUES
--('Round', TRUE),
--('Square', TRUE),
--('Sheet', TRUE),
--('Tiered', TRUE),
--('Cupcakes', TRUE);
--
---- Insert into cakeType table
--INSERT INTO cakeType (type) VALUES
--('custom'),
--('standard');
--
---- Insert into cakePrice table
--INSERT INTO cakePrice (price) VALUES
--(2500),  -- $25.00
--(3500),  -- $35.00
--(4500),  -- $45.00
--(6000),  -- $60.00
--(7500);  -- $75.00
--
---- Insert into cakeSize table
---- Note: cakeStyle_id references must match styles inserted above
--INSERT INTO cakeSize (cakeStyle_id, size, isAvailable) VALUES
--(1, '6-inch', TRUE),    -- Round, 6-inch
--(1, '8-inch', TRUE),    -- Round, 8-inch
--(1, '10-inch', TRUE),   -- Round, 10-inch
--(2, '8x8-inch', TRUE),  -- Square, 8x8-inch
--(2, '9x9-inch', TRUE),  -- Square, 9x9-inch
--(3, '9x13-inch', TRUE), -- Sheet, 9x13-inch
--(4, '2-tier', TRUE),    -- Tiered, 2-tier
--(5, 'dozen', TRUE);     -- Cupcakes, dozen
--
---- Insert into cake table
---- Note: All foreign keys must reference IDs that exist in their respective tables
--INSERT INTO cake (cakeFlavor_id, cakeFrosting_id, cakeFilling_id, cakeStyle_id, cakeSize_id, cakeType_id, cakePrice_id, description, isAvailable) VALUES
--(1, 1, 2, 1, 2, 2, 3, 'Classic chocolate cake with buttercream frosting and chocolate mousse filling, 8-inch round', TRUE),
--(2, 2, 1, 1, 1, 2, 2, 'Vanilla cake with cream cheese frosting and raspberry filling, 6-inch round', TRUE),
--(3, 2, NULL, 2, 4, 2, 3, 'Red velvet cake with cream cheese frosting, 8x8-inch square', TRUE),
--(4, 4, 3, 3, 6, 2, 4, 'Lemon cake with whipped cream frosting and lemon curd filling, 9x13-inch sheet', TRUE),
--(5, 2, NULL, 5, 8, 2, 3, 'Carrot cake cupcakes with cream cheese frosting, dozen', TRUE),
--(1, 3, 2, 4, 7, 1, 5, 'Custom 2-tier chocolate cake with ganache frosting and chocolate mousse filling', TRUE),
--(2, 5, 4, 1, 3, 1, 4, 'Custom vanilla cake with fondant and vanilla custard filling, 10-inch round', TRUE);


COMMIT TRANSACTION;
