

const { ValidationError, NotfoundError, DatabaseError } = require("../../shared/errors");
const sellerRepo = require("./seller.repository");
const userRepo = require("../user/user.repository");

// Multi-collection updates ---use Transaction
const createSellerProfileService = async (userId, data) => {
    if (!userId) {
        throw new ValidationError("userId is required");
    }
    if (!data.shopName) {
        throw new ValidationError("Shopname is required");
    }


    // 1.Find the seller exist or not 
    const existing = await sellerRepo.findSeller(userId);

    if (existing) {
        throw new ValidationError("seller already exist");
    }

    // 2.Create and update the role 
    const seller = await sellerRepo.createSeller(userId, data);

    const userUpdate = await userRepo.updateUserRoleById(userId, "seller");
    
    if(!userUpdate){
        throw new DatabaseError("User not updated"); 
    }

    return seller;
}
const getSellerProfileService = async (sellerId) => {
    if (!sellerId) {
        throw new ValidationError("SellerId is required");
    }
    console.log("Seller id is ", sellerId);

    const user = await sellerRepo.getSellerProfile(sellerId);

    if (!user) {
        throw new NotfoundError("Seller not found");
    }
    return user;
}

module.exports = {
    createSellerProfileService,
    getSellerProfileService
}