// Import and export env variables from here 
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
if (fs.existsSync(".env.docker")) {
    dotenv.config({ path: ".env.docker" })
}

const config = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    REDISH_URL: process.env.REDISH_URL,

    // S3 configs 
    MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
    MINIO_ACCESS: process.env.MINIO_ACCESS,
    MINIO_SECRET: process.env.MINIO_SECRET,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    FILE_BASE_URL: process.env.FILE_BASE_URL,

    // Jwt secret 
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

    RESET_PASSWORD_LINK:process.env.RESET_PASSWORD_LINK,

    // Monitoring 
    SENTRY_DSN: process.env.SENTRY_DSN,
}

module.exports = config