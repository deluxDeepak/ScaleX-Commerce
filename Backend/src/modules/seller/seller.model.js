const mongoose = require("mongoose");

// Seller is user ---but seller ka khudka extra data hoga 
const sellerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  shopName: String,
  gstNumber: String,
  address: String,
});

const SellerProfile = mongoose.model("SellerProfile", sellerProfileSchema);
module.exports = SellerProfile;