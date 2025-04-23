BEGIN TRANSACTION;


DROP TABLE IF EXISTS orderDetails;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orderStatus;
DROP TABLE IF EXISTS cake;
DROP TABLE IF EXISTS cakeFlavor;
DROP TABLE IF EXISTS cakeSize;
DROP TABLE IF EXISTS cakeStyle;
DROP TABLE IF EXISTS cakeFrosting;
DROP TABLE IF EXISTS cakeFilling;
DROP TABLE IF EXISTS cakeType;
DROP TABLE IF EXISTS cakePrice;

--ROLLBACK;

CREATE TABLE users (
	user_id SERIAL,
	username varchar(50) NOT NULL UNIQUE,
	password_hash varchar(200) NOT NULL,
	firstname varchar(50) NOT NULL,
	lastname varchar(50) NOT NULL,
	email varchar(50) NOT NULL,
	phone varchar(10) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);


-- CAKE TABLE AND ADJACENT TABLES --

CREATE TABLE cakeFlavor(
cakeFlavor_id SERIAL PRIMARY KEY,
flavor varchar(40) NOT NULL UNIQUE,
isAvailable BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE cakeFrosting(
cakeFrosting_id SERIAL PRIMARY KEY,
frosting varchar(40) NOT NULL UNIQUE,
isAvailable BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE cakeFilling(
cakeFilling_id SERIAL PRIMARY KEY,
filling varchar(40) NOT NULL UNIQUE,
isAvailable BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE cakeStyle(
cakeStyle_id SERIAL PRIMARY KEY,
style varchar(25) NOT NULL UNIQUE,
isAvailable BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE cakeType(
cakeType_id SERIAL PRIMARY KEY,
type varchar(20) NOT NULL,
CONSTRAINT type CHECK (type= 'custom' OR type = 'standard')
);

CREATE TABLE cakePrice(
cakePrice_id SERIAL PRIMARY KEY,
price INTEGER NOT NULL
);

CREATE TABLE cakeSize(
    cakeSize_id SERIAL PRIMARY KEY,
    cakeStyle_id INTEGER NOT NULL,
    size varchar(20) NOT NULL UNIQUE,
    isAvailable BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT FK_SizeStyle FOREIGN KEY (cakeStyle_id) REFERENCES cakeStyle(cakeStyle_id)
);

CREATE TABLE cake (
    name VARCHAR(30) NOT NULL,
    imgURL VARCHAR(200) NOT NULL,
    cake_id SERIAL PRIMARY KEY,
    cakeFlavor_id INT NOT NULL,
    cakeFrosting_id INT NOT NULL,
    cakeFilling_id INT Not NULL,
    cakeStyle_id INT NOT NULL,
    cakeSize_id INT NOT NULL,
    cakeType_id INT NOT NULL,
    cakePrice_id INT NOT NULL,
    description VARCHAR(400) NOT NULL,
    isAvailable BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (cakeFlavor_id) REFERENCES cakeFlavor(cakeFlavor_id),
    FOREIGN KEY (cakeFrosting_id) REFERENCES cakeFrosting(cakeFrosting_id),
    FOREIGN KEY (cakeFilling_id) REFERENCES cakeFilling(cakeFilling_id),
    FOREIGN KEY (cakeStyle_id) REFERENCES cakeStyle(cakeStyle_id),
    FOREIGN KEY (cakeSize_id) REFERENCES cakeSize(cakeSize_id),
    FOREIGN KEY (cakeType_id) REFERENCES cakeType(cakeType_id),
    FOREIGN KEY (cakePrice_id) REFERENCES cakePrice(cakePrice_id)
);

CREATE TABLE orderStatus(
    id SERIAL PRIMARY KEY,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    orderStatus_id INT NOT NULL,
    pickup_date DATE  NULL,
    pickup_time TIME  NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT FK_user_id FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT FK_orderStatus_id FOREIGN KEY(orderStatus_id) REFERENCES orderStatus(id)
);

CREATE TABLE orderDetails(
    id SERIAL PRIMARY KEY,	
	order_id INT NOT NULL,
	cake_id INT NOT NULL,
	writing VARCHAR(150) NULL,
    cake_quantity INT NOT NULL,
	 CONSTRAINT FK_cake_id FOREIGN KEY(cake_id) REFERENCES cake(cake_id),
	CONSTRAINT FK_order_id FOREIGN KEY(order_id) REFERENCES orders(id)
	
);

COMMIT TRANSACTION;
