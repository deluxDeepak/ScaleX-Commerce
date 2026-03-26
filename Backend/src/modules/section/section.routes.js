const router = require("express").Router();
const {
    createSection,
    getAllSection,
    deleteSection,
    updateSection,
} = require("./section.controller");

router.post("/", createSection);
router.get("/", getAllSection);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);

module.exports = router;