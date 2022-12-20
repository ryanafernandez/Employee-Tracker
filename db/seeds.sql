INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Data Analyst", 71000, 1),
       ("Sales Representative", 55000, 1),
       ("Sales Manager", 80000, 1),
       ("Engineer", 80000, 2),
       ("Engineering Technician", 60000, 2),
       ("Project Manager", 90000, 2),
       ("Help Desk Technician", 50000, 3),
       ("System Administrator", 75000, 3),
       ("Network Engineer", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Smith", 3, NULL),
       ("Ken", "Kim", 1, 1),
       ("Elena", "Conway", 2, 1),
       ("Raphael", "Zuniga", 2, 1),
       ("Fred", "Burke", 2, 1),
       ("Martina", "Barnett", 4, 9),
       ("Poppy", "Cisneros", 4, 9),
       ("Sam", "Fitzpatrick", 5, 9),
       ("Lori", "Beasley", 6, NULL),
       ("Iona", "Caldwell", 7, 13),
       ("Cruz", "Diaz", 7, 13),
       ("Mariam", "Hanna", 8, 13),
       ("Dulce", "English", 9, NULL);