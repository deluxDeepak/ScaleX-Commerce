const authenticate = require("../../middlewares/auth.middleware");
const { login, logout, register, getMe, refreshToken, forgotPassword, resetPassword } = require("./auth.controller");

const router = require("express").Router();


// Basic Routes ====================================
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.get("/me", authenticate, getMe);     //done
// router.get("/profile", authenticate, getUserProfile);    //user route me dena chiye 

// Password related routes ==========================
router.post("/forgot-password", forgotPassword);    //send reset lint
router.post("/reset-password/:token", resetPassword);
// router.patch("/change-password", auth, changePassword);

// Email and otp verification ======================
// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);
// router.post("/resend-otp", resendOtp);
// router.post("/verify-email", verifyEmail);

// Social login routes ==============================
// router.post("/google", googleLogin);
// router.post("/github", githubLogin);
// router.post("/facebook", facebookLogin);

// Role based login (Optional) Normal login best hai ====================
// router.post("/admin/login", adminLogin);
// router.post("/seller/login", sellerLogin);
// router.post("/customer/login", customerLogin);

module.exports = router