const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");       //http loger 
// const pinoHttp = require("pino-http")     //http loger
// const httpLogger = require("../middlewares/httpLogger");
// const { httpLogger } = require("../middlewares/httpLogger");





const loadApp = (app) => {


    // Security on top 
    app.use(helmet());
    // app.use(globalLimiter);   //for testing of kar lete hai 

    // CORS
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }));

    // Logging
    app.use(morgan("dev"));
    // app.use(httpLogger);
    // app.use(pinoHttp());

    // Body parsing
    app.use(express.json({ limit: "1mb" }));
    app.use(express.urlencoded({ extended: true }));

    // Cookies
    app.use(cookieParser());

    // Compression
    app.use(compression());

    return app;
};

module.exports = loadApp;