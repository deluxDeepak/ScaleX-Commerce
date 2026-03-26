const { generateAccessToken, generateRefreshToken, hashToken } = require("../../shared/utils/token.utils");
const logger = require("../logger/logger");

const generateTokenService = (user) => {
    const accessToken = generateAccessToken(user);
    logger.info({ accessToken }, "AcessToken is:");
    const refreshToken = generateRefreshToken(user);
    logger.info({ refreshToken }, "AcessToken is:");
    const hasRefreshToken = hashToken(refreshToken);
    logger.info({ hasRefreshToken }, "AcessToken is:");

    return {
        accessToken,
        refreshToken,
        hasRefreshToken
    };

};

module.exports = generateTokenService;