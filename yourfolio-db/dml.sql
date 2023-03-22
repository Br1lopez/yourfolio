use yourfolio;

INSERT INTO user (name, surname1, surname2, email, password) VALUES ("Joaquín", "Jiménez", "Rodríguez", "test@test.com", "contraseña");

INSERT INTO file (url, description, user_id) VALUES ("/imgs/test.jpg", "Imagen de unos macarrones", 1);

INSERT INTO portfolio (name, user_id) VALUES ("Joaquín Jiménez - Cocinero", 1);

INSERT INTO project (name, description, thumbnail_id) VALUES ("Macarrones", "Macarrones con queso", 1);

INSERT INTO tab (name, portfolio_id) VALUES ("Pasta italiana", 1);

INSERT INTO section (name, tab_id) VALUES ("global", 1);

INSERT INTO style(bg_color, font_color, portfolio_id) VALUES ("black", "white", 1);

INSERT INTO file_project (file_id, project_id) VALUES (1, 1);

INSERT INTO section_project (section_id, project_id) VALUES (1, 1);