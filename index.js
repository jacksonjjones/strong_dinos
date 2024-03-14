const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bigdawg#1",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    runApp();
});

function runApp() {
    inquirer.prompt({
        name: 'startQuestions',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Department', 'Add Role', 'Update An Employee Role', 'Quit']
    }).then(function (answer) {

        switch (answer.startQuestions) {
            case "View All Employees":
                viewAllEmployees();
                break;

            case "View All Departments":
                viewAllDepartments();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Update An Employee Role":
                updateEmployee();
                break;

            case "Quit":
                connection.end();
                break;
        }

    });
}

function viewAllEmployees() {
    const query = `
        SELECT 
            e.id AS Employee_ID,
            e.first_name AS First_Name,
            e.last_name AS Last_Name,
            r.title AS Job_Title,
            d.name AS Department,
            r.salary AS Salary,
            CONCAT(m.first_name, ' ', m.last_name) AS Manager
        FROM 
            employee e
        INNER JOIN 
            role r ON e.role_id = r.id
        INNER JOIN 
            department d ON r.department_id = d.id
        LEFT JOIN 
            employee m ON e.manager_id = m.id`;

    connection.query(query, function (err, data) {
        if (err) {
            console.error("Error retrieving employee data:", err);
            return;
        }
        console.table(data);
        runApp();
    });
}

function viewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        runApp();
    });
}

function viewAllRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        console.table(data);
        runApp();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "roleId",
            message: "What is the employee's role ID?"
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the employee's manager ID?"
        }
    ]).then(function (res) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
            if (err) throw err;
            console.log("Added Employee!");
            runApp();
        });
    });
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you would like to add?"
    }, ]).then(function (res) {
        connection.query("INSERT INTO department (name) VALUES (?)", [res.department], function (err, data) {
            if (err) throw err;
            console.table(["Added Department!"]);
            runApp();
        });
    });
}

function addRole() {
    inquirer.prompt([{
            message: "Enter role title:",
            type: "input",
            name: "title"
        },
        {
            message: "Enter salary:",
            type: "number",
            name: "salary"
        },
        {
            message: "Enter department ID:",
            type: "number",
            name: "department_id"
        },
    ]).then(function (res) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [res.title, res.salary, res.department_id], function (err, data) {
            if (err) throw err;
            console.table(["Added Role!"]);
            runApp();
        });
    });
}

function updateEmployee() {
    inquirer.prompt([{
            message: "Which employee would you like to update? (first name)",
            type: "input",
            name: "name"
        },
        {
            message: "Enter the new role ID:",
            type: "number",
            name: "role_id"
        },
    ]).then(function (res) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.role_id, res.name], function (err, data) {
            if (err) throw err;
            console.table(["Updated Role!"]);
            runApp();
        });
    });
}








