----------------------------------------------------------
CREATE TABLE Users(
    id INTEGER NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    password INTEGER NOT NULL
);
ALTER TABLE Users
    ADD CONSTRAINT "USERS_PK"
        PRIMARY KEY(id);
----------------------------------------------------------
CREATE TABLE Products(
    id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    category INTEGER NULL
);
ALTER TABLE Products
    ADD CONSTRAINT "Products_PK"
        PRIMARY KEY(id);
----------------------------------------------------------
CREATE TABLE Orders(
     id INTEGER NOT NULL,
     user_id INTEGER NOT NULL,
     quantity INTEGER NOT NULL,
     status VARCHAR(255) NOT NULL,
     date DATE NOT NULL
);
ALTER TABLE Orders
    ADD CONSTRAINT  "ORDERS_PK"
        PRIMARY KEY(id);

ALTER TABLE Orders
    ADD CONSTRAINT "ORDERS_`user_id`_FK"
        FOREIGN KEY(user_id)
            REFERENCES Users(id);
----------------------------------------------------------
CREATE TABLE order_product(
    id INTEGER NOT NULL,
    order_id INTEGER NOT NULL,
    prod_id INTEGER NOT NULL
);
ALTER TABLE order_product
    ADD CONSTRAINT "ORDER_PRODUCT_PK"
        PRIMARY KEY(id);

ALTER TABLE order_product
    ADD CONSTRAINT "ORDER_PRODUCT_`prod_id`_FK"
        FOREIGN KEY(prod_id)
            REFERENCES Products(id);

ALTER TABLE order_product
    ADD CONSTRAINT "ORDER_PRODUCT_`order_id`_FK"
        FOREIGN KEY(order_id)
            REFERENCES Orders(id);
----------------------------------------------------------