app.get('/api/nsw-incidents', async (_req, res) => {
  try {
    const response = await fetch(
      'https://api.transport.nsw.gov.au/v1/live/hazards/incident/all',
      {
        headers: {
          Authorization: `apikey ${process.env.NSW_API_KEY}`,
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NSW incidents' });
  }
});
