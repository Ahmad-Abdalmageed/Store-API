## API Endpoints

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