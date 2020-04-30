import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import routes from './routes';

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

connectDB();

export default app;
