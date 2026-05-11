const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    // ─── Basic Info ───────────────────────────────
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,          // "iphone-14-pro" → used in URLs
      unique: true,
      lowercase: true,
      trim: true,
      sparse: true,
    },
    description: {
      type: String,
      trim: true,
    },
    features: [String],
    images: [String],

    // ─── Categorization (admin controlled) ───────
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId, // points to subdoc inside Category
      ref: "SubCategory",
      required: true,
    },

    // "trending",
    // "newArrival",
    // "featured",
    // "topDiscounted",
    // "flashSale", 
    section: {
      type: mongoose.Schema.Types.ObjectId, // optional — "Trending", "Featured" etc
      ref: "Section",
    },

    tags: [{
      type: String,
      lowercase: true,
      trim: true,
    }],

    // ─── Pricing ──────────────────────────────────
    price: {
      type: Number,
      required: true,
      index: true,
      min: 0,
    },
    oldPrice: {
      type: Number,
      min: 0,               // optional — shown as strikethrough original price
    },

    // ─── Inventory ────────────────────────────────
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    // ─── Ratings (auto-calculated, don't set manually) ───
    rating: {
      type: Number,
      default: 0,
      index: true,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      index: true,
      default: 0,
    },

    // ─── Ownership ────────────────────────────────
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",          // the seller who listed this product
      required: true,
    },

    // ─── Status ───────────────────────────────────
    isActive: {
      type: Boolean,
      default: true,        // set false to hide product without deleting it
    },

    // yehan review mat bhejo kyunki review bhut jayda ho sakta hai 
    // reviews: {
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:"Review",
    // },
  },
  { timestamps: true }
);

// Creating text index in db 
ProductSchema.index({
  title: "text",
  description: "text",
  tags: "text"

});

// Ascending descending index in db 
// ProductSchema.index({ price: 1 })

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;