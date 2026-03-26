
// Chache ttl unit 
// | Option | Unit              | Meaning           |
// | ------ | ----------------- | ----------------- |
// | EX     | seconds           | expire in seconds |
// | PX     | milliseconds      | expire in ms      |
// | EXAT   | seconds timestamp | expire at time    |
// | PXAT   | ms timestamp      | expire at time    |




const { redis } = require("../db/redis.db")
// 3600--hrs 
const setCache = async (key, value, ttl = 3600) => {
    await redis.set(
        key,
        JSON.stringify(value),
        "EX",
        ttl
    )
}

const getCache = async (key) => {
    const data = await redis.get(key);

    return data ? JSON.parse(data) : null;
}

const deleteCache = async (key) => {
    await redis.del(key);
}

module.exports = {
    setCache,
    deleteCache,
    getCache
}