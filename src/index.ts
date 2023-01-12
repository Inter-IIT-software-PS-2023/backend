import express, { Express, Request, Response } from 'express';
import { AppDataSource } from './config';
import dotenv from 'dotenv';
import router from './routes/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
// import router from './routes/algo';

dotenv.config();

const app: Express = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT

app.use("/route", router)
// app.use("/algo", router)

AppDataSource.initialize()
  .then(() => {
    console.log("connected successfully");
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log("Error", err));

