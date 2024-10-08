import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { getJobOffersByFilters } from './controllers/job-offer-controller';
import { connectToDatabase } from './database';

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

// --- Job Offers ---
app.get('/api/job-offers', getJobOffersByFilters);
