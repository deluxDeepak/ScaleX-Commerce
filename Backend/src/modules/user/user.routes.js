const upload = require("../../core/upload/upload.middleware");
const authenticate = require("../../middlewares/auth.middleware");
const checkRole = require("../../middlewares/role.middleware");
const {
    getAllUser,
    getUserById,
    updateUser,
    createUser,
    getProfile,
    updateProfile,
    uploadProfileImage,
    deleteUser,
    getMyAddress,
    addAddress,
    updateAddress,
    delteAddress,
    setDefaultAddress
} = require("./user.controller");

/*
    Route Order should be ==============
    1. fixed routes
    2. nested routes
    3. dynamic routes (:id)
    4. wildcard
*/

const router = require("express").Router();

// ===== PROFILE =====(Specific route first)
router.get("/profile/me", authenticate, getProfile); //done
// uploadprofile --contentType ->application/json
router.patch("/profile/me", authenticate, updateProfile); //done
// uploadprofile --contentType ->multipart/form-data
router.post("/profile/image", authenticate, upload.singleImage, uploadProfileImage);
// router.delete("/profile/image", authenticate, upload.single, uploadProfileImage);


// address========(Done ✅)
router.get("/address", authenticate, getMyAddress);
router.post("/address", authenticate, addAddress);
router.patch("/address/:id", authenticate, updateAddress);
router.delete("/address/:id", authenticate, delteAddress);
router.patch("/address/:id/default", authenticate, setDefaultAddress);

// ===== ADMIN / NORMAL =====
router.get("/", authenticate, checkRole(["admin"]), getAllUser);    //done
router.get("/", getAllUser);    //done
router.get("/:id", authenticate, getUserById);    //done


// (register route alag hai isliye ye admin only )
router.post("/", authenticate, checkRole(["admin"]), createUser);
router.patch("/:id", authenticate, updateUser);   //done
router.delete("/:id", authenticate, checkRole(["admin"]), deleteUser);   //done





module.exports = router;