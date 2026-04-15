
const config = require("../../core/config/env.config");
const logger = require("../../core/logger/logger");
const generateTokenService = require("../../core/token/token.service");
const { ValidationError, NotfoundError, AuthError } = require("../../shared/errors");
const { compareHashPassword, hashPassword } = require("../../shared/utils/password.utils");
const { hashToken, generateRandomToken } = require("../../shared/utils/token.utils");
const { updateUserRefreshToken, findUserById, findUserByEmail, updateUserPasswordToken, findAndCheckTokenExpiry, updateUserPassword } = require("../user/user.repository");
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
    const user = await findUserByEmail(email);
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

const sendEmailService = async (email, message) => {
    console.log("Email is ", email);
    console.log("Message is ", message);
    return {
        email,
        message,
        success: "Set mail sucess"
    }
}

const forgotPasswordService = async (email) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new NotfoundError("User with this email does not exist | Verify email again");

    }

    // RandomToken generate 
    const resetToken = generateRandomToken();
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000 //15min
    // User update 
    // token and token ka expiry 
    const userResult = await updateUserPasswordToken(email, resetToken, resetTokenExpiry);

    logger.info({ userResult }, "User after update token in Db is ");

    // for testing in backend  use frontend url 
    const resetLink = `${config.RESET_PASSWORD_LINK}:${config.PORT}/api/auth/reset-password/${resetToken}`

    // 1.frontend link send to user 
    // 2.User click the link of frontend 
    // 3.On that page route fronend hit the backend route reset password (same step on reset route )
    
    // const resetLink = `${config.FRONTEND_URL}/reset-password/${resetToken}`;


    console.log("Reset link is ", resetLink);

    //Send the reset link to the User email
    const resultEmail = await sendEmailService(email, "Reset link is send");

    return {
        resultEmail,
        resetLink,
        userResult
    }


}

const resetPasswordService = async (resetToken, newPassword) => {
    if (!resetToken) {
        throw new ValidationError("ResetToken is not provided ");
    }
    if (!newPassword) {
        throw new ValidationError("Provide password");
    }
    // 1.Check the token(find user with token) 
    const resultUser = await findAndCheckTokenExpiry(resetToken);

    if (!resultUser) {
        throw new AuthError("Invalid or Expired token")
    }
    // Hash the password 
    const hashedPassword = await hashPassword(newPassword);

    // 2.Save new password 
    const updatedUser = await updateUserPassword(resultUser._id, hashedPassword);
    logger.info({ updatedUser }, "Password updated successsfully ")

    // 3.Clear new token 
    const tokenUpdated = await updateUserPasswordToken(resultUser.email, null, null);
    logger.info({ tokenUpdated }, "Token updated set to null again");


    return { updatedUser, tokenUpdated };

}
module.exports = {
    loginByEmailService,
    logoutService,
    registerUserService,
    getMeBasicUserService,
    refreshTokenService,
    forgotPasswordService,
    resetPasswordService,
}
