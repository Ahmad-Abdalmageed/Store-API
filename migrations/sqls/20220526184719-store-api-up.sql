----------------------------------------------------------
CREATE TABLE Users(
                      id        SERIAL      NOT NULL,
                      username  VARCHAR(30) NOT NULL,
                      firstname VARCHAR(20) NOT NULL,
                      lastname  VARCHAR(20) NOT NULL,
                      password  VARCHAR     NOT NULL
);
ALTER TABLE Users
    ADD CONSTRAINT "USERS_PK"
        PRIMARY KEY(id);
----------------------------------------------------------
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
CREATE TABLE Orders
(
    id      SERIAL      NOT NULL,
    user_id INTEGER     NOT NULL,
    status  VARCHAR(20) NOT NULL,
    date    DATE        NOT NULL
);
ALTER TABLE Orders
    ADD CONSTRAINT "ORDERS_PK"
        PRIMARY KEY (id);

ALTER TABLE Orders
    ADD CONSTRAINT "ORDERS_`user_id`_FK"
        FOREIGN KEY (user_id)
            REFERENCES Users (id)
            ON DELETE CASCADE;
----------------------------------------------------------
CREATE TABLE order_product
(
    id       SERIAL  NOT NULL,
    order_id INTEGER NOT NULL,
    prod_id  INTEGER NOT NULL,
    quantity INTEGER NOT NULL
);
ALTER TABLE order_product
    ADD CONSTRAINT "ORDER_PRODUCT_PK"
        PRIMARY KEY (id);

ALTER TABLE order_product
    ADD CONSTRAINT "ORDER_PRODUCT_`prod_id`_FK"
        FOREIGN KEY (prod_id)
            REFERENCES Products (id)
            ON DELETE CASCADE;

ALTER TABLE order_product
    ADD CONSTRAINT "ORDER_PRODUCT_`order_id`_FK"
        FOREIGN KEY (order_id)
            REFERENCES Orders (id)
            ON DELETE CASCADE;
----------------------------------------------------------