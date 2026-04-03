const logger = require("../../core/logger/logger");
const { verifyRefreshToken } = require("../../shared/utils/token.utils");
const { loginByEmailService, logoutService, registerUserService, getMeBasicUserService, getProfileUserService, refreshTokenService } = require("./auth.service");

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
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // 4.Create session based login (session model)
        const sessionMeta = {
            userAgent: req.headers["user-agent"],
            ip: req.ip
        };

        // login ---se token return karke de rehe hai 
        const { token, user } = await loginByEmailService(email, password, sessionMeta);

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
        const user = await getMeBasicUserService(userId);
        console.log("User is ", user);

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
    const refreshToken = req.cookies.refreshToken;
    // const refreshToken = req.cookies.refreshToken;
    console.log("Refresh token", req.cookies);

    //authenticate yehan kam nahi karega (refresh expire hai )
    // const userId = req.user.id;     
    // console.log("User id is ",userId);
    try {
        // 1.hash karke match 

        // const hashTokenUser=
        const decode = await verifyRefreshToken(refreshToken);
        console.log("Decode user ", decode);
        const { id } = decode

        const token = await refreshTokenService(id, refreshToken);
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
        res.status(400).json({
            success: false,
            message: error?.message || "Error in logging",
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

    //==== Social login =============
    googleLogin,
    githubLogin,
    facebookLogin,
}