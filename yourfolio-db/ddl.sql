DROP DATABASE if EXISTS yourfolio;
CREATE database if not exists yourfolio;

use yourfolio;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    surname1 VARCHAR(255),
    surname2 VARCHAR(255),
    password VARCHAR(32)
);

CREATE TABLE file (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255),
    description VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE style(
	id INT AUTO_INCREMENT PRIMARY KEY,
	bg_color VARCHAR(32),
	font_color VARCHAR(32),
	portfolio_id INT,
   FOREIGN KEY (portfolio_id) REFERENCES portfolio(id)
);


create table element (
	id INT AUTO_INCREMENT PRIMARY KEY,
	type ENUM('element', 'element-group'),
	name VARCHAR(255),
    position INT,
    description VARCHAR(255),
    thumbnail_file_id INT,
    portfolio_id INT,
    FOREIGN KEY (thumbnail_file_id) REFERENCES file(id),
    FOREIGN KEY (portfolio_id) REFERENCES portfolio(id)
);


CREATE TABLE element_file (
    file_id INT,
    element_id INT,
    PRIMARY KEY (file_id, element_id),
    FOREIGN KEY (file_id) REFERENCES file(id),
    FOREIGN KEY (element_id) REFERENCES element(id)
);

CREATE TABLE element_element (
    parent_id INT,
    child_id INT,
    PRIMARY KEY (parent_id, child_id),
    FOREIGN KEY (parent_id) REFERENCES element(id),
    FOREIGN KEY (child_id) REFERENCES element(id)
);
