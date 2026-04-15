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

        const hasRedisConfig = Boolean(config.REDIS_URL || (config.DB_REDIS_HOST && config.DB_REDIS_PORT));
        const hasMongoConfig = Boolean(config.MONGO_URL);

        if (hasRedisConfig && hasMongoConfig) {
            await Promise.all([
                connectMongoDb(),
                connectRedisDb()
            ])
        } else {
            logger.warn("Redis configuration is not provided ")
        }

        logger.info("Db connected successfuly");
    } catch (error) {
        logger.error(error, "Db connection fails");
        process.exit(1);

    }

}
module.exports = loadDb;
