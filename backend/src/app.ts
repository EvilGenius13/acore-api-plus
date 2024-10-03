import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');
console.log(`Allowed origins are: ${allowedOrigins}`);

const app = express();
const port = 3005;

app.use(cors()); // Allow requests from any origin
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log(`Received request from origin: ${origin}`);
//       if (!origin) return callback(null, true); // Allow requests with no origin
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         console.log(`Origin ${origin} not allowed by CORS`);
//         return callback(new Error('Not allowed by CORS'), false);
//       }
//     },
//   })
// );

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`🛡 API running on http://localhost:${port}`);
});
