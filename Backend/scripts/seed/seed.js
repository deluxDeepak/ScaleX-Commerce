const path = require("path");
const dotenv = require("dotenv");

// Load Backend/.env when seeding from repo root.
dotenv.config({ path: path.join(__dirname, "..", ".env") });


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