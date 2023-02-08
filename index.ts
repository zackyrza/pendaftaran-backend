import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import cities from './src/routes/city';
import sports from './src/routes/sport';
import users from './src/routes/user';
import classes from './src/routes/class';
import sportGenders from './src/routes/sportGender';
import registrations from './src/routes/registration';
import candidates from './src/routes/candidate';
import mails from './src/routes/mail';
import uploads from './src/routes/upload';

dotenv.config();

const app: Express = express();

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(express.static('./')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/cities', cities);
app.use('/api/sports', sports);
app.use('/api/users', users);
app.use('/api/classes', classes);
app.use('/api/sportGenders', sportGenders);
app.use('/api/registrations', registrations);
app.use('/api/candidates', candidates);
app.use('/api/mails', mails);
app.use('/api/uploads', uploads);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});