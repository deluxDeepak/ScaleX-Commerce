/*
    err object hota hai 
    err.message
    err.statusCode
    err.stack
    err.isOperational
    err.status
    err.details
*/

const config = require("../core/config/env.config");
const logger = require("../core/logger/logger");

// Dev me response error jayda bhejte hai jayda information 
const devError = (err, req, res) => {
    res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message || "Internal server Error",
        details: err.details,
        code: err.code,
        stack: err.stack
    });
}

// Production me stack nahi dena chahiye
// -> hacker ko info mil sakta hai kya error hai 
const prodError = (err, req, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode || 500).json({
            status: err.status || "error",
            message: err.message,
            code: err.code
        });
    }
    // Agr syntax hi galat hai
    // Unknown error 
    return res.status(500).json({
        status: false,
        message: "Something went Wrong NonOperational Error|| Your code is wrong",
    });
}


const globalErrorHandler = (err, req, res) => {
    logger.error({ err }, "Error from middleware");
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (config.NODE_ENV == "development") {
        devError(err, req, res);
    } else {
        prodError(err, req, res);
    }

    // Agar response send kar diya → return karo
    // Response ke baad next() → kabhi nahi
    // next();
}

module.exports = globalErrorHandler;