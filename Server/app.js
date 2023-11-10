import express from 'express';
import userRoute from './routes/userRoute.js';
import taskRoute from './routes/taskRoute.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { errorMiddleware } from './middleware/error.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))



app.use('/api/users', userRoute);
app.use('/api/tasks', taskRoute);

app.use(errorMiddleware);


export default app;
