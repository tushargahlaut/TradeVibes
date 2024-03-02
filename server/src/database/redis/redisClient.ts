import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisPassword = process.env.REDIS_PASSWORD || "";
const redisHost = process.env.REDIS_URL || "";

console.log("Redis Pass", redisPassword, "RedisHost", redisHost);

const redisOptions = {
  password: redisPassword,
  socket: {
    host: redisHost,
    port: 14322,
  },
};

const redisClient = createClient(redisOptions);

export default redisClient;
