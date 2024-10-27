// src/app.ts
import express from 'express';
import authRoutes from './routes/authRoutes';
import articleRoutes from './routes/articleRoutes';
import userRoutes from './routes/userRoutes';
import  errorHandler  from './middlewares/errorHandler';
// import { rateLimiter } from './middlewares/rateLimiter';
import { connectDB } from './config/db';
import { env } from './config/env';
import logger from './middlewares/logger';
import cors from "cors";
import path from 'path'
import { authMiddleware } from './middlewares/authMiddleware';


const app = express();
const PORT = env.PORT ;

connectDB();

app.use(cors());
app.use(express.json());
// app.use(rateLimiter);
app.use(logger);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/articles',authMiddleware, articleRoutes);
app.use('/api/users',authMiddleware, userRoutes);

 
app.get('/test',(req,res)=>{
    res.send('test')
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
