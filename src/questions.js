const menuPrompt = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menuPrompt',
        choices: [
            'View All Employees',
            'Add Employee',
            // 'Delete Employee',
            'View All Roles',
            'Add Role',
            'Update Employee Role',
            // 'Delete Role',
            'View All Departments',
            'Add Department',
            // 'Delete Department',
            // 'Update Employees By Managers',
            // 'View Employees By Manager',
            // 'View Budget By Department',
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

const addRolePrompt = [
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
        choices: [
            'Sales',
            'Engineering',
            'IT'
        ],
    },
];

const updateRolePrompt1 = [
    {
        type: 'input',
        message: 'What is the role id of the role you would like to update?',
        name: 'id',
    }
];

const updateRolePrompt2 = [
    {
        type: 'input',
        message: 'Enter the new role title (press \'Enter\' if unchanged)',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Enter the new role salary (press \'Enter\' if unchanged)',
        name: 'salary',
    },
    {
        type: 'input',
        message: 'Enter the new role department id (press \'Enter\' if unchanged)',
        name: 'department_id',
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
    addRolePrompt,
    addDeptPrompt,
    addEmployeePrompt,
    updateRolePrompt1,
    updateRolePrompt2
};