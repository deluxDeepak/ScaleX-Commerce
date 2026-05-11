const Section = require("./section.model")

const getAllSection = async () => {
    return await Section.find().limit(10).lean();
}

const createSection = async (data) => {
    return await Section.create(data);
}
const updateSection = async (sectionId, data) => {
    return await Section.findByIdAndUpdate(sectionId, data, { new: true });
}
const delteSection = async (sectionId) => {
    return await Section.findByIdAndDelete(sectionId);
}

module.exports = {
    getAllSection,
    createSection,
    updateSection,
    delteSection,
}