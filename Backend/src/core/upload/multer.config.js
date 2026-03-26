
const multer = require("multer");

// Returns a StorageEngine implementation configured to store files in memory as Buffer objects.
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024  //50Mb
    },

    fileFilter: (req, file, cb) => {
        // const allowedFileTypes = ["image/"];

        // if (!allowedFileTypes.includes(file.mimetype)) {
        //     return cb(new Error("Only images are allowed"), false);
        // }

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp"
        ];

        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only images are allowed"), false);

        }

        cb(null, true);
    }

});
module.exports = upload;

