const express = require('express');
const axios = require('axios');
const app = express();

const SECRET = process.env.RELAY_SECRET || 'roxpainel2026';

app.get('/relay', async (req, res) => {
  if (req.query.secret !== SECRET) return res.status(403).json({ error: 'Forbidden' });
  if (!req.query.url) return res.status(400).json({ error: 'Missing url' });

  try {
    const response = await axios.get(req.query.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 15000
    });
    res.json(response.data);
  } catch (e) {
    res.status(e.response?.status || 500).json({ error: e.message, data: e.response?.data });
  }
});

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.listen(process.env.PORT || 3000);

