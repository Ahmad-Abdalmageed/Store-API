
--  Using cascaded to easily drop foreign keys from other tables
DROP TABLE IF EXISTS Users CASCADE ;
DROP TABLE IF EXISTS Products CASCADE ;
DROP TABLE IF EXISTS Orders CASCADE ;
DROP TABLE IF EXISTS order_product CASCADE ;
