import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');

const app = express();
const port = 3005;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests with no origin
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'), false);
      }
    },
  })
);

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`🛡 API running on http://localhost:${port}`);
});
