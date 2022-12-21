-- viewAllEmployees
SELECT
	employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM
	employee
LEFT JOIN
	role ON employee.role_id = role.id
LEFT JOIN 
	department ON role.department_id = department.id
LEFT JOIN
	employee manager on manager.id = employee.manager_id;

-- viewAllRoles
SELECT
    role.id,
    role.title,
    department.name AS department,
    role.salary
FROM
    role
LEFT JOIN
    department ON role.department_id = department.id;

-- viewAllDepartments
SELECT * FROM department;

-- addEmployee
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (?, ?, ?, ?);

-- addRole
INSERT INTO role (title, salary, department_id) 
VALUES(?, ?, ?);

-- addDepartment
INSERT INTO department (name)
VALUES(?);

-- getNames
SELECT 
    id, 
    CONCAT(first_name, ' ', last_name) AS name 
FROM 
    employee;

-- getRoles
SELECT
    id,
    title
FROM
    role;

-- updateRole
UPDATE
    employee
SET
    role_id = ?
WHERE
    id = ?