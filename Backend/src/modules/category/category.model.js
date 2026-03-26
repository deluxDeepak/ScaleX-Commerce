// category and subcategory yehan rakh sakte hai 
const mongoose = require("mongoose");

/*
    Slug = URL friendly unique string used instead of ID for SEO and readable URLs.
    Database me search easy ho jata hai 
    Instead of id you can use slug 
    findBySlug("mobile-phones")
    Instead of findById("689abc")

    npm install slugify to generate unique slug 
*/
const SubCategorySchema = new mongoose.Schema({
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

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,        // No duplicate "Electronics"
            trim: true,
        },
        slug: {
            type: String,
            lowercase: true,
            unique: true,        // for clean URLs: /category/electronics
        },
        icon: String,          // optional: category icon URL
        isActive: {
            type: Boolean,
            default: true,       // admin can disable a category
        },
        subCategories: [SubCategorySchema],  // embedded inside category
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;