const inquirer = require('inquirer')
const mysql = require('mysql')

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

        case "view all roles":
          viewRoles()
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

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
});