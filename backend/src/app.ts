import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

// Normalize allowed origins by trimming and removing trailing slashes
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim().replace(/\/$/, ''));

console.log(`Allowed origins are: ${allowedOrigins}`);

const app = express();
const port = 3005;

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      origin = origin ? origin.trim().replace(/\/$/, '') : origin;
      console.log(`Received request from origin: ${origin}`);
      if (!origin) return callback(null, true); // Allow requests with no origin (e.g., mobile apps, curl)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log(`Origin ${origin} not allowed by CORS`);
        return callback(new Error('Not allowed by CORS'), false);
      }
    },
  })
);

app.use(express.json());
app.use('/api', routes);

// Error handling middleware
app.use((err:any, req:any, res:any, next:any) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ message: 'CORS Error: Not allowed by CORS' });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🛡 API running on http://0.0.0.0:${port}`);
});
