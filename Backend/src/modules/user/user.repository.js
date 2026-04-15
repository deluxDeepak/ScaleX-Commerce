const User = require("./user.model")

const findAllUser = async () => {
    return await User.find().lean();
}
// Raw user 
const findUserById = async (id) => {
    return await User.findById(id).lean();
}
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}
// All update 
const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
}

const updateUserPassword = async (id, newPassword) => {
    return await User.findByIdAndUpdate(
        id,
        { $set: { password: newPassword } },
        { new: true }
    )
}



const findUserByEmail = async (email) => {
    return await User.findOne({ email })
}
const createUser = async (data) => {
    return await User.create(data);
}


const findUserBasicById = async (id) => {
    return await User.findById(id).select("name email role profileImg")
}
const findUserProfileById = async (id) => {
    return await User.findById(id).select(
        "-password -sessions -refreshToken"
    );
};
const findandUpdateUserProfileById = async (id, data) => {

    return await User.findByIdAndUpdate(
        id,
        data,
        { new: true }
    ).select("-password -sessions -refreshToken");

};
const findandUpdateUserProfileImg = async (id, url) => {
    return await User.findByIdAndUpdate(id,
        { $set: { profileImg: url } },
        { new: true }
    );
};

// Adress User 
const getMyAddress = async (userId) => {
    const user = await User.findById(userId).select("addresses").lean();
    return user.addresses || [];
}


const findAddress = async (userId, data) => {
    const user = await User.findById(userId);

    return user.addresses?.some((addr) =>
        addr.line1 === data.line1 && addr.pincode === data.pincode
    );

}
// ye user hi return karega address push karna parega array me
const addAddress = async (userId, address) => {
    return await User.findByIdAndUpdate(
        userId,
        { $push: { addresses: address } },
        { new: true }
    )
}


const updateUserRefreshToken = async (userId, refreshToken) => {
    return await User.findByIdAndUpdate(
        userId,
        { refreshToken },
        { new: true }
    )
}

const updateUserPasswordToken = async (email, resetToken, resetTokenExpiry) => {

    return await User.findOneAndUpdate(
        { email },
        { $set: { passwordResetToken: resetToken, passwordResetExpiry: resetTokenExpiry } },
        { new: true }


    )

}
const findAndCheckTokenExpiry = async (resetToken) => {
    // expiry is greateer then dont include the user 
    return await User.findOne(
        {
            passwordResetToken: resetToken,
            passwordResetExpiry: { $gt: Date.now() }
        }

    )
}


/*
const updateAddress = async (userId, addressId, data) => {
    return await User.findOneAndUpdate(
        { _id: userId, "addresses._id": addressId },

        // ye jo field update ke liye aa reha hai wo karke baki replace kar de reha hai 
        // ->update and delte baki ka feild jaise id also 
        // Only update jo feild me update kiya hai 

        { $set: { "addresses.$": data } },
        { new: true }
    )
}
*/

const updateAddress = async (userId, addressId, data) => {

    const updateFeild = {};
    // key and value make ===========
    for (let key in data) {
        updateFeild[`addresses.$.${key}`] = data[key];
    }

    return await User.findOneAndUpdate(
        { _id: userId, "addresses._id": addressId },
        { $set: updateFeild },
        { new: true }
    )
}
const updateDefaultAddress = async (userId, addressId) => {

    // 1.Make all default false first (Sabhi address feild )
    await User.findOneAndUpdate(
        { _id: userId },
        { $set: { "addresses.$[].isDefault": false } }
    )

    // 2.set default address for only One address 
    return await User.findOneAndUpdate(
        { _id: userId, "addresses._id": addressId },
        { $set: { "addresses.$.isDefault": true } },
        { new: true }
    )
}

// pull use kar sakte hai 
const delteAddress = async (userId, addressId) => {
    return await User.findByIdAndUpdate(
        userId,
        { $pull: { addresses: { _id: addressId } } },
        { new: true }
    )

}



module.exports = {
    findAllUser,
    findUserById,
    updateUser,
    deleteUser,


    createUser,
    findUserByEmail,
    findUserBasicById,

    // User profile 
    findUserProfileById,
    findandUpdateUserProfileById,
    findandUpdateUserProfileImg,

    // adress 
    findAddress,
    getMyAddress,
    addAddress,
    updateAddress,

    updateUserRefreshToken,
    updateUserPasswordToken,
    findAndCheckTokenExpiry,
    updateUserPassword,

    delteAddress,
    updateDefaultAddress,
}