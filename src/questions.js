const menuPrompt = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menuPrompt',
        choices: [
            'View All Employees',
            'Add Employee',
            'Delete Employee',
            'Update Employee Role',
            'Add Role',
            'Delete Role',
            'View All Departments',
            'Add Department',
            'Delete Department',
            'Update Employees By Managers',
            'View Employees By Manager',
            'Delete Department, Roles, and Employees',
            'View Budget By Department',
            'Quit'
        ],
    },
];

module.exports = {
    menuPrompt
};