import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/nsw-incidents', async (_req, res) => {
  try {
    const response = await fetch(
      'https://api.transport.nsw.gov.au/v1/live/hazards/incident/all',
      {
        method: 'GET',
        headers: {
          Authorization: `apikey ${process.env.NSW_API_KEY}`,
          Accept: 'application/json',
        },
      },
    );

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).send(text);
    }

    res.setHeader('Content-Type', 'application/json');
    return res.send(text);
  } catch (error) {
    console.error('Server error fetching NSW live incidents:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/nsw-incidents-historical', async (_req, res) => {
  try {
    const response = await fetch(
      'https://api.transport.nsw.gov.au/v1/traffic/historicaldata',
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${process.env.NSW_API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      },
    );

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).send(text);
    }

    res.setHeader('Content-Type', 'application/json');
    return res.send(text);
  } catch (error) {
    console.error('Server error fetching NSW historical incidents:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
