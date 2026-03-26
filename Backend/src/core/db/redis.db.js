const Redis = require("ioredis");
const config = require("../config/env.config");
const logger = require("../logger/logger");
const { DatabaseError } = require("../../shared/errors");

// new Redis({
//   port: 6379, // Redis port
//   host: "127.0.0.1", // Redis host
//   username: "default", // needs Redis >= 6
//   password: "my-top-secret",
//   db: 0, // Defaults to 0
// });

// Redish undefine ho sakta hai jab tak connect nahi hoga tab tak 
let redis
const connectRedisDb = async () => {
    if (config.NODE_ENV === "test") {
        return
    }

    redis = new Redis(config.REDISH_URL)

    // Create a Redis instance.
    // By default, it will connect to localhost:6379.
    await redis.ping();
    logger.info("Redis connected");
    redis.on("connect", () => logger.info("Connection established"));
    redis.on("error", (err) => logger.error(err));
    redis.on("close", () => logger.warn("Redis closed"));

}
const getRedis = () => {
    if (!redis) {
        throw new DatabaseError("Redis not connected yet");
    }
    return redis
};
module.exports = { connectRedisDb, getRedis };