const menuPrompt = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menuPrompt',
        choices: [
            'View All Employees',
            'Add Employee',
            'View All Roles',
            'Add Role',
            'Update Employee Role',
            'View All Departments',
            'Add Department',
            'Quit'
        ],
    },
];

const addEmployeePrompt = [
    {
        type: 'input',
        message: 'What is the employee\'s first name?',
        name: 'first_name', 
    },
    {
        type: 'input',
        message: 'What is the employee\'s last name?',
        name: 'last_name',
    },
    {
        type: 'input',
        message: 'What is the employee\'s role id?',
        name: 'role_id',
    },
    {
        type: 'input',
        message: 'What is the employee\'s manager id?',
        name: 'manager_id',
    },
];

const addDeptPrompt = [
    {
        type: 'input',
        message: 'What is the name of the department you would like to add?',
        name: 'name',
    }
];

module.exports = {
    menuPrompt,
    addDeptPrompt,
    addEmployeePrompt
};