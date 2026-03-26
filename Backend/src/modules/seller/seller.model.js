// Seller is user ---but seller ka khudka extra data hoga 
const sellerProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  shopName: String,
  gstNumber: String,
  address: String,
});