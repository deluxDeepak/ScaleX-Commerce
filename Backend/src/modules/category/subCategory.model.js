const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,        // "mobile-phones" → used in URLs
        lowercase: true,
    },
    icon: String
});

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
module.exports = SubCategory