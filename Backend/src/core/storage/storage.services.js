
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const config = require("../config/env.config");
const storageClient = require("./s3.client");
// Object pass karna parega Kya upload karna hai kya rehega kya type rehega 
// ->key,
// ->body,
// ->contentType
const uploadObjectService = async ({ key, body, contentType }) => {
    const objectToStore = new PutObjectCommand({
        Bucket: config.STORAGE_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType
    });

    //send data to store 
    await storageClient.send(objectToStore);
    return {
        key,
        url: `${config.FILE_BASE_URL}/${key}`
    };
};

const deleteObjectService = async (key) => {
    const command = new DeleteObjectCommand({
        Bucket: config.STORAGE_BUCKET,
        Key: key,
    });

    await storageClient.send(command);
    return true;
}

/** 
Use like this in module 
    const createProductServices =()=>{
        const key = `uploads/${Date.now()}-${file.originalname}`

        const result= await uploadObject({
            key,
            body: file.buffer,
            contentType: file.mimetype
        })
    }
*/

module.exports = {
    uploadObjectService,
    deleteObjectService
};