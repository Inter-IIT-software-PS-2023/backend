import express, { Express, Request, Response } from 'express';
import { AppDataSource } from './config';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Test route');
});

AppDataSource.initialize()
  .then(() => {
    console.log("connected successfully");
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log("Error", err));

