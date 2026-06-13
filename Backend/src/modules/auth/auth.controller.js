const logger = require("../../core/logger/logger");
const { verifyRefreshToken } = require("../../shared/utils/token.utils");
const { loginByEmailService, logoutService, registerUserService, getMeBasicUserService, getProfileUserService, refreshTokenService, forgotPasswordService, resetPasswordService } = require("./auth.service");

// const geoip = require("geoip-lite");

// -email 
// -password
// - name
const register = async (req, res) => {
    try {
        // const { email, password, name } = req.body; //temp edit role add from here 
        const { email, password, name, role } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "Email password and name are required",
            });
        }

        const sessionMeta = {
            userAgent: req.headers["user-agent"],
            ip: req.ip
        };
        logger.info("RegisterSchema called")
        // register + login
        const { token, user } = await registerUserService(
            { email, password, name, role },
            sessionMeta
        );

        res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: user,
            accessToken: token.accessToken
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Error in register",
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("headers is ", req.headers);

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // geolocation can be added in session data 
        // 10->start is private ip not expose on the internet
        // const geoPrivate = geoip.lookup('10.80.65.144');
        // console.log("geolocation is ", geoPrivate);

        // const geoPublic = geoip.lookup('122.252.249.114');
        // console.log("geolocation is ", geoPublic);

        // 4.Create session based login (session model)
        const sessionMeta = {
            userAgent: req.headers["user-agent"],
            ip: req.ip
        };

        // login ---se token return karke de rehe hai 
        const { token, user } = await loginByEmailService(email, password, sessionMeta);

        // Send response me cookies 
        res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            // domain:".example.com",
            // path:"/auth/refresh",
            // maxAge:7*24*60*60*1000
        });

        // AccessToken token send in res 
        res.status(200).json({
            success: true,
            message: "Your are logged in Now!",
            user: user,
            accessToken: token.accessToken
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error?.message || "Error in logging",
        })
    }

}
const logout = async (req, res) => {
    const cookie = req.cookies.refreshToken;
    try {
        await logoutService(cookie);
        // clear cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        res.status(200).json({
            success: true,
            message: "Successfully logout "
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message && "Error in logout",
        })
    }
}
// Give only basic User details only 
const getMe = async (req, res) => {
    const userId = req.user.id;       //decode auth se ayega 
    try {
        // - profileimg send to show in dashboard login time 
        const user = await getMeBasicUserService(userId);

        res.status(200).json({
            success: true,
            user: user,
            message: "Successfully fetch the me "
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message && "Error in fetching",
        })

    }



}
const getUserProfile = async (req, res) => {
    const userId = req.user.id;       //decode auth se ayega 
    try {
        const user = getProfileUserService(userId);
        res.status(200).json({
            success: true,
            user: user,
            message: "Successfully fetch the me "
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message && "Error in fetching",
        })

    }



}
const refreshToken = async (req, res) => {
    const refreshTokenCookie = req.cookies?.refreshToken;
    console.log("Cookies are ", req.cookies);
    console.log("Refresh token is ", refreshTokenCookie);

    logger.info({
        cookieKeys: Object.keys(req.cookies || {}),
        hasRefreshToken: Boolean(refreshTokenCookie),
    }, "Refresh token request received");

    //authenticate yehan kam nahi karega (refresh expire hai )
    // const userId = req.user.id;     
    // console.log("User id is ",userId);
    try {
        if (!refreshTokenCookie) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing",
            });
        }

        // 1.hash karke match 

        // const hashTokenUser=
        const decode = await verifyRefreshToken(refreshTokenCookie);
        console.log("Decode user ", decode);
        const { id } = decode

        const token = await refreshTokenService(id, refreshTokenCookie);
        res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            // domain:".example.com",
            path: "/",
            // maxAge:7*24*60*60*1000
        });

        // AccessToken token send in res 
        res.status(200).json({
            success: true,
            message: "Your are logged in Now! || Using refresh Token",
            accessToken: token.accessToken
        })
    } catch (error) {
        logger.error({ error }, "Refresh token flow failed");
        res.status(error?.statusCode || 401).json({
            success: false,
            message: error?.message || "Refresh failed",
        })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    // User not logged in so userId nahi ayega 
    // const userId=req.user.id
    console.log("Email is ", email);

    if (typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
            success: false,
            message: "Valid email is required",
        });
    }

    try {
        const result = await forgotPasswordService(email);

        res.status(200).json({
            success: true,
            data: result,
            message: "Sent link on Email to rest the Password | don't sahre the link with others "
        });

    } catch (error) {
        console.error("Forgot password failed:", error);

        res.status(error?.statusCode || 400).json({
            success: false,
            message: error?.message || "Error in ForgotPassword",
        })

    }


}

// Public available hoga hi nahi 
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    // 1.Token find in db and check the expiry also 
    try {
        const result = await resetPasswordService(token, newPassword);
        res.status(200).json({
            success: true,
            data: result,
            message: "Password updated Success fully "
        });

    } catch (error) {
        console.error("Reset password failed:", error);

        res.status(error?.statusCode || 400).json({
            success: false,
            message: error?.message || "Error in Passowrd reset",
        })

    }

}

// Social login routes =========================
const googleLogin = async () => {

}
const githubLogin = async () => {

}
const facebookLogin = async () => {

}

module.exports = {
    register,
    login,
    logout,
    getMe,
    getUserProfile,

    refreshToken,
    forgotPassword,
    resetPassword,

    //==== Social login =============
    googleLogin,
    githubLogin,
    facebookLogin,
}