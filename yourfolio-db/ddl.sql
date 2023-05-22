DROP DATABASE if EXISTS yourfolio;
CREATE database if not exists yourfolio;

use yourfolio;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    surname1 VARCHAR(255),
    surname2 VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE file (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    description VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);



CREATE TABLE element_type (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    male BOOL
);

CREATE TABLE element_type_children (
    parent_id VARCHAR(255),
    child_id VARCHAR(255),
    FOREIGN KEY (parent_id) REFERENCES element_type(id),
    FOREIGN KEY (child_id) REFERENCES element_type(id)
);



create table element (
	id INT AUTO_INCREMENT PRIMARY KEY,
	element_type_id VARCHAR(255),
	name VARCHAR(255),
    description VARCHAR(255),
    user_id INT,
    thumbnail_image_id INT,
    FOREIGN KEY (element_type_id) REFERENCES element_type(id),
    FOREIGN KEY (thumbnail_image_id) REFERENCES file(id)
);

CREATE TABLE element_children (
    parent_id INT,
    child_id INT,
    position INT,
    PRIMARY KEY (parent_id, child_id),
    FOREIGN KEY (parent_id) REFERENCES element(id),
    FOREIGN KEY (child_id) REFERENCES element(id)
);



CREATE TABLE style(
	id INT AUTO_INCREMENT PRIMARY KEY,
	bg_color VARCHAR(32),
	font_color VARCHAR(32),
	portfolio_id INT,
	font_family VARCHAR(64),
   FOREIGN KEY (portfolio_id) REFERENCES element(id)
);


CREATE TABLE element_file (
    file_id INT,
    element_id INT,
    PRIMARY KEY (file_id, element_id),
    FOREIGN KEY (file_id) REFERENCES file(id),
    FOREIGN KEY (element_id) REFERENCES element(id)
);


