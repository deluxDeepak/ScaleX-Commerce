// Import and export env variables from here 
const dotenv = require("dotenv");
const path = require("path");

// Solving environment problem 
const NODE_ENV = process.env.NODE_ENV || "development";
const IS_DOCKER = process.env.DOCKER === "true";

let envfile = `.env.${NODE_ENV}`;
if (IS_DOCKER) {
    envfile = `.env.docker${NODE_ENV}`
}

// Load the env files according to the conditions 
// The process.cwd() method returns the current working directory of the Node.js process.
dotenv.config({
    path: path.resolve(process.cwd(), envfile)
})

const fileLocation = path.resolve(process.cwd(), envfile);
console.log("FileLocation", fileLocation);


const config = {
    NODE_ENV,
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL,
    CLIENT_URL: process.env.CLIENT_URL,

    // Redis local and cloud both setup ===========
    REDIS_URL: process.env.REDISH_URL || process.env.REDIS_URL,
    DB_REDIS_HOST: process.env.DB_REDIS_HOST,
    DB_REDIS_PORT: process.env.DB_REDIS_PORT,
    DB_REDIS_USERNAME: process.env.DB_REDIS_USERNAME,
    DB_REDIS_PASSWORD: process.env.DB_REDIS_PASSWORD,



    // S3 configs 
    STORAGE_ENDPOINT: process.env.MINIO_ENDPOINT || process.env.S3_ENDPOINT,
    STORAGE_ACCESS: process.env.MINIO_ACCESS || process.env.S3_ACCESS,
    STORAGE_SECRET: process.env.MINIO_SECRET || process.env.S3_SECRET,

    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    FILE_BASE_URL: process.env.FILE_BASE_URL,

    // Jwt secret 
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

    RESET_PASSWORD_LINK: process.env.RESET_PASSWORD_LINK,


    // Payment 
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,

    // Monitoring 
    SENTRY_DSN: process.env.SENTRY_DSN,
}

module.exports = config