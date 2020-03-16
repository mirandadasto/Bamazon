DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NULL,
  department_name VARCHAR(255) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("Play-Doh", "Toys & Games", 7.99, 3),   
    ("Fire TV Stick", "Electronics", 39.99, 6),   
    ("Wyze Cam Pan", "Camera & Photo", 37.98, 5),   
    ("Animal Crossing", "Video Games", 59.99, 30),   
    ("$10 PlayStation Store Gift Card [Digital Code]", "Video Games", 10.00, 8),   
    ("Victure 1080P FHD WiFi Camera with Motion Tracking Sound Detection", "Camera & Photo", 29.99, 10),   
    ("Acer Monitor", "Electronics", 89.99, 1),   
    ("Guess Who?", "Toys & Games", 9.97, 7),   
    ("My First Learn to Write Workook", "Books", 5.69, 17),   
    ("School Zone - Big First Grade Workbook", "Books", 6.89, 12)