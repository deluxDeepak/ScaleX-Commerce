
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const config = require("../../core/config/env.config");
const logger = require("../../core/logger/logger");
const AuthError = require("../errors/AuthError");
// Genrate token 
// Verify token 
/*
    const data={
        id:1,
        role:"normaluser",
        name:"deepak"
    }
*/
const generateAccessToken = (data) => {
    console.log("Secret is ", config.JWT_ACCESS_SECRET)
    return jwt.sign({
        id: data._id,
        role: data.role,
        name: data.name
    }, config.JWT_ACCESS_SECRET, {
        expiresIn: "60m",
    })


}
// Refresh token jayda time ke liye hita hai 
const generateRefreshToken = (data) => {
    return jwt.sign({
        id: data._id,
    }, config.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    })

}

// Token hashing me bcrypt use nahi kar sakte hai (ye diffrent diffrent create karke dega hash )
const verifyToken = async (token) => {
    try {
        return jwt.verify(token, config.JWT_ACCESS_SECRET);
    } catch (error) {
        logger.info({ error }, "Invalid token")
        throw new AuthError("Invalid token");   //direct call next in middleware

    }
}

const verifyRefreshToken = async (token) => {
    try {
        return jwt.verify(token, config.JWT_REFRESH_SECRET);
    } catch (error) {
        logger.info({ error }, "Invalid refresh token")
        throw new AuthError("Invalid token");
    }
}

// Refresh token save in db --hash karke (Crypto use kar sakte hai )
const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex")

}
const compareHashToken = async (token, encyptedToken) => {
    try {
        return await bcrypt.compare(token, encyptedToken);

    } catch (error) {
        logger.error({ error }, "Compare token failed");
        return null;

    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
    hashToken,
    compareHashToken
}