// Storage config can be done here 

const { S3Client } = require("@aws-sdk/client-s3");
const config = require("../config/env.config");
const logger = require("../logger/logger");

const storageClient = new S3Client({
    ...(config.NODE_ENV === "development" && { endpoint: config.STORAGE_ENDPOINT }),
    region: config.STORAGE_REGION,
    credentials: {
        accessKeyId: config.STORAGE_ACCESS,
        secretAccessKey: config.STORAGE_SECRET
    },

    forcePathStyle:true
})
if (config.NODE_ENV === "production") {
    logger.info("Storage S3 client initialized")

} else {
    logger.info("Minio storage client initialized")
}
module.exports = storageClient