const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { getRedis } = require("../db/redis.db");

const isTestEnv = process.env.NODE_ENV === "test";
/*
    =====limiting types 
    =>login limiter/auth limiter -done
    =>otp limiter
    =>admin limiter --done
    =>route limiter
    =>global limiter  --done
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

// Used at server at app starting 
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,   //15min
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    store: createStore("rl:global:"),

});
// Custome key generator me (Logic likhte hai )
// ->userId
// ->email
// ->route wise 


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
const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,   
    max: 100,
    message: {
        success: false,
        message: "Too many API requests, please try again later."
    },

    store: createStore("rl:api:"),

})

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,

    standardHeaders: true,
    legacyHeaders: false,

    // Only failure login count 
    skipSuccessfulRequests: true,

    message: {
        success: false,
        message: "Too many login attempts"
    },

    store: createStore("rl:auth:")
});

const adminLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 30,
    message: {
        success: false,
        message: "Too many admin requests, please try again later."
    },
    store: createStore("rl:admin")
});

const uploadLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        message: "Too many uploads, please try again later."
    },
    store: createStore("rl:upload")
});



module.exports = {
    globalLimiter,
    apiLimiter,
    authLimiter,
    adminLimiter,
    uploadLimiter
}



/*
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
})
*/

// Apply the rate limiting middleware to all requests.
// app.use(limiter)