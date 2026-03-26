const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    refreshToken: String,    //Store hash here 
    userAgent: String,       //Kaunsa browser hai 
    ip: String,
    expiresAt: Date
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;