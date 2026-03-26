const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,        // "Trending", "Featured"
            trim: true,
        },
        slug: {
            type: String,
            lowercase: true,
            unique: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Section = mongoose.model("Section", SectionSchema);
module.exports = Section;