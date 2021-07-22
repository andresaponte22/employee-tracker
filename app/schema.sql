DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
  employee_id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT(11),
  PRIMARY KEY (employee_id)
); 

CREATE TABLE role (
  role_id INT NOT NULL,
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (role_id)
);

CREATE TABLE department (
  department_id INT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id)
);
