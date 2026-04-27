const SellerProfile = require("./seller.model")


const getSellerProfile = (sellerId) => {
    return SellerProfile.findOne({ userId: sellerId })
}

const findSeller = (userId) => {
    return SellerProfile.findOne({ userId });
}

const createSeller = (userId, data) => {
    return SellerProfile.create({ userId, ...data });
}

module.exports = {
    getSellerProfile,
    findSeller,
    createSeller,
}