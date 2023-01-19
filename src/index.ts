import express, { Express, Request, Response } from 'express';
import { AppDataSource } from './config';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import orderRouter from './routes/orders';
import riderRouter from './routes/rider';

dotenv.config();

const app: Express = express()
app.use(cors({origin: '*'}))
app.use(bodyParser.json())
const port = process.env.PORT

app.use("/orders", orderRouter)
app.use("/rider", riderRouter)

AppDataSource.initialize()
  .then(() => {
    console.log("connected successfully");
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log("Error", err));

