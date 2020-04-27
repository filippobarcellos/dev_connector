import express from 'express';
import connectDB from './config/database';
import routes from './routes';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(routes);

connectDB();

export default app;
