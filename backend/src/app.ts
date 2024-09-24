import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();


const corsPort = process.env.CORS_PORT
const app = express();
const port = 3001;
console.log(`CORS_PORT: ${corsPort}`)
// Enable CORS for all routes
app.use(
  cors({
    origin: `http://localhost:${corsPort}` // Allow frontend server to make requests (corsPort is set in docker-compose.yml)
}));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`🛡 API running on http://localhost:${port}`);
});
