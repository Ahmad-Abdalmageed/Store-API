import express from 'express';
import { usersRouter } from './Handlers/Users';
import { prodRouter } from './Handlers/Products';
import { errorHandler } from './Middleware/errorHandler';
import { orderRouter } from './Handlers/Orders';
import { authenticate } from './Middleware/auth';
import { notFound } from './Middleware/notFound';
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();

// Routes & Middlewares
app.use(express.json());

app.use('/api/v1/store/users', authenticate, usersRouter);
app.use('/api/v1/store/orders', authenticate, orderRouter);
app.use('/api/v1/store/products', prodRouter);

app.use(notFound);
app.use(errorHandler);
// Server
const startServer = (PORT: number) => {
  try {
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
