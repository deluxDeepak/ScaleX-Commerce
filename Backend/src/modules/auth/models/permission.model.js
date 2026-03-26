const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique: true
    },
    // Which resource allowed 
    resource:{
        type:String,
        required:true
    },
    // which actions are allowed --update delete add 
    action:{
        type:String,
        required:true
    },
    description: String,

}, { timestamps: true });

const Permission = mongoose.model("Permission", PermissionSchema);
module.exports = Permission;