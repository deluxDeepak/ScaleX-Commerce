const express = require('express');
const loadApp = require('./loaders/app.loader');
const loadRoute = require('./loaders/route.loader');
const loadDb = require('./loaders/db.loader');
const initStorage = require('./loaders/storage.loader');
const globalErrorHandler = require('./middlewares/globalError.middleware');
const notFundMiddleware = require('./middlewares/notFund.middleware');
const { setupSentryErrorHandler } = require('./core/monitoring/sentry');
const setupGlobalHandlers = require('./core/monitoring/globalHandlers');

const createApp = async () => {
    setupGlobalHandlers();
    
    const app = express();
    initStorage();
    await loadDb(); //Wait to make db connection
    loadApp(app);
    loadRoute(app);

    // Sentry error handler must be after routes to capture their errors
    setupSentryErrorHandler(app);

    // 404 not found 
    app.use(notFundMiddleware)
    // Error is last on the app 
    app.use(globalErrorHandler);
    return app
}

module.exports = createApp;