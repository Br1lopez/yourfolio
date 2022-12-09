use yourfolio;

INSERT INTO user (email, password, name, surname1, surname2) VALUES ("test@test.com", "contraseña", "Juan", "Pérez", "Rodríguez");

INSERT INTO file (type, data, user_id) VALUES ("pdf", "datos de prueba", 1);

INSERT INTO portfolio (theme, user_id) VALUES ("tema del portafolio", 1);

INSERT INTO project (title, description, user_id) VALUES ("Título del proyecto", "Descripción del proyecto", 1);

INSERT INTO tab (template, portfolio_id) VALUES ("plantilla de pestaña", 1);

INSERT INTO section (name, tab_id) VALUES ("Nombre de la sección", 1);

INSERT INTO file_project (file_id, project_id) VALUES (1, 1);

INSERT INTO section_project (section_id, project_id) VALUES (1, 1);