# Storefront API
### Getting Started
All you need is to run the following commandyarn to startt 
```shell
yarn
```

### API Refrence 
## Products

- Index

```http
  GET '/api/v1/store/products/'
```

- Show

```http
  GET '/api/v1/store/products/:pid'
```

- Create : Authentication Added

```http
  POST '/api/v1/store/products/'
```

- Delete

```http
  DELETE '/api/v1/store/products/:pid'
```

## Users

- Index: including Authentication

```http
  GET '/api/v1/store/users'
```

- Show

```http
  GET '/api/v1/store/users/:uid'
```

- Create

```http
  POST '/api/v1/store/users/'
```

- Delete

```http
  DELETE '/api/v1/store/users/:uid'
```

- Sign In

```http
  GET '/api/v1/store/users/login'
```

## Orders

All Routes include Authentication

- Index

```http
  GET '/api/v1/store/orders/'
```

- Show

```http
  GET '/api/v1/store/orders/:oid'
```

- Create

```http
  POST '/api/v1/store/orders/'
```

- Delete

```http
  DELETE '/api/v1/store/orders/:oid'
```

- Current Orders by User

```http
  GET '/api/v1/store/orders/users/:uid'
```

## Data Shapes

#### Product

TABLE Products
(
id SERIAL NOT NULL, name VARCHAR(100) NOT NULL, price INTEGER NOT NULL, category VARCHAR(100) NULL
);

#### User

TABLE Users(
id SERIAL NOT NULL, username VARCHAR(30) NOT NULL, firstname VARCHAR(20) NOT NULL, lastname VARCHAR(20) NOT NULL,
password VARCHAR NOT NULL
);
#### Orders

TABLE Orders
(
id SERIAL NOT NULL, user_id INTEGER NOT NULL, status VARCHAR(20) NOT NULL, date DATE NOT NULL
);

TABLE order_product
(
id SERIAL NOT NULL, order_id INTEGER NOT NULL, prod_id INTEGER NOT NULL, quantity INTEGER NOT NULL
);
<img height="400" src="/home/ahmad-lap/Projects/BackEnd ND/Store-API/imgs/schema.png"/>

### FOR SUBMISSION PURPOSES ONLY
POSTGRES_HOST=127.0.0.1\
POSTGRES_DB=store_api\
POSTGRES_DB_TEST=store_api_test\
POSTGRES_USER=store_api\
POSTGRES_PASSWORD=store_api_ahmed\
ENV=dev\
PORT=3000\
BCRYPT_PASSWORD=store_api_ahmed\
SALT_ROUNDS=10\
TOKEN_SECRET=store_api_123\