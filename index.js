const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const { menuPrompt } = require('./src/questions');
const { viewAllEmployees, addEmployee, deleteEmployee } = require('./src/employee');
const { updateRole, addRole, deleteRole } = require('./src/role');
const { viewAllDepartments, addDepartment, deleteDepartment } = require('./src/departments');

const PORT = process.env.PORT || 3001;
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees_db'
});

connection.connect(function (err) {
    if (err) throw err;
});

// Presents Title Screen and User Menu
async function init() {
    
    // Present title screen
    console.log("Presenting menu screen");
    mainMenu();
}

// Runs mainMenu prompt and calls the corresponding function based on user choice
function mainMenu() {
    inquirer.prompt(menuPrompt).then((answers) => {
        switch(answers.menuPrompt) {
            case 'View All Employees':
                connection.promise().query('SELECT * FROM employee')
                    .then ( ([rows, fields]) => {
                        viewAllEmployees(rows);
                        mainMenu();
                    })
                    .catch(console.log)
                    .then( () => connection.end());
                
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Delete Role':
                deleteRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Delete Department':
                deleteDepartment();
                break;
            case 'Update Employees By Managers':
                // select manager
                // select employee
                // select column to update
                // edit more?
                break;
            case 'View Employees By Manager':
                // select manager
                break;
            case 'View Budget By Department':
                // select department
                break;
            case 'Quit':
                console.log("Quitting application");
                return;
            default:
                console.log("Selecting default option...");
                return;
        }
        
    });
}

init();

module.exports = {
    connection,
    mysql
};