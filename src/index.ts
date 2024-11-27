import express from 'express';
import { Express } from 'express';
import dotenv from 'dotenv';
import authRoutes from './app/routes/auth.routes';

dotenv.config();

const app:Express = express();

app.use(express.json());

app.use("/auth", authRoutes);

const PORT = process.env.EXPRESS_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});