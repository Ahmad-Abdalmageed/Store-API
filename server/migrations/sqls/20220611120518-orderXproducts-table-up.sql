----------------------------------------------------------
DROP TABLE IF EXISTS order_product CASCADE ;


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