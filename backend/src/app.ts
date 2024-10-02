import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();


const corsUrl = process.env.CORS_URL
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here'; // Make sure to set this in your .env file

const app = express();
const port = 3005;
console.log(`CORS_URL: ${corsUrl}`)
// Enable CORS for all routes
app.use(
  cors({
    origin: `${corsUrl}` // Allow frontend server to make requests (corsUrl is set in docker-compose.yml)
}));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`🛡 API running on http://localhost:${port}`);
});
