use yourfolio;

INSERT INTO user (name, email, surname1, surname2, password) VALUES ('John', 'john@example.com', 'Doe', 'Smith', 'password123');
INSERT INTO image (url, description, user_id) VALUES ('https://example.com/image1', 'Description for image 1', 1);

INSERT INTO element_type (id, name, male) VALUES ('portfolio', 'Portfolio', true), ('tab', 'Tab', false), ('project', 'Project', true), ('section', 'Section', false), ('vertical-carousel-gallery', 'Galería (Vertical)', false), ('artwork', 'Imagen con título y descripción', false);
insert into element_type_children (parent_id, child_id) values ('portfolio', 'vertical-carousel-gallery');
insert into element_type_children (parent_id, child_id) values ('vertical-carousel-gallery', 'artwork');

INSERT INTO `element` (element_type_id, name, description, thumbnail_image_id) VALUES ('portfolio', 'Portfolio de Juanjo','Soy Juanjo y este es mi portfolio', 1);
INSERT INTO `element` (element_type_id, name, description, thumbnail_image_id) VALUES ('tab', 'Tab 1','Description for Element Group 1', 1);
INSERT INTO `element` (element_type_id, name, description, thumbnail_image_id) VALUES ('project', 'project 1','Description for Element Group 1', 1);
INSERT INTO `style` (font_family, bg_color, font_color, portfolio_id) VALUES ('Montserrat', '#FFFFFF', '#000000', 1);
INSERT INTO element_image (image_id, element_id) VALUES (1, 3);
INSERT INTO element_children (parent_id, child_id, position) VALUES (1, 2, 1);
INSERT INTO element_children (parent_id, child_id, position) VALUES (2, 3, 1);