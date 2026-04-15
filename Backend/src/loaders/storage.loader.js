
const config = require("../core/config/env.config");
const logger = require("../core/logger/logger");
const storageClient = require("../core/storage/s3.client");
// const logger = require("../logger/logger");

const { HeadBucketCommand, CreateBucketCommand } = require("@aws-sdk/client-s3");

const initStorage = async () => {
    try {
        if (config.NODE_ENV === "test") {
            logger.info("Skipping Storage connection in test mode");
            return;
        }

        const hasStorageConfig = Boolean(
            config.STORAGE_ACCESS &&
            config.STORAGE_ENDPOINT &&
            config.STORAGE_SECRET &&
            config.STORAGE_BUCKET
        );

        if (!hasStorageConfig) {
            throw new Error("Storage configuration is not provided");
        }

        try {
            await storageClient.send(
                new HeadBucketCommand({ Bucket: config.STORAGE_BUCKET })
            );
            logger.info("Storage bucket found");
        } catch (bucketErr) {
            const bucketMissing = bucketErr?.name === "NotFound" || bucketErr?.$metadata?.httpStatusCode === 404;

            if (!bucketMissing) {
                throw bucketErr;
            }

            await storageClient.send(
                new CreateBucketCommand({ Bucket: config.STORAGE_BUCKET })
            );
            logger.info({ bucket: config.STORAGE_BUCKET }, "Storage bucket created");
        }

        logger.info("Storage connected");
    } catch (err) {
        logger.error(err, "Storage connection failed");
        process.exit(1);
    }
};

module.exports = initStorage;