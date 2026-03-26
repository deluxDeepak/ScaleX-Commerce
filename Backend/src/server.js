const http = require("http");
const logger = require("./core/logger/logger");
const setupGlobalHandlers = require("./core/monitoring/globalHandlers");
const { initSentry, setupSentryErrorHandler } = require("./core/monitoring/sentry");
const initStorage = require("./loaders/storage.loader");
const loadDb = require("./loaders/db.loader");
const config = require("./core/config/env.config");

let server;

const startServer = async () => {
    setupGlobalHandlers();
    // Initialize Sentry before Express is imported anywhere
    // Skip all connection in test environment 
    if (config.NODE_ENV !== "test") {
        initSentry();

        // In test storage and db bhi skip kar do  =====
        initStorage();
        await loadDb(); //wait to make db connection
    }


    const createApp = require("./app");
    const app = await createApp();
    setupSentryErrorHandler(app);
    server = http.createServer(app);

    const port = process.env.PORT || 3000;

    server.listen(port, "0.0.0.0", () => {
        logger.info(`Server is running on port ${port}`);
    });
};

const ShutDown = () => {
    logger.info("Server closing...");

    if (!server) {
        logger.warn("Server not initialized");
        process.exit(0);
    }

    // On closing also handle err 
    server.close((err) => {

        if (err) {
            logger.error(err, "Error closing server");
            process.exit(1);
        }

        logger.info("Server closed gracefully");
        process.exit(0);
    });

    setTimeout(() => {
        logger.error("Force shutdown");
        process.exit(1);
    }, 5000).unref();
};

process.on("SIGINT", ShutDown);
process.on("SIGTERM", ShutDown);

startServer().catch((err) => {
    logger.error(err, "Error starting server");
    process.exit(1);
});