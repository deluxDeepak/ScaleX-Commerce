const bcrypt = require("bcrypt");
const logger = require("../../core/logger/logger");

// Refresh token save in db --hash karke 
const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        logger.error({ error }, "Hasing failed");
        return null;
    }
}
const compareHashPassword = async (password, encyptedPassword) => {
    try {
        return await bcrypt.compare(password, encyptedPassword);

    } catch (error) {
        logger.error({ error }, "Compare token failed");
        return null;

    }
}

module.exports = {
    hashPassword,
    compareHashPassword
}