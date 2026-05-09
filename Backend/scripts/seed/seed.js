// Ensure seed runs with production env unless explicitly overridden
process.env.NODE_ENV = process.env.NODE_ENV || "production";
const path = require("path");
const dotenv = require("dotenv");

// Load the project-root env file that corresponds to NODE_ENV (e.g. .env.production)
const envFile = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
dotenv.config({ path: envFile });
console.log("Seeding using env file:", envFile);



const connectMongoDb = require("../../src/core/db/mongo.db");
const seedCategory = require("./seedCategory");
const seedUser = require("./seedUser");
const seedProduct = require("./seedProduct");
const seedReview = require("./seedReview");

const runSeed = async () => {
    try {
        await connectMongoDb();
        await Promise.all([
            seedCategory(),
            seedUser()
        ])
        await seedProduct();
        await seedReview();

    } catch (error) {
        console.log("Error in seeding", error);
        process.exit(1);

    }
}

runSeed();