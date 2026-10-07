CREATE DATABASE IF NOT EXISTS deploy_practice;
USE deploy_practice;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, description) VALUES
('Laptop Stand', 999.00, 'Simple adjustable laptop stand.'),
('Wireless Mouse', 599.00, 'Basic wireless mouse for everyday use.'),
('Keyboard', 1299.00, 'Compact keyboard for work and study.');
