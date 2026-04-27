const logger = require("../../core/logger/logger");
const { getSellerProfileService, createSellerProfileService } = require("./seller.service");

// User become seller 
const createSellerProfile = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    try {
        const seller = await createSellerProfileService(userId, data);

        res.status(201).json({
            message: "Seller profile created sucessfully",
            success: true,
            seller: seller
        })
    } catch (error) {
        logger.error({ error }, "Error in creating seller Profile")
        res.status(error.statusCode || 400).json({
            message: error.message || "Error in creating seller Profile",
            success: false,
        })

    }


}
const getDashboardData = () => {

}
const getSellerProfile = async (req, res) => {
    const sellerId = req.user.id;
    try {
        const user = await getSellerProfileService(sellerId);
        res.status(201).json({
            message: "Seller profile fetch sucessfully",
            success: true,
            seller: user
        })
    } catch (error) {
        logger.error({ error }, "Error in seller Profile")
        res.status(error.statusCode || 400).json({
            message: error.message || "Error in seller Profile",
            success: false,
        })

    }
}
const updateSellerProfile = () => {

}
const deleteSellerAccount = () => {

}
module.exports = {
    getSellerProfile,
    getDashboardData,
    updateSellerProfile,
    deleteSellerAccount,
    createSellerProfile
}