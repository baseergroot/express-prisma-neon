import express, { type Request, type Response } from 'express';
import apiRouter from "./routes/apiRouter.js";
import dotenv from "dotenv"
import adminRouter from './routes/adminRouter.js';
dotenv.config()

const app = express();
const PORT: Number = Number(process.env.PORT) || 3000;

app.get('/', (_: Request, res: Response) => {
  res.send('Hello from Express with TypeScript and pnpm!');
});

app.use("/api", apiRouter) 
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
