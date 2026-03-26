const client = require("prom-client");

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics()

// custome 
const httpDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

const httpRequestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total number of requests",
});

module.exports = {
    httpRequestCounter,
    httpDuration,
    client,
}