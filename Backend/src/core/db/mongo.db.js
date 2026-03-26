const mongoose = require("mongoose")
const config = require("../config/env.config");
const logger = require("../logger/logger");
// To handle errors after initial connection was established, you should listen for error events on the connection. 
const connectMongoDb = async () => {
    try {
        if (config.NODE_ENV === "test") {
            logger.warn("Skipping Mongo in test mode");
            return;
        }

        if (!config.MONGO_URL) {
            logger.warn("MongoUri not found Skipping Mongo");
            return;
        }

        await mongoose.connect(`${config.MONGO_URL}/E-commerce`);
        logger.info("MongoDb Connected");
    } catch (error) {
        logger.error(error, "Error ocuure in connecting");

    }
}

// Event connection in mongoose 
// mongoose.connection.on('connected', () => console.log('connected'));
// mongoose.connection.on('open', () => console.log('open'));
// mongoose.connection.on('disconnected', () => console.log('disconnected'));
// mongoose.connection.on('reconnected', () => console.log('reconnected'));
// mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
// mongoose.connection.on('close', () => console.log('close'));
// // after connection second error
// mongoose.connection.on("error", (err) => console.log("Mongodb Error", err))


module.exports = connectMongoDb;