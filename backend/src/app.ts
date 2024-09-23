import express from 'express';
import cors from 'cors';
const corsPort = process.env.CORS_PORT

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors({
  origin: `http://localhost:${corsPort}` // Allow frontend server to make requests
}));

// Sample API route
app.get('/api/players', (req, res) => {
  const players = [{ name: 'Player1', level: 60 }, { name: 'Player2', level: 45 }];
  res.json(players);
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
