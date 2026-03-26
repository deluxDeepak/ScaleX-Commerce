const { ValidationError, DatabaseError, NotfoundError } = require("../../shared/errors");
const { hashPassword } = require("../../shared/utils/password.utils");
const { createUser, findByEmail, findUserById, findUserBasicById, findUserProfileById, findandUpdateUserProfileById, findAllUser, updateUser, deleteUser, getMyAddress, addAddress, updateAddress, delteAddress, updateDefaultAddress, findandUpdateUserProfileImg } = require("./user.repository")

const getAllUserService = async () => {
    const users = await findAllUser();
    if (!users) {
        throw new DatabaseError("Users not persent");
    }
    return users || [];
}
const getUserByIdService = async (id) => {
    const user = await findUserById(id);
    if (!user) {
        throw new DatabaseError("User not found");
    }
    return user;
}

// Ye normally admin bhi update kar sakta hai all allowed 
const updateUserService = async (id, data) => {
    if (!id || !data) {
        throw new ValidationError("Id or Data is not valid")
    }
    const user = await updateUser(id, data);
    if (!user) {
        throw new DatabaseError("Error in Updatation of user ");
    }

    return user;
}
const deleteUserService = async (id) => {
    if (!id) {
        throw new ValidationError("Id is reuquired for deltion of the user ");
    }

    const user = await deleteUser(id);
    if (!user) {
        throw new DatabaseError("Error in deletion of Users");
    }

    return user;
}

const createUserService = async (data) => {


    if (!data.name) {
        throw new ValidationError("Name is required");
    }
    if (!data.email) {
        throw new ValidationError("Email is required");
    }
    if (!data.password) {
        throw new ValidationError("Password is required");
    }

    try {
        let user = await findByEmail(data.email);
        if (user) {
            throw new DatabaseError("User already exist");
        }

        // if user exist nahi krta hai tab user create karenge 
        // Pssword hash yehi hota hai 
        const hashedPassword = await hashPassword(data.password);
        const userCreate = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role
        };
        user = await createUser(userCreate);
        if (!user) {
            throw new DatabaseError("Error in user creation");
        }
        return user;

    } catch (err) {
        throw err;
    }
};

const findUserBasicService = async (id) => {
    const user = await findUserBasicById(id); //selected field hi ayega 
    if (!user) {
        throw new DatabaseError("User not found");
    }
    return user;
}
const findUserProfileService = async (id) => {
    if (!id) {
        throw new ValidationError("User id is required");
    }
    const user = await findUserProfileById(id);

    if (!user) {
        throw new DatabaseError("User not found");
    }
    return user;
};

// Content type-- application json (Simple content update)
const updateUserProfileService = async (id, data) => {
    if (!id) {
        throw new ValidationError("User id is required");
    }

    // Only this feild user can update 
    const allowedFields = [
        "name",
        "phone",
        "avatar",
        "address",
        "bio"
    ];

    const filteredData = {};

    for (let key of allowedFields) {
        if (data[key] !== undefined) {
            filteredData[key] = data[key];
        }

        if (!allowedFields.includes(data[key])) {
            throw new ValidationError("Some Fields is not allowed to Update");
        }
    }
    const user = await findandUpdateUserProfileById(id, filteredData);

    if (!user) {
        throw new DatabaseError("User not found");
    }
    return user;
};

const updateProfileImgService=async(id,url)=>{
    if(!url){
        throw new ValidationError("Provide user Id");
    }
    const user=await findandUpdateUserProfileImg(id,url);
    if(!user){
        throw new NotfoundError("User not found || Image not updated");
    }

    return user;
}

const getMyAddressService = async (userId) => {
    if (!userId) {
        throw new ValidationError("User not found or Provide id");
    }
    // 1.FInd the user 
    // 2.Update the user with adress
    const address = await getMyAddress(userId);
    if (!address || address.lenght === 0) {
        return [];
    }
    return address;
}
const addAddressService = async (userId, address) => {
    if (!userId) {
        throw new ValidationError("User not found or Provide id");
    }
    // 1.FInd the user 
    // 2.Update the user with adress
    if (!address) {
        throw new ValidationError("Provide adress with reuired feild");
    }
    console.log("Address is", address);
    // if(!fullName){
    //     throw new ValidationError("Name is required");
    // }
    const user = await addAddress(userId, address);
    if (!user) {
        throw new DatabaseError("Error in adding adress Users");
    }
    return user.addresses;
}
const updateAddressService = async (userId, addressId, address) => {
    console.log("address is ", address);
    if (!userId) {
        throw new ValidationError("User not found or Provide id");
    }
    if (!addressId) {
        throw new ValidationError("AddressId required");
    }
    if (!address) {
        throw new ValidationError("Provide adress with required feild");
    }

    const safeAddress = {};
    console.log("safe address", safeAddress);

    const allowedFields = [
        "labele",
        "fullName",
        "phone",
        "street",
        "city",
        "state",
        "country",
        "pincode",
        "isDefault",
    ]

    /*
    for (let key of allowedFields) {
        console.log("Key is ", key);
        if (address[key] === allowedFields[key]) {
            console.log("Allwed feilds OK");
        }

        if (address[key] !== undefined) {
            safeAddress[key] = address[key]
        }

        // ye chalega but ye value dekhega -----value false ho jayega tab wo value skip kar dega 
        // ---use key check karo 
        if (!allowedFields.includes(address[key])) {
            console.log("Some Feilds are not allowed to change || Feilds not exist");
        }
    }
    */

    // if koi feild agr mismatch hua to safeAddress me kuch nahi ayega --so check kar skate hai safeaddress after this for loop will end 
    for (let key in address) {
        if (!allowedFields.includes(key)) {
            throw new ValidationError(`${key} is not allowed`)
        }
        console.log("Keys are", key);

        safeAddress[key] = address[key];
    }

    if (Object.keys(safeAddress).length === 0) {
        throw new ValidationError("No valid feilds");
    }
    console.log(safeAddress);

    const user = await updateAddress(userId, addressId, safeAddress);

    //ye null ayega 
    console.log("User with extra feild", user);
    if (!user) {
        throw new DatabaseError("Error in adding adress Users");
    }

    return user.addresses;
}
const delteAddressService = async (userId, addressId) => {
    if (!userId) {
        throw new ValidationError("User not found or Provide id");
    }
    // 1.FInd the user 
    // 2.Update the user with adress
    if (!addressId) {
        throw new ValidationError("Provide address");
    }

    const user = await delteAddress(userId, addressId);
    console.log("User is ", user);
    if (!user) {
        throw new DatabaseError("Error in adding address Users");
    }

    return user.addresses;
}
const setDefaultAddressService = async (userId, addressId) => {
    if (!userId) {
        throw new ValidationError("User not found or Provide id");
    }
    if (!addressId) {
        throw new ValidationError("Provide address");
    }

    const user = await updateDefaultAddress(userId, addressId);
    if (!user) {
        throw new DatabaseError("Error in updating default address");
    }

    return user.addresses;
}


module.exports = {
    getAllUserService,
    updateUserService,
    deleteUserService,
    getUserByIdService,


    createUserService,
    findUserBasicService,
    findUserProfileService,
    updateUserProfileService,

    // Adress 
    getMyAddressService,
    addAddressService,
    updateAddressService,
    delteAddressService,
    setDefaultAddressService,

    updateProfileImgService,

}