import express from 'express';
import dotenv from 'dotenv';
import { usersRouter } from './Handlers/Users';
import { errorHandler } from './Middleware/errorHandler';
dotenv.config();
const app: express.Application = express();

// Routes & Middlewares
app.use(express.json());

app.use('/api/v1/store/users', usersRouter);

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
