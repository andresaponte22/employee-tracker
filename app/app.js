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
  connection.query('Select * FROM role', async (err, roles) => {
    if (err) throw err; 
    
    connection.query('Select * FROM employee WHERE manager_id IS NULL', async (err, managers) => {
      if (err) throw err; 

    managers = managers.map(manager => ({name:manager.first_name + " " + manager.last_name, value: manager.id}));
    managers.push({name:"None"});

    const responses = await inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first name?: "
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name?: "
        },
        {
          name: "role_id",
          type: "list",
          message: "What is the employee's role?: ",
          choices: roles.map(role => ({name: role.title, value: role.id}))
        },
      ]).then(function(response) {
        connection.query(
          'INSERT INTO employee SET ?',
          {
            first_name: response.first_name,
            last_name: response.last_name,
            role_id: response.role_id
          },
          function(err) {
            if (err) throw err;
            console.log("Succes: Employee added");
            start();
          }
      )
    })
  })
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
      message: "What is the name of the department you would like to add?: "
    },
  ])
  .then(function(response) {
    connection.query(
      "INSERT INTO department SET ?",
      {
        departmentName: response.name,
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

function addRole() {
  var query = "SELECT title, salary FROM role INNER JOIN department ON role.department_id = department.department_id;";
    connection.query(query, function(err, results) {
      if (err) throw err;
    inquirer
    .prompt([
      {
        name: "roleName",
        type: "input",
        message: "What is the name of the role you would like to add?: "
      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the salary for this role?: ",
      },
    ])
    .then(function(response) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title_name: response.roleName,
          salary: response.roleSalary,
        },
        function(err) {
          if (err) throw err;
          console.log("Success: Role created succesfully.")
          start();
        }
      )
    })
  })
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected as id ${connection.threadId}`);
  start();
});