const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission"
    }],
    description: String,

}, { timestamps: true });

const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;