import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import redisClient from "./redis/redisClient";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  redisClient
    .connect()
    .then(() => {
      console.log("Successfully Connected");
    })
    .catch((err) => console.log("Error in Connecting", err));
});
