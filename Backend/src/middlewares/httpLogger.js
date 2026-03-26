const pinoHttp = require("pino-http");

const httpLogger = pinoHttp();
module.exports = httpLogger;