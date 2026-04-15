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
        logger.warn("Skipping redis Connection due to Test env")
        return
    }
    // For local =================
    if (config.REDIS_URL) {
        redis = new Redis(config.REDIS_URL);
    }
    // For production ============
    else if (config.DB_REDIS_HOST && config.DB_REDIS_PORT) {
        redis = new Redis({
            port: Number(config.DB_REDIS_PORT),
            host: config.DB_REDIS_HOST,
            username: config.DB_REDIS_USERNAME,
            password: config.DB_REDIS_PASSWORD,
            db: 0, // Defaults to 0
        });

    }
    else {
        logger.error("Redis configuration is missing ")

    }
    
    // redis = new Redis(config.REDIS_URL)
    // - If url is not persent then it will fallback to localredis 

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