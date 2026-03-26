const upload = require("./multer.config");

const singleImage = upload.single("image");
const multipleImage = upload.array("images", 5);

module.exports = {
    singleImage,
    multipleImage
}