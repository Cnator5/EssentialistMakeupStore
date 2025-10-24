import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const redisClient = createClient({
  url: redisUrl
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("reconnecting", () => {
  console.log("Redis client reconnecting…");
});

let connectPromise = null;

export const ensureRedisConnection = async () => {
  if (redisClient.isOpen) {
    return redisClient;
  }

  if (!connectPromise) {
    connectPromise = redisClient.connect().catch((error) => {
      connectPromise = null;
      throw error;
    });
  }

  await connectPromise;
  return redisClient;
};

export default redisClient;