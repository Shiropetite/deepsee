import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectToDatabase } from './database';
import { getAllJobOffersFromDB } from './repositories/job-offers';

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

app.get('/api/job-offers', async (req, res) => {
    const data = await getAllJobOffersFromDB();
    res.json(data);
});
