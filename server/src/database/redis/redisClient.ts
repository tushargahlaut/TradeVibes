import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisPassword = process.env.REDIS_PASSWORD || "";
const redisHost = process.env.REDIS_URL || "";

const redisOptions = {
  password: redisPassword,
  socket: {
    host: redisHost,
    port: 17402,
  },
};

const redisClient = createClient(redisOptions);

export default redisClient;
