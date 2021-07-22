const inquirer = require('inquirer')
const mysql = require('mysql')
const cTable = require('console.table')

let connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employee_db'
})

connection.connect(function(err) {
  if (err) throw err
  start()
});

const start = () => {
  inquirer
    .prompt([
      {
        name: "menuChoice",
        type: "list",
        message: "What would you like to do? ",
        choices: [
          "View all employees",
          "View all departments",
          "View all roles",
          "Add employee",
          "Add department",
          "Add role",
          "Update employee role",
          "EXIT"
        ]
      },
    ]).then(function(response) {
      switch (response.menuChoice) {
        case "View all employees":
          employeesViewAll()
          break

        case "View all departments":
          departmentsViewAll()
          break

        case "View all roles":
          rolesViewAll()
          break

        case "Add employee":
          addEmployee()
          break
        
        case "Add department":
          addDepartment()
          break

        case "Add role":
          addRole()
          break

        case "Update employee role":
          updateEmployeeRole()
          break
        
        case "EXIT":
          connection.end();
          break;
        }
    });
};


// functions
// views all
function employeesViewAll() {
  const query = "SELECT employee_id, first_name, last_name, title_name, department_name, salary, manager_id FROM ((role INNER JOIN employee ON role.role_id = employee.role_id) INNER JOIN department ON role.department_id = department.department_id);"
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res)
    start();
  })
}

function departmentsViewAll() {
  const query = "SELECT department_name FROM department;";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res)
    start();
})
}

function rolesViewAll() {
  const query = "SELECT title, salary, department_name FROM role INNER JOIN department ON role.department_id = department.department_id;";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res)
    start();
})
}

// functions
// adds
function addEmployee() {
  
}

function addDepartment() {
  
}

function addRole() {

}

function updateEmployeeRole() {

}

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
});