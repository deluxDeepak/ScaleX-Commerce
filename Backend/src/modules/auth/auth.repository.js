// Session repo yehi create karo 

const Session = require("./models/session.model")

const createUserSession = async (sessiondata) => {
    return await Session.create(sessiondata);

}
const findUserSession = async (refreshToken) => {
    // Hashed token ayega 
    return await Session.findOne({ refreshToken });
}

const updateUserSession = async (sessionId, data) => {
    return await Session.findByIdAndUpdate(sessionId, data, { new: true });
}

// delete the token  
const deleteUserSession = async (refreshToken) => {

    // Create Session for the device 
    // return await Session.deleteOne({ refreshToken });

    return await Session.findOneAndDelete({ refreshToken })
}

module.exports = {
    createUserSession,
    deleteUserSession,
    findUserSession,
    updateUserSession
}