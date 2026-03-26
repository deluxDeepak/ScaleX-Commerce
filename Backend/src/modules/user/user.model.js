const mongoose = require("mongoose");

// ─── Address ──────────────────────────────────────────────────────────────────
const AddressSchema = new mongoose.Schema({
  label: {
    type: String,
    enum: ["Home", "Work", "Other"],  // user tags their address type
    default: "Home",
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "India",
  },
  isDefault: {
    type: Boolean,       // user can mark one address as default
    default: false,
  },
});

// ─── User ─────────────────────────────────────────────────────────────────────
const UserSchema = new mongoose.Schema(
  {
    // ── Identity ──────────────────────────────────
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,        // no two users with same email
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,        // store bcrypt hashed password, never plain text
      required: true,
    },

    /*
      Agar tumne schema me sparse: true laga diya hai aur fir bhi same error aa raha hai, to problem schema me nahi hai, problem hai MongoDB me pehle se bana hua index.
      MongoDB old index ko automatically update nahi karta.

      -agr phone number nahi diya to ,ye null ko unique man leta hai aur dusra null nahi banata hai 
      -use saprse to ignore null 
  */
    phone: {
      type: String,
      unique: true, 
      sparse:true
    },
    profileImg: {
      type: String,        // URL to profile image
      default: "",
    },

    // ── Role & Status ─────────────────────────────
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",  // controls what they can access
    },
    isActive: {
      type: Boolean,
      default: true,        // admin can ban a user by setting false
    },
    isVerified: {
      type: Boolean,
      default: false,       // email verification status
    },

    // ── Addresses ─────────────────────────────────
    addresses: [AddressSchema], // array — user can have multiple addresses

    // ── Auth & Security ───────────────────────────
    refreshToken: {
      type: String,          // store current session refresh token
      default: null,
    },
    passwordResetToken: {
      type: String,          // temporary token for forgot password flow
      default: null,
    },
    passwordResetExpiry: {
      type: Date,            // token expires after e.g. 15 minutes
      default: null,
    },
  },
  { timestamps: true }       // createdAt = account created, updatedAt = last login etc.
);

const User = mongoose.model("User", UserSchema);
module.exports = User;