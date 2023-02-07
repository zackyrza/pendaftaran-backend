import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cities from './src/routes/city';
import sports from './src/routes/sport';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/cities', cities);
app.use('/api/sports', sports);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});