import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import redisClient from "./database/redis/redisClient";
import { connectMongoDB } from "./database/mongodb/mongoClient";
import AuthRouter from "./routes/auth.route";
import UserRouter from "./routes/user.route";
import PostRouter from "./routes/post.route";
import NiftyRouter from "./routes/nifty.route";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8080;





app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/post", PostRouter);
app.use("/api/v1/nifty", NiftyRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("TradeVibes Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  connectMongoDB().then(()=>{

  }).catch((err)=> console.log("Error in Mongo Connection", err));
  redisClient
    .connect()
    .then(() => {
      console.log("Successfully Connected Redis");
    })
    .catch((err) => console.log("Error in Connecting Redis", err));
});
