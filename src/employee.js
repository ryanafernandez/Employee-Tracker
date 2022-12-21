const cTable = require('console.table');

function viewAllEmployees(data) {
    console.log(data);
}

function addEmployee() {
    console.log("adding employee");
}

function deleteEmployee() {
    console.log("deleting employee");
}

module.exports = {
    viewAllEmployees,
    addEmployee,
    deleteEmployee
};