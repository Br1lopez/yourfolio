use yourfolio;

INSERT INTO user (name, email, surname1, surname2, password) VALUES ('John', 'john@example.com', 'Doe', 'Smith', 'password123');
INSERT INTO file (url, description, user_id) VALUES ('https://example.com/file1', 'Description for File 1', 1);
INSERT INTO portfolio (name, user_id) VALUES ('Portfolio 1', 1);
INSERT INTO style (bg_color, font_color, portfolio_id) VALUES ('#FFFFFF', '#000000', 1);
INSERT INTO element (type, name, position, description, thumbnail_file_id) VALUES ('element-group', 'Element Group 1', 1, 'Description for Element Group 1', 1);
INSERT INTO element (type, name, position, description, thumbnail_file_id) VALUES ('element-group', 'Element Group 1', 1, 'Description for Element Group 1', 1);
INSERT INTO element_file (file_id, element_id) VALUES (1, 1);
INSERT INTO element_element (parent_id, child_id) VALUES (1, 2);
INSERT INTO element_portfolio (element_id, portfolio_id) VALUES (1, 1);