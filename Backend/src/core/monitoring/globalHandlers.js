const Sentry = require("@sentry/node");

const setupGlobalHandlers = () => {

    process.on("unhandledRejection", (err) => {
        console.error("UNHANDLED REJECTION:", err);

        Sentry.captureException(err);
    });

    process.on("uncaughtException", (err) => {
        console.error("UNCAUGHT EXCEPTION:", err);

        Sentry.captureException(err);

        // production me exit bhi karte hain
        process.exit(1);
    });

};

module.exports = setupGlobalHandlers;