const { uploadObjectService } = require("../../core/storage/storage.services");
const { generateKey } = require("../../shared/utils/genKeys.utils");
const { findUserProfileService, updateUserProfileService, getAllUserService, getUserByIdService, deleteUserService, updateUserService, createUserService, addAddressService, updateAddressService, delteAddressService, getMyAddressService, setDefaultAddressService, updateProfileImgService } = require("./user.service")

// seller/admin/user 
const getAllUser = async (req, res) => {
    try {
        const users = await getAllUserService();
        return res.status(200).json({
            success: true,
            users: users,
            message: "Successfully fetch the Users",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error in fetching",
        });
    }
}
const getUserById = async (req, res) => {
    // const id = req.user.id
    const id = req.params.id;
    try {
        const users = await getUserByIdService(id);
        return res.status(200).json({
            success: true,
            user: users,
            message: "Successfully fetch the User",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error in fetching",
        });
    }

}
const createUser = async (req, res) => {
    try {

        const user = await createUserService(req.body);

        return res.status(201).json({
            success: true,
            user,
            message: "User created"
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};
const deleteUser = async (req, res) => {
    // const id = req.user.id  //Authentication 
    const { id } = req.params;
    console.log("User id ", id);
    try {
        const users = await deleteUserService(id);
        return res.status(200).json({
            success: true,
            user: users,
            message: "Successfully delted the User",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error in deliting the user",
        });
    }

}
const updateUser = async (req, res) => {
    // const id = req.user.id
    const id = req.params.id
    const data = req.body;
    try {
        const users = await updateUserService(id, data);
        return res.status(200).json({
            success: true,
            user: users,
            message: "Successfully fetch the User",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error in fetching",
        });
    }

}

// User specific task 
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id; // decode auth se ayega
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const user = await findUserProfileService(userId);
        return res.status(200).json({
            success: true,
            user: user,
            message: "Successfully fetch the me",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error in fetching",
        });
    }
}
const updateProfile = async (req, res) => {

    const userId = req.user.id;
    const data = req.body;

    try {

        const user = await updateUserProfileService(userId, data);

        res.status(200).json({
            success: true,
            user: user,
            message: "User profile updated successfully"
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message || "Error updating profile",
        });
    }

};
const uploadProfileImage = async (req, res) => {
    const file = req.file;
    const id = req.user.id;

    try {
        const key = generateKey("userImg", file.originalname);
        console.log("Key generated is ", key);
        const uploadRes = await uploadObjectService({
            key: key,
            body: file.buffer,
            contentType: file.mimetype
        });
        console.log("User prfile url and key is ", uploadRes);
        // Reponse me jo url ayega wahi yehan update karenge 
        const user = await updateProfileImgService(id, uploadRes.url);

        res.status(200).json({
            success: true,
            user: user,
            message: "User image updated successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Error updating profile Image",
        });
    }
}

// Address ===============
const getMyAddress = async (req, res) => {
    const userId = req.user.id;
    try {
        const address = await getMyAddressService(userId);
        return res.status(200).json({
            success: true,
            address: address,
            message: "Successfully fetch the Address",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error in fetching address",
        });
    }

}
const addAddress = async (req, res) => {
    const userId = req.user.id;
    // const { address } = req.body;
    const address = req.body;
    try {
        const result = await addAddressService(userId, address);
        return res.status(200).json({
            success: true,
            address: result,
            message: "Successfully added the Address",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error in Adding address",
        });
    }

}
const updateAddress = async (req, res) => {
    const addressId = req.params.id;
    const userId = req.user.id;
    const address = req.body;
    console.log("Hit update address", address);
    try {
        const result = await updateAddressService(userId, addressId, address);
        return res.status(200).json({
            success: true,
            address: result,
            message: "Successfully updated the Address",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error in updating address",
        });
    }

}
const delteAddress = async (req, res) => {
    const addressId = req.params.id;
    const userId = req.user.id;
    try {
        const address = await delteAddressService(userId, addressId);
        return res.status(200).json({
            success: true,
            address: address,
            message: "Successfully delted the Address",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error in deleting address",
        });
    }

}
const setDefaultAddress = async (req, res) => {
    const addressId = req.params.id;
    const userId = req.user.id;
    try {
        const address = await setDefaultAddressService(userId, addressId);
        return res.status(200).json({
            success: true,
            address: address,
            message: "Successfully set the default Address",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Error in setting  address",
        });
    }

}


module.exports = {
    getAllUser,
    getUserById,
    createUser,
    deleteUser,
    updateUser,

    // Profile update 
    getProfile,
    updateProfile,
    uploadProfileImage,

    // Images 
    getMyAddress,
    updateAddress,
    addAddress,
    delteAddress,
    setDefaultAddress,
}