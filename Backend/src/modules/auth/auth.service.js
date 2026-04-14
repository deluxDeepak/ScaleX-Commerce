
const logger = require("../../core/logger/logger");
const generateTokenService = require("../../core/token/token.service");
const { ValidationError, NotfoundError } = require("../../shared/errors");
const { compareHashPassword } = require("../../shared/utils/password.utils");
const { hashToken } = require("../../shared/utils/token.utils");
const { findByEmail, updateUserRefreshToken, findUserById } = require("../user/user.repository");
const { createUserService, findUserBasicService } = require("../user/user.service");
const { createUserSession, deleteUserSession, findUserSession, updateUserSession } = require("./auth.repository");

const registerUserService = async (data, sessionMeta) => {
    const user = await createUserService(data);
    logger.info({ user }, "User created");

    // 1.Generate token 
    const token = generateTokenService(user);
    // 2.Save refresh Token in db 
    // user.refreshToken=token.hasRefreshToken;
    // await user.save();

    await updateUserRefreshToken(user._id, token.hasRefreshToken);

    logger.info({ token }, "Token created on request")
    const sessionData = {
        user: user._id,
        refreshToken: token.hasRefreshToken,
        userAgent: sessionMeta.userAgent,
        ip: sessionMeta.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
    const result = await createUserSession(sessionData);
    logger.info({ result }, "SessionData created");


    return { token, user };


}
const loginByEmailService = async (email, password, sessionMeta) => {
    if (!email || !password) {
        throw new ValidationError("User or Password is required");
    }
    const user = await findByEmail(email);
    if (!user) {
        throw new ValidationError("Email or pasword is wrong")
    }
    // Match the password 
    const isMatch = await compareHashPassword(password, user.password);
    if (!isMatch) {
        throw new ValidationError("Password or email is wrong ");
    }
    // 1.generate token 
    const token = generateTokenService(user);
    // 2.refreshToken save in db karo 
    const updatedUser = await updateUserRefreshToken(user._id, token.hasRefreshToken);

    const sessionData = {
        user: user._id,
        refreshToken: token.hasRefreshToken,
        userAgent: sessionMeta.userAgent,
        ip: sessionMeta.ip,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
    const result = await createUserSession(sessionData);
    logger.info({ result }, "SessionData created");
    return { token, user: updatedUser };
}

// logout me compare nahi karte hai token 
const logoutService = async (refreshToken,) => {
    if (!refreshToken) {
        throw new ValidationError("Provide refreshToken to logout ");
    }
    const hashed = await hashToken(refreshToken);
    const sessionDelete = await deleteUserSession(hashed);

    if (!sessionDelete) {
        throw new ValidationError("Session not found ");
    }
}

const getMeBasicUserService = async (userId) => {
    if (!userId) {
        throw new ValidationError("userId is required");
    }
    const user = await findUserBasicService(userId);
    console.log("user ", user);
    return user;
}

// refreshToken and accesstoken generate 
const refreshTokenService = async (userId, refreshToken) => {
    if (!userId) {
        throw new ValidationError("UserId is required");
    }
    if (!refreshToken) {
        throw new ValidationError("Token is not Provided");
    }
    // 1.match the token first and verify the token 
    const hashed = hashToken(refreshToken);
    // 2.FindSession of that refresh token 

    // 3e583f8fe69f013e48a3bb43e109e07a0ee5aa012fc00c8c4f3b57861d241625
    const session = await findUserSession(hashed);
    if (!session) {
        throw new ValidationError("Session not Valid or Persent");
    }
    console.log("Session is ", session);

    if (!session.user) {
        throw new ValidationError("Session user missing");
    }

    // 3.User find karo 
    const user = await findUserById(session.user);
    if (!user) {
        throw new NotfoundError("User not found for this session");
    }

    // 4.Generate refresh and accessToken 
    const token = generateTokenService(user);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await Promise.all([
        updateUserRefreshToken(userId, token.hasRefreshToken),
        updateUserSession(session._id, { refreshToken: token.hasRefreshToken, expiresAt })
    ]);

    return token;   //ye new Access tocken de dega yehan se nikal ke 

}

module.exports = {
    loginByEmailService,
    logoutService,
    registerUserService,
    getMeBasicUserService,
    refreshTokenService,
}
