BEGIN TRANSACTION;

-- the password for both users is "password"
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER', 'customer', 'smith', 'user@gmail.com', '3303303303');
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN', 'admin', 'employee', 'admin@gmail.com','2622622622');
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
('Blackberry', TRUE);

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

-- Insert into cakeSize table
-- Note: cakeStyle_id references must match styles inserted above
INSERT INTO cakeSize (cakeStyle_id, size, isAvailable) VALUES
(1, '6-inch', TRUE),    -- Round, 6-inch
(1, '8-inch', TRUE),    -- Round, 8-inch
(1, '10-inch', TRUE),   -- Round, 10-inch
(2, '8x8-inch', TRUE),  -- Square, 8x8-inch
(2, '9x9-inch', TRUE),  -- Square, 9x9-inch
(3, '9x13-inch', TRUE), -- Sheet, 9x13-inch
(4, '2-tier', TRUE);    -- Tiered, 2-tier


-- Insert into cake table
-- Note: All foreign keys must reference IDs that exist in their respective tables
INSERT INTO cake (name, imgURL, cakeFlavor_id, cakeFrosting_id, cakeFilling_id, cakeStyle_id, cakeSize_id, cakeType_id, cakePrice, description, isAvailable) VALUES
('Double Chocolate Cake', 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/easy_chocolate_cake_31070_16x9.jpg', 1, 1, 2, 1, 2, 1, 30, 'Classic chocolate cake with buttercream frosting and chocolate mousse filling', TRUE),
('Vanilla Raspberry Cake', 'https://rainbowplantlife.com/wp-content/uploads/2020/11/raspberrycake-slicedmacro2281of129.jpg',2, 2, 1, 1, 1, 2, 10, 'Vanilla cake with cream cheese frosting and raspberry filling', TRUE),
('Red Velvet Cake', 'https://handletheheat.com/wp-content/uploads/2013/04/easy-red-velvet-cake-recipe.jpg',3, 2, 1, 2, 4, 1, 30, 'Red velvet cake with cream cheese frosting', TRUE),
('Double Lemon Cake', 'https://www.sainsburysmagazine.co.uk/uploads/media/720x770/04/13044-elderflower-lemon-cake-v2.jpg?v=1-0',4, 4, 3, 3, 6, 1, 40, 'Lemon cake with whipped cream frosting and lemon curd filling', TRUE),
('Carrot Cakes', 'https://joyfoodsunshine.com/wp-content/uploads/2022/08/carrot-cake-cupcakes-recipe-8.jpg',5, 2, 2, 5, 7, 1, 30, 'Carrot cake with cream cheese frosting', TRUE),
('Two Tiered Cake', 'https://126432146.cdn6.editmysite.com/uploads/1/2/6/4/126432146/I6CGHG7VAUUMXJ2WIR2ZRKP6.jpeg?width=2400&optimize=medium',1, 3, 2, 4, 7, 1, 50, '2-tier chocolate cake with ganache frosting and chocolate mousse filling', TRUE),
('Double Vanilla Cake', 'https://thescranline.com/wp-content/uploads/2025/02/VANILLA-CAKE-25-WEB-04.jpg',2, 5, 4, 1, 3, 1, 40, 'vanilla cake with fondant and vanilla custard filling', TRUE);

-- Insert into orderStatus table
INSERT INTO orderstatus(status)
VALUES ('Pending'),
('InProgress'),
('Ready'),
('Completed'), 
('Canceled')
;

-- insert into orders table
INSERT INTO orders(user_id, orderstatus_id, pickup_date, pickup_time) VALUES
(1, 1, '2025-05-26', '12:00'),
(2, 2, '2025-05-27', '9:00'),
(3, 3, '2025-05-27', '10:00'),
(1, 1, '2025-05-29', '8:00'),
(2, 2, '2025-05-29', '10:00'),
(3, 3, '2025-05-29', '16:00'),
(1, 4, '2025-05-30', '12:00'),
(2, 3, '2025-05-30', '14:00'),
(1, 4, '2025-05-30', '15:00'),
(2, 4, '2025-05-30', '17:00'),
(3, 3, '2025-05-30', '10:00'),
(1, 4, '2025-06-01', '11:00'),
(2, 4, '2025-06-02', '10:00'),
(3, 3, '2025-06-05', '10:00'),
(1, 4, '2025-06-26', '13:00'),
(2, 4, '2025-06-27', '13:00'),
(3, 3, '2025-06-27', '15:00');

-- Insert into orderDetails table
INSERT INTO orderdetails(order_id, cake_id, writing, cake_quantity)
VALUES
((SELECT id FROM orders WHERE user_id = 1 AND orderstatus_id = 1 AND pickup_date = '2025-05-26' AND pickup_time = '12:00'), 1, 'happy birthday!', 1),
((SELECT id FROM orders WHERE user_id = 2 AND orderstatus_id = 2 AND pickup_date = '2025-05-27' AND pickup_time = '09:00'), 2, '', 1),
((SELECT id FROM orders WHERE user_id = 3 AND orderstatus_id = 3 AND pickup_date = '2025-05-27' AND pickup_time = '10:00'), 3, 'cake writing 2!', 1),
((SELECT id FROM orders WHERE user_id = 1 AND orderstatus_id = 1 AND pickup_date = '2025-05-29' AND pickup_time = '08:00'), 4, '', 1),
((SELECT id FROM orders WHERE user_id = 2 AND orderstatus_id = 2 AND pickup_date = '2025-05-29' AND pickup_time = '10:00'), 5, '', 1),
((SELECT id FROM orders WHERE user_id = 3 AND orderstatus_id = 3 AND pickup_date = '2025-05-29' AND pickup_time = '16:00'), 6, 'cake writing 3!', 1),
((SELECT id FROM orders WHERE user_id = 1 AND orderstatus_id = 4 AND pickup_date = '2025-05-30' AND pickup_time = '12:00'), 7, '', 1),
((SELECT id FROM orders WHERE user_id = 2 AND orderstatus_id = 3 AND pickup_date = '2025-05-30' AND pickup_time = '14:00'), 1, '', 1),
((SELECT id FROM orders WHERE user_id = 1 AND orderstatus_id = 4 AND pickup_date = '2025-05-30' AND pickup_time = '15:00'), 2, '', 1),
((SELECT id FROM orders WHERE user_id = 2 AND orderstatus_id = 4 AND pickup_date = '2025-05-30' AND pickup_time = '17:00'), 3, 'cake writing 4!', 1),
((SELECT id FROM orders WHERE user_id = 3 AND orderstatus_id = 3 AND pickup_date = '2025-05-30' AND pickup_time = '10:00'), 4, '', 1),
((SELECT id FROM orders WHERE user_id = 1 AND orderstatus_id = 4 AND pickup_date = '2025-06-01' AND pickup_time = '11:00'), 5, '', 1),
((SELECT id FROM orders WHERE user_id = 2 AND orderstatus_id = 4 AND pickup_date = '2025-06-02' AND pickup_time = '10:00'), 6, '', 1),
((SELECT id FROM orders WHERE user_id = 3 AND orderstatus_id = 3 AND pickup_date = '2025-06-05' AND pickup_time = '10:00'), 7, '', 1),
((SELECT id FROM orders WHERE user_id = 1 AND orderstatus_id = 4 AND pickup_date = '2025-06-26' AND pickup_time = '13:00'), 1, 'cake writing 5!', 1),
((SELECT id FROM orders WHERE user_id = 2 AND orderstatus_id = 4 AND pickup_date = '2025-06-27' AND pickup_time = '13:00'), 2, '', 1),
((SELECT id FROM orders WHERE user_id = 3 AND orderstatus_id = 3 AND pickup_date = '2025-06-27' AND pickup_time = '15:00'), 3, '', 1);
COMMIT TRANSACTION;

