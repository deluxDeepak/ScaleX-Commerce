const Redis = require("ioredis");
const config = require("../config/env.config");
const logger = require("../logger/logger");

// new Redis({
//   port: 6379, // Redis port
//   host: "127.0.0.1", // Redis host
//   username: "default", // needs Redis >= 6
//   password: "my-top-secret",
//   db: 0, // Defaults to 0
// });

const redis = new Redis(config.REDISH_URL);

const connectRedisDb = async() => {
    // Create a Redis instance.
    // By default, it will connect to localhost:6379.
    await redis.ping();
    logger.info("Redis connected");
    redis.on("connection", () => logger.info("Connection established"));
}
module.exports = { connectRedisDb, redis };