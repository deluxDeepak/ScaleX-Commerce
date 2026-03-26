// Load db here 
const connectMongoDb = require("../core/db/mongo.db");
const { connectRedisDb } = require("../core/db/redis.db");
const logger = require("../core/logger/logger");

const loadDb = async () => {
    try {
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
