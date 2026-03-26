const config = require("../../core/config/env.config");

// generate key and get key functionality 
const generateKey = (nameService, originalname) => {
    if (!originalname) return null;
    return `${nameService}/${Date.now()}-${originalname}`


}

// const config = require("../../config/env.config");
// return {
//         key,
//         url: `${config.FILE_BASE_URL}/${key}`
//     };
// url: `${config.FILE_BASE_URL}/${key}`  key yehan se chiye humko 
const getKeyFromUrl = (url) => {
    if (!url) return null;
    return url.replace(`${config.FILE_BASE_URL}/`, "");
};

module.exports = { getKeyFromUrl, generateKey };