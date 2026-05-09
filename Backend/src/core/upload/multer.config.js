
const multer = require("multer");

// Returns a StorageEngine implementation configured to store files in memory as Buffer objects.
const storage = multer.memoryStorage();

const createFileTypeError = (file) => {
    const error = new Error(
        `Only image files are allowed. Received "${file?.mimetype || "unknown"}" for field "${file?.fieldname || "unknown"}".`
    );
    error.statusCode = 400;
    error.code = "INVALID_FILE_TYPE";
    error.isOperational = true;
    return error;
};

const upload = multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024  //50Mb
    },

    fileFilter: (req, file, cb) => {
        const mimeType = file?.mimetype || "";
        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/avif"
        ];
        const isAllowed = allowedMimeTypes.includes(mimeType);
        // const isImage = /^image\/[\w.+-]+$/i.test(mimeType);

        if (!isAllowed) {
            return cb(createFileTypeError(file), false);
        }

        cb(null, true);
    }

});
module.exports = upload;

