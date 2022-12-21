const inquirer = require('inquirer');
const { menuPrompt } = require('./src/questions');
const { viewAllEmployees, addEmployee, deleteEmployee } = require('./src/employee');

// Presents Title Screen and User Menu
function init() {
    // Present title screen
    console.log("Presenting menu screen");
    mainMenu();
}

// Runs mainMenu prompt and calls the corresponding function based on user choice
function mainMenu() {
    inquirer.prompt(menuPrompt).then((answers) => {
        switch(answers.menuPrompt) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Update Employee Role':
                // updateRole();
                break;
            case 'Add Role':

                break;
            case 'Delete Role':
                
                break;
            case 'View All Departments':

                break;
            case 'Add Department':

                break;
            case 'Delete Department':
                
                break;
            case 'Update Employees By Managers':

                break;
            case 'View Employees By Manager':

                break;
            case 'View Budget By Department':

                break;
            case 'Quit':
                console.log("Quitting application");
                return;
            default:
                console.log("Selecting default option...");
                return;
        }
        mainMenu();
    });
}

init();