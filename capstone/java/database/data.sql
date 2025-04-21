BEGIN TRANSACTION;

-- the password for both users is "password"
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER', 'user', 'user', 'user@gmail.com', '3303303303');
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN', 'admin', 'admin', 'admin@gmail.com','2622622622');

COMMIT TRANSACTION;
