const Permission = require("../auth/models/permission.model")

// Only db queries 
// ==================Permission query =============
const findPermission = (name) => {
    return Permission.findOne({ name });
}
const findAllPermission=()=>{
    return Permission.find();
}
const findPermissionById=(id)=>{
    return Permission.findById(id);
}
const updatePermissionById=(id,data)=>{
    return Permission.findByIdAndUpdate(id,data);
}
const deletePermissionById=(id)=>{
    return Permission.findByIdAndDelete(id);
}

// ==========================Role query ================
const findRole = (name) => {
    return Permission.findOne({ name });
}
const findAllRole=()=>{
    return Permission.find();
}
const findRoleById=(id)=>{
    return Permission.findById(id);
}
const updateRoleById=(id,data)=>{
    return Permission.findByIdAndUpdate(id,data);
}
const deleteRoleById=(id)=>{
    return Permission.findByIdAndDelete(id);
}


module.exports={
    // Permission
    findPermission,
    findAllPermission,
    findPermissionById,
    updatePermissionById,
    deletePermissionById,
    // Roles 
    findRole,
    findAllRole,
    findRoleById,
    updateRoleById,
    deleteRoleById
}