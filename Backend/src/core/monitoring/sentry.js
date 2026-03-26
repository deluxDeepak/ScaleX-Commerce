const Sentry = require("@sentry/node");
const config = require("../config/env.config");

const initSentry = (app) => {
    Sentry.init({
        dsn: config.SENTRY_DSN,
        sendDefaultPii: true,
        tracesSampleRate: 1.0,
        integrations: [Sentry.expressIntegration()],
    });

    //unhandled errors capture
    process.on("unhandledRejection", (err) => {
        console.error("UNHANDLED REJECTION:", err);
        Sentry.captureException(err);
    });

    process.on("uncaughtException", (err) => {
        console.error("UNCAUGHT EXCEPTION:", err);
        Sentry.captureException(err);
    });
};

const setupSentryErrorHandler = (app) => {
    // Must run after routes and before other error handlers
    Sentry.setupExpressErrorHandler(app);
};

module.exports = {
    initSentry,
    setupSentryErrorHandler,
};