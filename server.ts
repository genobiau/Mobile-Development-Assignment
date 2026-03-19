import cors from 'cors';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/nsw-incidents', async (_req: Request, res: Response) => {
  try {
    if (!process.env.NSW_API_KEY) {
      return res.status(500).json({ error: 'Missing NSW_API_KEY' });
    }

    const response = await fetch(
      'https://api.transport.nsw.gov.au/v1/live/hazards/incident',
      {
        headers: {
          Authorization: `apikey ${process.env.NSW_API_KEY}`,
          Accept: 'application/json',
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Backend fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch NSW incidents' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
