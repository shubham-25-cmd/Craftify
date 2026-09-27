import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.Routes.js'
import cookieParser from 'cookie-parser';
import projectRouter from './routes/ProjectRoutes.js';
const app = express();


app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.CLIENT_URL,
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter)

app.use('/api.project',projectRouter)
export default app;
