----------------------------------------------------------
DROP TABLE IF EXISTS Orders CASCADE ;


CREATE TABLE Orders
(
    id      SERIAL      NOT NULL,
    user_id INTEGER     NOT NULL,
    status  VARCHAR(20) NOT NULL,
    date TIMESTAMP NOT NULL
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