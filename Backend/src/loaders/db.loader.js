// Load db here 
const config = require("../core/config/env.config");
const connectMongoDb = require("../core/db/mongo.db");
const { connectRedisDb } = require("../core/db/redis.db");
const logger = require("../core/logger/logger");

const loadDb = async () => {
    try {
        if (config.NODE_ENV === "test") {
            logger.info("Skipping DB connection in test mode");
            return;
        }

        if (!config.MONGO_URL) {
            logger.warn("MongoUri not found Skipping Mongo")
        }
        if (!config.REDISH_URL) {
            logger.warn("RedisUri not found Skipping Redis")
        }
        await Promise.all([
            connectMongoDb(),
            connectRedisDb()
        ])
        logger.info("Db connected successfuly");
    } catch (error) {
        logger.error(error, "Db connection fails");
        process.exit(1);

    }

}
module.exports = loadDb;
