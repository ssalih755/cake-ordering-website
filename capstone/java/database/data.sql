BEGIN TRANSACTION;

-- the password for both users is "password"
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER', 'user', 'user', 'user@gmail.com', '3303303303');
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN', 'admin', 'admin', 'admin@gmail.com','2622622622');
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('missy','$2y$10$gMwCv472n6HGgMgc4RqnieWV9fuydw2n4SY4gsvnvwI8NHYYBgqcG','ROLE_ADMIN', 'missy', 'harper', 'missy@gmail.com','2622622622');
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('sarrah','$2y$10$gMwCv472n6HGgMgc4RqnieWV9fuydw2n4SY4gsvnvwI8NHYYBgqcG','ROLE_USER', 'sarrah', 'salih', 'sarrah@email.com','5556667778');

-- populates tables once they're created
-- use this file to populate tables with flavors, cake styles, fillings, icings, sizes, etc.


-- Insert into cakeFlavor table
INSERT INTO cakeFlavor (flavor, isAvailable) VALUES
('Chocolate', TRUE),
('Vanilla', TRUE),
('Red Velvet', TRUE),
('Lemon', TRUE),
('Carrot', TRUE);

-- Insert into cakeFrosting table
INSERT INTO cakeFrosting (frosting, isAvailable) VALUES
('Buttercream', TRUE),
('Cream Cheese', TRUE),
('Chocolate Ganache', TRUE),
('Whipped Cream', TRUE),
('Fondant', TRUE);

-- Insert into cakeFilling table
INSERT INTO cakeFilling (filling, isAvailable) VALUES
('Raspberry', TRUE),
('Chocolate Mousse', TRUE),
('Lemon Curd', TRUE),
('Vanilla Custard', TRUE),
('None', TRUE);

-- Insert into cakeStyle table
INSERT INTO cakeStyle (style, isAvailable) VALUES
('Round', TRUE),
('Square', TRUE),
('Sheet', TRUE),
('Tiered', TRUE),
('Cupcakes', TRUE);

-- Insert into cakeType table
INSERT INTO cakeType (type) VALUES
('standard'),
('custom');

-- Insert into cakePrice table
INSERT INTO cakePrice (price) VALUES
(2500),  -- $25.00
(3500),  -- $35.00
(4500),  -- $45.00
(6000),  -- $60.00
(7500);  -- $75.00

-- Insert into cakeSize table
-- Note: cakeStyle_id references must match styles inserted above
INSERT INTO cakeSize (cakeStyle_id, size, isAvailable) VALUES
(1, '6-inch', TRUE),    -- Round, 6-inch
(1, '8-inch', TRUE),    -- Round, 8-inch
(1, '10-inch', TRUE),   -- Round, 10-inch
(2, '8x8-inch', TRUE),  -- Square, 8x8-inch
(2, '9x9-inch', TRUE),  -- Square, 9x9-inch
(3, '9x13-inch', TRUE), -- Sheet, 9x13-inch
(4, '2-tier', TRUE),    -- Tiered, 2-tier
(5, 'dozen', TRUE);     -- Cupcakes, dozen

-- Insert into cake table
-- Note: All foreign keys must reference IDs that exist in their respective tables
INSERT INTO cake (name, imgURL, cakeFlavor_id, cakeFrosting_id, cakeFilling_id, cakeStyle_id, cakeSize_id, cakeType_id, cakePrice_id, description, isAvailable) VALUES
('Double Chocolate Cake', 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg', 1, 1, 2, 1, 2, 1, 3, 'Classic chocolate cake with buttercream frosting and chocolate mousse filling', TRUE),
('Vanilla Raspberry Cake', 'https://rainbowplantlife.com/wp-content/uploads/2020/11/raspberrycake-slicedmacro2281of129.jpg',2, 2, 1, 1, 1, 2, 1, 'Vanilla cake with cream cheese frosting and raspberry filling', TRUE),
('Red Velvet Cake', 'https://handletheheat.com/wp-content/uploads/2013/04/easy-red-velvet-cake-recipe.jpg',3, 2, NULL, 2, 4, 1, 3, 'Red velvet cake with cream cheese frosting', TRUE),
('Double Lemon Cake', 'https://www.sainsburysmagazine.co.uk/uploads/media/720x770/04/13044-elderflower-lemon-cake-v2.jpg?v=1-0',4, 4, 3, 3, 6, 1, 4, 'Lemon cake with whipped cream frosting and lemon curd filling', TRUE),
('Carrot Cupcakes', 'https://joyfoodsunshine.com/wp-content/uploads/2022/08/carrot-cake-cupcakes-recipe-8.jpg',5, 2, NULL, 5, 8, 1, 3, 'Carrot cake cupcakes with cream cheese frosting', TRUE),
('Two Tiered Cake', 'https://126432146.cdn6.editmysite.com/uploads/1/2/6/4/126432146/I6CGHG7VAUUMXJ2WIR2ZRKP6.jpeg?width=2400&optimize=medium',1, 3, 2, 4, 7, 1, 5, '2-tier chocolate cake with ganache frosting and chocolate mousse filling', TRUE),
('Double Vanilla Cake', 'https://thescranline.com/wp-content/uploads/2025/02/VANILLA-CAKE-25-WEB-04.jpg',2, 5, 4, 1, 3, 1, 4, 'vanilla cake with fondant and vanilla custard filling', TRUE);


INSERT INTO orderstatus(status)
VALUES ('Pending'), 
('Ready'),
('Completed'), 
('Canceled');

COMMIT TRANSACTION;
