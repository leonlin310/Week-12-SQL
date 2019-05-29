DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;


CREATE TABLE `bamazon`.`products` (
  `item_id` INT NOT NULL,
  `product_name` VARCHAR(45) NULL,
  `department_name` VARCHAR(45) NULL,
  `price` INT(10) NULL,
  `stock_quantity` INT NULL,
  PRIMARY KEY (`item_id`)
  );

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "PS4", "electronics", 400, 1000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "XBOX 360", "electronics", 350, 900);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Nintendo", "electronics", 300, 150);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Nike", "shoes", 50, 400);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Adidas", "shoes", 40, 450);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Puma", "shoes", 35, 800);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Bobbleheads", "toys", 20, 1500);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Rubiks Cube", "toys", 5, 2000);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Chess Sets", "toys", 15, 2400);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Funko Pops", "toys", 10, 3000);
