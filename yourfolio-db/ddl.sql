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

CREATE TABLE project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    thumbnail_id INT,
    user_id INT,
    FOREIGN KEY (thumbnail_id) REFERENCES file(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE tab (
    id INT AUTO_INCREMENT PRIMARY KEY,
    template VARCHAR(255),
    portfolio_id INT,
    FOREIGN KEY (portfolio_id) REFERENCES portfolio(id)
);

CREATE TABLE section (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    tab_id INT,
    FOREIGN KEY (tab_id) REFERENCES tab(id)
);

CREATE TABLE style(
	id INT AUTO_INCREMENT PRIMARY KEY,
	bg_color VARCHAR(32),
	font_color VARCHAR(32),
	portfolio_id INT,
   FOREIGN KEY (portfolio_id) REFERENCES portfolio(id)
);

CREATE TABLE file_project (
    file_id INT,
    project_id INT,
    PRIMARY KEY (file_id, project_id),
    FOREIGN KEY (file_id) REFERENCES file(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE section_project (
    section_id INT,
    project_id INT,
    PRIMARY KEY (section_id, project_id),
    FOREIGN KEY (section_id) REFERENCES section(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);
