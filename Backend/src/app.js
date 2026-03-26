const express = require('express');
const loadApp = require('./loaders/app.loader');
const loadRoute = require('./loaders/route.loader');
const loadDb = require('./loaders/db.loader');
const initStorage = require('./loaders/storage.loader');
const globalErrorHandler = require('./middlewares/globalError.middleware');
const notFundMiddleware = require('./middlewares/notFund.middleware');


const createApp = async () => {
    
    
    // Jisko app ka jarurat hai wahi yehan rehega 
    const app = express();
    
    
    loadApp(app);
    loadRoute(app);

    // Sentry error handler must be after routes to capture their errors
    // setupSentryErrorHandler(app);   //remove sentry also here 

    // 404 not found 
    app.use(notFundMiddleware)
    // Error is last on the app 
    app.use(globalErrorHandler);
    return app
}

module.exports = createApp;