// backend/app.js
const express = require('express');
const app = express();
const port = 3001; // Backend API on a different port from the frontend

// Middleware for CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Sample API route
app.get('/api/players', (req, res) => {
  const players = [{ name: 'Player1', level: 60 }, { name: 'Player2', level: 45 }];
  res.json(players);
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
