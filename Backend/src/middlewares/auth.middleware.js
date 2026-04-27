const AuthError = require("../shared/errors/AuthError");
const logger = require("../core/logger/logger");
const { verifyToken } = require("../shared/utils/token.utils");

const authenticate = async (req, res, next) => {

    console.log("Auth hit ", req.headers);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AuthError("Authorization header is missing");
    }

    if (!authHeader.startsWith("Bearer ")) {
        throw new AuthError("Authorization format must be: Bearer <token>");
    }

    const token = authHeader.split(" ")[1]
    logger.info({ token }, "Auth middleware hit| Token is");
    if (!token) {
        throw new AuthError("You are not Authorize");
    }


    const decodeUser = await verifyToken(token);
    logger.info({ decodeUser }, "Decode data:");

    const normalizedUserId = decodeUser?.id || decodeUser?._id || decodeUser?.userId || decodeUser?.sub;
    if (!normalizedUserId) {
        throw new AuthError("Invalid token payload: user id missing");
    }

    req.user = {
        ...decodeUser,
        id: normalizedUserId,
    };

    next();


}

module.exports = authenticate;