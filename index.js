const inquirer = require('inquirer');
require('console.table');
const connection = require('./config/connection');
const Queries = require('./lib/Queries');
const { menuPrompt, addEmployeePrompt, addDeptPrompt } = require('./src/questions');

// Queries class contains all of the called SQL queries
const sql = new Queries();
  
// Runs the menu prompt and calls the corresponding function based on the user's choice
async function mainMenu() {
    await inquirer.prompt(menuPrompt).then((answers) => {
        switch(answers.menuPrompt) {
            case 'View All Employees':
                runViewQuery(sql.viewAllEmployees);
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View All Roles':
                runViewQuery(sql.viewAllRoles);
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Departments':
                runViewQuery(sql.viewAllDepartments);
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

// Function for running queries that will only print tables to the console and return to menu
async function runViewQuery(query) {
    connection.promise().query(query)
    .then( ([rows, fields]) => {
        console.log('\n\n');
        console.table(rows);
        mainMenu();
    });
}

// Prompts user for employee's name, role id, and manager id. Once answered, adds new employee to db
async function addEmployee() {
    await inquirer.prompt(addEmployeePrompt).then((answers) => {
        const params = [ answers.first_name, answers.last_name, answers.role_id, answers.manager_id ];

        connection.promise().query(sql.addEmployee, params, (err, results) => {
            if (err) {
                console.log(err);
            }
        });
        mainMenu();
    });
}

async function addRole() {
    const departments = [];

    // Run sql.getDepartments query to pull all department names and store into departments array
    connection.promise().query(sql.getDepartments)
    .then( ([rows, fields]) => {
        rows.forEach(row => {
            departments.push(row.name);
        });
    })

    // Prompt for getting role info from user
    await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role you would like to add?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'What is the role\'s salary?',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'What department does this role belong to?',
            name: 'department',
            choices: departments,
        },
    ])
    .then((newRole) => {
        // Find the corresponding id in the department table
        const department_id = departments.findIndex(element => element == newRole.department) + 1;
        const params = [ newRole.title, newRole.salary, department_id ];

        // Run sql.addRole query to insert new role into role table
        connection.promise().query(sql.addRole, params, (err, results) => {
            if (err) {
                console.log(err);
            }
        });

        // Return to the main menu
        mainMenu();
    });
}

// Functionally similar to addEmployee. Prompts user for department name and inserts into corresponding table
async function addDepartment() {
    await inquirer.prompt(addDeptPrompt).then((answers) => {
        const params = answers.name;
        
        connection.promise().query(sql.addDepartment, params, (err, result) => {
            if (err) {
                console.log(err);
            }
        });
        mainMenu();
    });
}

// This function first stores all employee names into an array so that they can be used in an
// inquirer prompt as a 'list', allowing the user to select which employee to update by name.
// Similarly, all roles are stored in an array, allowing the user to select which role to assign
// the employee by role name.
// Lastly, the function updates the employee's role_id in the db.
async function updateEmployeeRole() {
    const names = [];
    const roles = [];

    // Run sqlNames query to pull all employee names and store into names array
    connection.promise().query(sql.getNames)
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
                connection.promise().query(sql.getRoles)
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
                        connection.promise().query(sql.updateRole, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                        });

                        // Return to the main menu
                        mainMenu();
                    });
                });
            });  
    });
}

mainMenu();