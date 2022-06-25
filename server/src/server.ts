import express, { Request, Response } from 'express';
import { usersRouter } from './Handlers/Users';
import { prodRouter } from './Handlers/Products';
import { errorHandler } from './Middleware/errorHandler';
import { orderRouter } from './Handlers/Orders';
import { authenticate } from './Middleware/auth';
import { notFound } from './Middleware/notFound';
import { client } from './db';
import config from './config';

const app: express.Application = express();

// Routes & Middlewares
// CORS Access Permission
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 1);

  // Pass to next layer of middleware
  next();
});
app.use(express.json());

app.use('/api/v1/store/users', usersRouter);
app.use('/api/v1/store/orders', authenticate, orderRouter);
app.use('/api/v1/store/products', prodRouter);

app.use(notFound);
app.use(errorHandler);
// Server

app.get('/', (req: Request, res: Response) => {
  res.send(
    '<h1>Store Front API</h1>\nSee Documentation at <a href="https://github.com/Ahmad-Abdalmageed/Store-API">Documentation</a>'
  );
});

const startServer = async (PORT: number) => {
  try {
    const db = await client.connect();
    console.log('DB Connected !!');
    db.release();
    app.listen(PORT, () => {
      console.log(`Server Started on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer(Number(config.PORT) || 3000);

// For Testing Purposes
export { app };
