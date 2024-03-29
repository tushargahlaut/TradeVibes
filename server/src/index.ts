import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import redisClient from "./database/redis/redisClient";
import { connectMongoDB } from "./database/mongodb/mongoClient";
import AuthRouter from "./routes/auth.route";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/api/v1/auth", AuthRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  connectMongoDB();
  redisClient
    .connect()
    .then(() => {
      console.log("Successfully Connected Redis");
    })
    .catch((err) => console.log("Error in Connecting", err));
});
