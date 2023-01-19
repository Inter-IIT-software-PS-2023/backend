import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import orderRouter from './routes/orders';
import riderRouter from './routes/rider';

dotenv.config();

const app: Express = express()
app.use(cors({ origin: '*' }))
app.use(bodyParser.json({limit: '10mb'}))
const port = process.env.PORT

app.use("/orders", orderRouter)
app.use("/rider", riderRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})