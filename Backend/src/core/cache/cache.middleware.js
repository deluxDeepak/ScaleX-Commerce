const logger = require("../logger/logger");
const buildkey = require("./cache.buildkey")
const { getCache, setCache } = require("./cache.service")

const cacheMiddleware = (prefix, ttl = 3600) => {
    return async (req, res, next) => {

        // Build key dynamic 
        const key = buildkey(req, prefix);
        logger.info("Key is: ", key);
        // get chache from the db 
        const data = await getCache(key);
        // data is persent then send res 
        // ==========Chche hit ==========
        if (data) {
            // return res.status(200).json(data);
            return res.status(200).json({
                success: true,
                message: "Data fetch from Chache .",
                data: data
            });

        }
        // If data is not in cache then make it cache
        // ->Response ko cache nahi karte hai data ko cache karte hai only 
        const originalJson = res.json.bind(res);
        // =========Chache miss ============
        res.json = async (body) => {
            if (res.statusCode === 200) {
                // await setCache(key, body, ttl);
                await setCache(key, body.data || body, ttl);

            }
            // cache middleware run hoga pehle agr original response return nahi kiya to wo lost ho jayega 
            // Override json reponse kar apna response bhej rehe hai
            return originalJson(body)
        }
        next();
    }
}

module.exports = cacheMiddleware;