import express, { Request, Response } from 'express';
import cors from 'cors';
import { usersRouter } from './Handlers/Users';
import { prodRouter } from './Handlers/Products';
import { errorHandler } from './Middleware/errorHandler';
import { orderRouter } from './Handlers/Orders';
import { authenticate } from './Middleware/auth';
import { notFound } from './Middleware/notFound';
import dotenv from 'dotenv';
import { client } from './db';

dotenv.config();

const app: express.Application = express();

// Routes & Middlewares
app.use(express.json());
app.use(cors);

app.use('/api/v1/store/users', usersRouter);
app.use('/api/v1/store/orders', authenticate, orderRouter);
app.use('/api/v1/store/products', prodRouter);

app.use(notFound);
app.use(errorHandler);
// Server

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'HELLO !!!' });
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

startServer(Number(process.env.PORT) || 3000);

// For Testing Purposes
export { app };
