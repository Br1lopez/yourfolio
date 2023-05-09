use yourfolio;

INSERT INTO user (name, email, surname1, surname2, password) VALUES ('John', 'john@example.com', 'Doe', 'Smith', 'password123');
INSERT INTO file (url, description, user_id) VALUES ('https://example.com/file1', 'Description for File 1', 1);

INSERT INTO element_type (id, name) VALUES ('portfolio', 'Portfolio'), ('tab', 'Tab'), ('project', 'Project'), ('section', 'Section'), ('artwork-gallery', 'Artwork Gallery'), ('artwork', 'Artwork');
INSERT INTO element (element_type_id, name, description, thumbnail_file_id) VALUES ('portfolio', 'Portfolio de Juanjo','Soy Juanjo y este es mi portfolio', 1);
INSERT INTO element (element_type_id, name, description, thumbnail_file_id) VALUES ('tab', 'Tab 1','Description for Element Group 1', 1);
INSERT INTO element (element_type_id, name, description, thumbnail_file_id) VALUES ('project', 'project 1','Description for Element Group 1', 1);
INSERT INTO style (font_family, bg_color, font_color, portfolio_id) VALUES ('Arial', '#FFFFFF', '#000000', 1);
INSERT INTO element_file (file_id, element_id) VALUES (1, 3);
INSERT INTO element_element (parent_id, child_id, position) VALUES (1, 2, 1);
INSERT INTO element_element (parent_id, child_id, position) VALUES (2, 3, 1);