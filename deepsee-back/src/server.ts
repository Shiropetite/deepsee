import path from 'path';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectToDatabase } from './database';
import jobRouter from './routers/job-router';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

app.listen(port, async () => {
    await connectToDatabase();
    console.warn(`Server is running at http://localhost:${port}`);
});

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/job-offers', jobRouter);

app.use('/api/files', express.static(path.join(__dirname, '../files')));
