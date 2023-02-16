import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';

// initialize environment variables
dotenv.config({
    path: path.join(__dirname, '../', `.env.${process.env.NODE_ENV}`)
});

// initialize express service
const app = express();

// middleware
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => res.send('Hello World'));
app.get('/foo', (req, res) => res.json({ bar: 'This API is lit!' }));

export default app;
