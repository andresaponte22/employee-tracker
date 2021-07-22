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

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (role_id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andres", "Aponte", 1, 1), ("Alfonso", "Aponte", 2, 2), ("Orlando", "Gray", 3, 1), ("John", "Dasilva", 4, 1);

INSERT INTO department(department_id, name)
VALUES (1, "Sales"), (2, "Software"), (3, "Stats"), (4, "Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("Sales Lead", 60000, 1), ("Front End", 80000, 2), ("Lead Stats", 100000, 3), ("Software Engineer", 100000, 2), ("Lawyer", 200000, 4);