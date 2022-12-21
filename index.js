const inquirer = require('inquirer');
require('console.table');
const connection = require('./config/connection');

const { menuPrompt, addEmployeePrompt, addRolePrompt, updateRolePrompt1, updateRolePrompt2, addDeptPrompt } = require('./src/questions');

// Presents Title Screen and User Menu
async function init() {
    // Present title screen
    console.log("Presenting menu screen");
    mainMenu();
}
                
// Runs mainMenu prompt and calls the corresponding function based on user choice
async function mainMenu() {
    await inquirer.prompt(menuPrompt).then((answers) => {
        switch(answers.menuPrompt) {
            case 'View All Employees':
                connection.promise().query('SELECT * FROM employee')
                    .then( ([rows, fields]) => {
                        console.log('\n\n');
                        console.table(rows);
                        mainMenu();
                    });
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View All Roles':
                connection.promise().query('SELECT * FROM role')
                    .then( ([rows, fields]) => {
                        console.log('\n\n');
                        console.table(rows);
                        mainMenu();
                    });
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Departments':
                connection.promise().query('SELECT * FROM department')
                    .then( ([rows, fields]) => {
                        console.log('\n\n');
                        console.table(rows);
                        mainMenu();
                    });
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                console.log("Quitting application");
                connection.end();
                return;
            default:
                console.log("Selecting default option...");
                connection.end();
                return;
        }
    });
}

async function addEmployee() {
    await inquirer.prompt(addEmployeePrompt).then((answers) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;
        const params = [ answers.first_name, answers.last_name, answers.role_id, answers.manager_id ];
        connection.promise().query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        })
        mainMenu();
    });
}

async function addRole() {
    await inquirer.prompt(addRolePrompt).then((answers) => {
        let title = answers.title;
        let salary = answers.salary;
        let department_id;
        switch (answers.department) {
            case 'Sales':
                department_id = 1;
                break;
            case 'Engineering':
                department_id = 2;
                break;
            case 'IT':
                department_id = 3;
                break;
            default:
                department_id = 1;
        }

        const sql = `INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)`;
        const params = [ title, salary, department_id];
        connection.promise().query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
        mainMenu();
    });
}

async function addDepartment() {
    await inquirer.prompt(addDeptPrompt).then((answers) => {
        const sql = `INSERT INTO department (name) VALUES(?)`;
        const params = answers.name;
        connection.promise().query(sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        });
        mainMenu();
    });
}

async function updateEmployeeRole() {
    const names = [];
    const roles = [];

    const sqlNames = `SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee`;
    const sqlRoles = `SELECT id, title FROM role`;
    const sqlUpdate = `UPDATE employee SET role_id = ? WHERE id = ?`;

    // Run sqlNames query to pull all employee names and store into names array
    connection.promise().query(sqlNames)
    .then( ([rows, fields]) => {
        rows.forEach(row => {
            names.push(row.name);
        });
        // Prompt the user to select which employee they would like to update
        inquirer
            .prompt({
                type: 'list',
                message:'Which employee would you like to update?',
                name: 'name',
                choices: names,
            })
            .then((employee) => {
                // Find the employee's id in the employee table
                const id = names.findIndex(element => element == employee.name) + 1;

                // Run sqlRoles query to pull all roles and store into roles array
                connection.promise().query(sqlRoles)
                .then( ([rows, fields]) => {
                    rows.forEach(row => {
                        roles.push(row.title);
                    })
                    // Prompt the user to select what the employee's new role is
                    inquirer.prompt({
                        type: 'list',
                        name: 'newRole',
                        message: 'What is the employee\'s new role?',
                        choices: roles,
                    })
                    .then((role) => {
                        // Find the corresponding role_id in the role table
                        const roleId = roles.findIndex(element => element == role.newRole) + 1;
                        const params = [ roleId, id ];

                        // Run sqlUpdate query to update the employee table
                        connection.promise().query(sqlUpdate, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(result);
                        });

                        // Return to the main menu
                        mainMenu();
                    });
                });
            });  
    });
}

init();