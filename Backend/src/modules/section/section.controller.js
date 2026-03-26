const { getAllSectionService, createSectionService, updateSectionService, deleteSectionService } = require("./section.service");

const getAllSection = async () => {
    try {
        const section = await getAllSectionService();
        res.status(200).json({
            success: true,
            sections: section,
            message: "Sections feteched successfully"
        });
    } catch (error) {
        logger.error({ error }, "Error in fetching section product")
        res.status(500).json({
            success: false,
            message: error.message || "Error in fetching section product"
        });

    }
}

const createSection = async (req, res) => {
    try {
        const data = req.body;
        const section = await createSectionService(data);
        res.status(200).json({
            success: true,
            section: section,
            message: "Section created Successfully"
        });
    } catch (error) {
        logger.error({ error }, "Error in Creating section of  product")
        res.status(500).json({
            success: false,
            message: error.message || "Error in Creating section of  product"
        });

    }
}
const updateSection = async () => {
    try {
        const sectionId = req.params.id;
        const data = req.body;
        const section = await updateSectionService(sectionId, data);
        res.status(200).json({
            success: true,
            section: section,
            message: "Section updated Successfully"
        });
    } catch (error) {
        logger.error({ error }, "Error in updating section ")
        res.status(500).json({
            success: false,
            message: error.message || "Error in updating section "
        });

    }
}
const deleteSection = async () => {
    try {
        const sectionId = req.params.id;
        const section = await deleteSectionService(sectionId);
        res.status(200).json({
            success: true,
            section: section,
            message: "Section delted Successfully"
        });
    } catch (error) {
        logger.error({ error }, "Error in deleting section ")
        res.status(500).json({
            success: false,
            message: error.message || "Error in deleting section "
        });

    }
}


module.exports = {
    getAllSection,
    createSection,
    deleteSection,
    updateSection

}