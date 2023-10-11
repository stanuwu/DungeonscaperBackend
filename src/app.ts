import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import 'colorts/lib/string';

import TestRoute from './routes/TestRoute';

import ErrorHandler from './middleware/ErrorHandler';

dotenv.config();

const app = express();

app.use(morgan(process.env.MORGAN ?? 'tiny'));
app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, '/../public')));

app.use(express.json());
app.use('/test', TestRoute);

app.use(ErrorHandler.notFound);
app.use(ErrorHandler.handleError);

const PORT = process.env.PORT ?? 5000;
console.log(`Server is listening on port ${PORT}!`.cyan);

app.listen(PORT);
