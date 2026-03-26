const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { getRedis } = require("../db/redis.db");

const isTestEnv = process.env.NODE_ENV === "test";

// const redis = getRedis();   
//yehan hum redis call nahi connect karne ka try kar rehe hai 
// getRedis pehle call ho gaya
// connectRedis baad me hua
// → redis undefined


/*
    =====limiting types 
    =>login limiter
    =>otp limiter
    =>admin limiter
    =>route limiter
    =>global limiter
*/

const createStore = (prefix) => {
    if (isTestEnv) {
        return undefined;
    }

    return new RedisStore({
        prefix,
        sendCommand: (...args) => {
            const redis = getRedis();
            return redis.call(...args);
        },
    });
};

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,   //15min
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,

    // yehan bhi store use karo (nahi to default me memory use karega )
    store: createStore("rl:global:"),

});
// Custome key generator me (Logic likhte hai )
// ->userId
// ->email
// ->route wise 


// ye default ip pe rate limit lagata hai 
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,   //1min
    max: 5,

    store: createStore("rl:api:"),

})

/*
    apiLimiter kaha use karna chahiye
    Use when:
    heavy API
    DB heavy
    search API
    filter API
    public API
    spam possible
*/
module.exports = {
    globalLimiter,
    apiLimiter
}



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
// app.use(limiter)