
const logger = require("../core/logger/logger");
const storageClient = require("../core/storage/s3.client");
// const logger = require("../logger/logger");

const { ListBucketsCommand } = require("@aws-sdk/client-s3");

const initStorage = async () => {
    try {
        await storageClient.send(
            new ListBucketsCommand({})
        );

        logger.info("Storage connected");
    } catch (err) {
        logger.error(err, "Storage connection failed");
        process.exit(1);
    }
};

module.exports = initStorage;