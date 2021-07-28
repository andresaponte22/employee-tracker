const inquirer = require('inquirer')
const mysql = require('mysql')
const cTable = require('console.table')

// connection
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

// main menu
const start = () => {
  inquirer
    .prompt([
      {
        name: "menuChoice",
        type: "rawlist",
        message: "What would you like to do?",
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
        
        case "EXIT":
          break;
        }
    });
};


// functions
// views all
function employeesViewAll() {
  const query = "SELECT employee_id, first_name, last_name, title, department_name, salary, manager_id FROM ((role INNER JOIN employee ON role.role_id = employee.role_id) INNER JOIN department ON role.department_id = department.department_id);"
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
async function addEmployee() {
  connection.query('Select * FROM role', async (err, roles) => {
    if (err) throw err; 
    const responses = await inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?:",
          name: "first_name"
        },
        {
          type: "input",
          message: "What is the employee's last name?:",
          name: "last_name"
        },
        {
          type: "input",
          message: "What is the employee's role id?:",
          name: "role_id"
        }
      ]);
    connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: responses.first_name,
          last_name: responses.last_name,
          role_id: responses.role_id
        },
        (err, res) => {
          if (err) throw err;
          console.log("Sucess: New employee added.");
          start();
        }
    )
})
};

function addDepartment() {
  connection.query("SELECT * FROM department", function(err) {
  if (err) throw err;
  inquirer
  .prompt([
    {
      name: "departmentName",
      type: "input",
      message: "What is the name of the department you would like to add?:"
    },
  ])
  .then(function(response) {
    connection.query(
      "INSERT INTO department SET ?",
      {
        department_name: response.departmentName,
      },
      function(err) {
        if (err) throw err;
        console.log("Success: Department added");
        start();
      }
    );
  });
})
}

async function addRole() {
  const responses = await inquirer
  .prompt([
    {
      name: 'title',
      type: 'input',
      message: 'What is the new role?:',
    },
    {
      name: 'salary',
      type: 'number',
      message: "What is the role's salary?:",
    },
    {
      name: 'department',
      type: 'input',
      message: 'What is the department id the role is in?:'
    }
  ])

  connection.query(
    'INSERT INTO employee_db.role SET ?',
    {
      title: responses.title,
      salary: responses.salary,
      department_id: responses.department,
    },
    (err) => {
      if (err) throw err;
      console.log('Success: New role added')
      start();
  })
}
;