import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.Routes.js'
import cookieParser from 'cookie-parser';
const app = express();


app.use(cors({origin:porcess.env.ORIGINS.split('.'),credentials:true}))
    
app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRouter)
export default app;