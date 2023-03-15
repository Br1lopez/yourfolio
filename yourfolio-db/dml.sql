use yourfolio;

INSERT INTO user (name, surname1, surname2, email, password) VALUES ("test@test.com", "contraseña", "Juan", "Pérez", "Rodríguez");

INSERT INTO file (url, description, user_id) VALUES ("/imgs/test.jpg", "Imagen de prueba", 1);

INSERT INTO portfolio (name, user_id) VALUES ("tema del portafolio", 1);

INSERT INTO project (name, description, thumbnail_id) VALUES ("Título del proyecto", "Descripción del proyecto", 1);

INSERT INTO tab (template, portfolio_id) VALUES ("plantilla de pestaña", 1);

INSERT INTO section (name, tab_id) VALUES ("Nombre de la sección", 1);

INSERT INTO style(bg_color, font_color, portfolio_id) VALUES ("black", "white", 1);

INSERT INTO file_project (file_id, project_id) VALUES (1, 1);

INSERT INTO section_project (section_id, project_id) VALUES (1, 1);