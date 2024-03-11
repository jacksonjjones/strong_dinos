const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "Bigdawg#1",
    database: "employee_db"
});

connection.connect(funciton (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    init();
});

function init() {    
}