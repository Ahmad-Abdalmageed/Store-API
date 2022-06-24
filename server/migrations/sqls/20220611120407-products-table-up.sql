----------------------------------------------------------
DROP TABLE IF EXISTS Products CASCADE ;


DROP TABLE IF EXISTS Products CASCADE ;

CREATE TABLE Products
(
    id       SERIAL       NOT NULL,
    name     VARCHAR(100) NOT NULL,
    price    INTEGER      NOT NULL,
    category VARCHAR(100) NULL
);
ALTER TABLE Products
    ADD CONSTRAINT "Products_PK"
        PRIMARY KEY(id);
----------------------------------------------------------