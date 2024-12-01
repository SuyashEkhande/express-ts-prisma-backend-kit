import express from 'express';
import { Express } from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import authRoutes from './app/routes/auth.routes';
import todoRoutes from './app/routes/todo.routes';
import { Request } from 'express';

dotenv.config();

const app:Express = express();

app.use(express.json());

// Request Body Content Logging Token
morgan.token("body", (req: Request) => {
    return JSON.stringify(req.body);
});

// Request Params Content Logging Token
morgan.token("params", (req: Request) => {
    return JSON.stringify(req.params) || "-";
});

// Log HTTP requests
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms | body: :body | params: :params'
    )
);

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = process.env.EXPRESS_PORT || 3000;

// Store the server instance so we can close it later
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
// Export the app for testing
export { app, server };


