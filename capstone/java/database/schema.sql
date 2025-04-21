BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	user_id SERIAL,
	username varchar(50) NOT NULL UNIQUE,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);


-- CAKE TABLE AND ADJACENT TABLES --
CREATE TABLE cake (
cake_id SERIAL,
cakeFlavor_id INT NOT NULL FOREIGN KEY (cakeFlavor_id) REFERENCES cakeFlavor(cakeFlavor_id),
cakeFrosting_id INT NOT NULL FOREIGN KEY (cakeFrosting_id) REFERENCES cakeFrosting(cakeFrosting_id),
cakeFilling_id INT NOT NULL FOREIGN KEY ( cakeFilling_id) REFERENCES cakeFilling(cakeFilling_id),
cakeStyle_id INT NOT NULL FOREIGN KEY ( cakeSize_id) REFERENCES cakeStyle(cakeStyle_id),
cakeSize_id INT NOT NULL FOREIGN KEY (cakeSize_id) REFERENCES cakeSize(cakeSize_id),
cakeType_id INT NOT NULL FOREIGN KEY (cakeType_id) REFERENCES cakeType(cakeType_id),
cakePrice_id INT NOT NULL FOREIGN KEY (cakePrice_id) REFERENCES cakePrice(cakePrice_id),
cakeWriting_id INT NOT NULL FOREIGN KEY (cakeWriting_id) REFERENCES cakeWriting(cakeWriting_id),
isAvailable BOOLEAN NOT NULL DEFAULT TRUE;

)

CREATE TABLE cakeFlavor(
cakeFlavor_id SERIAL PRIMARY KEY,
flavor varchar(40) NOT NULL UNIQUE,
isAvailable BOOLEAN NOT NULL DEFAULT TRUE;
)

CREATE TABLE cakeFrosting(
cakeFrosting_id SERIAL PRIMARY KEY,
frosting varchar(40) NOT NULL UNIQUE,
isAvailable BOOLEAN NOT NULL DEFAULT TRUE;
)

CREATE TABLE cakeFilling(
cakeFilling_id SERIAL PRIMARY KEY,
filling varchar(40) NOT NULL UNIQUE,
isAvailable BOOLEAN NOT NULL DEFAULT TRUE;
)

CREATE TABLE cakeStyle(
cakeStyle_id SERIAL PRIMARY KEY,
style varchar(25) NOT NULL UNIQUE,
isAvailable BOOLEAN NOT NULL DEFAULT TRUE;
)

CREATE TABLE cakeSize(
cakeSize_id SERIAL PRIMARY KEY,
style_id INTEGER NOT NULL,
size varchar(20) NOT NULL UNIQUE,
isAvailable BOOLEAN NOT NULL DEFAULT TRUE,
CONSTRAINT FK_SizeStyle FOREIGN KEY (style_id) REFERENCES style(style_id);
)

CREATE TABLE cakeType(
cakeType_id SERIAL PRIMARY KEY,
type varchar(20) NOT NULL,
CONSTRAINT type CHECK (type= 'custom' OR type = 'standard');
)

CREATE TABLE cakePrice(
cakePrice_id SERIAL PRIMARY KEY,
price INTEGER NOT NULL;
)

CREATE TABLE cakeWriting (
cakeWriting_id SERIAL PRIMARY KEY,
price INT NOT NULL DEFAULT 5,  --HARDCODE PRICE AS 5 IN CONTROLLER QUERY--
writing varchar(100) NOT NULL,
isAvailable BOOLEAN NOT NULL DEFAULT TRUE;
)


--


COMMIT TRANSACTION;
