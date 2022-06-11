----------------------------------------------------------
DROP TABLE IF EXISTS Users CASCADE ;

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