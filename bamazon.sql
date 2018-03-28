DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INTEGER(100),
  stock_quantity INTEGER(100) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tea", "Food" , 2, 30), ("Guitar", "Musical Instruments", 50, 3 ), ("TV", "Electronics", 300, 5 ), ("Toaster", "Electronics", 25, 6 ), ("Thin Mints", "Food", 5, 50 ), ("Coffee", "Food", 4, 15 ), ("Desk", "Furniture", 80, 7 ), ("Guitar Strings", "Musical Instruments", 10, 45 ), ("Head Phones", "Electronics", 5, 12 ), ("Granola Bars", "Food", 5, 18 );

SELECT * FROM products;