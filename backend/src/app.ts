import express, { Request, Response } from 'express';

const app = express();
const port = 3001;

app.get('/api/players', (req: Request, res: Response) => {
  const players = [{ name: 'Player1', level: 60 }, { name: 'Player2', level: 45 }];
  res.json(players);
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
