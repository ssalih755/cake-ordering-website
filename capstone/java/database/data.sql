BEGIN TRANSACTION;

-- the password for both users is "password"
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER', 'user', 'user', 'user@gmail.com', '3303303303');
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN', 'admin', 'admin', 'admin@gmail.com','2622622622');
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('missy','$2y$10$gMwCv472n6HGgMgc4RqnieWV9fuydw2n4SY4gsvnvwI8NHYYBgqcG','ROLE_ADMIN', 'missy', 'harper', 'missy@gmail.com','2622622622');
INSERT INTO users (username,password_hash,role, firstname, lastname, email, phone) VALUES ('sarrah','$2y$10$gMwCv472n6HGgMgc4RqnieWV9fuydw2n4SY4gsvnvwI8NHYYBgqcG','ROLE_USER', 'sarrah', 'salih', 'sarrah@email.com','5556667778');

COMMIT TRANSACTION;
