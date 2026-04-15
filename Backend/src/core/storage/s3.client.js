// Storage config can be done here 

const {S3Client}=require("@aws-sdk/client-s3");
const config = require("../config/env.config");
const logger = require("../logger/logger");

const storageClient=new S3Client({
    endpoint:config.STORAGE_ENDPOINT ,
    region:"us-east-1",
    credentials:{
        accessKeyId:config.STORAGE_ACCESS,
        secretAccessKey:config.STORAGE_SECRET
    },
    // Required for minio 
    forcePathStyle:true

})
logger.info("MinIO storage client initialized");
module.exports=storageClient