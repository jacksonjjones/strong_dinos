INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Marketing"),
       ("Landscaping");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineering Manager", 150000, 1),
       ("Engineering Lead", 100000, 1),
       ("Engineering Staff", 75000, 1),
       ("Sales Manager", 75000, 2),
       ("Sales Person", 40000, 2),
       ("Finance Manager", 80000, 3),
       ("Accountant", 70000, 3),
       ("Marketing Manager", 85000, 4),
       ("Marketing Lead", 65000, 4),
       ("Market Coordinator", 55000, 4),
       ("Landscaping Manager", 60000, 5),
       ("Landscaper", 40000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Trinity", "Legill", 1, NULL),("Maya", "Stratman", 2, 1),("Julie", "Jones", 3, 1),("Juan", "Nieto", 4, NULL),("Dale", "Rae", 5, 4),("Patrick", "Mahomes", 6, NULL),("Travis", "Kelce", 7, 6),("Mike", "Williams", 8, NULL),("Alan", "Pulido", 9, 8),("Ryan", "Gosling", 10, 8),("Shane", "Jones", 11, NULL),("Dan", "Jones", 12, 11);
       

