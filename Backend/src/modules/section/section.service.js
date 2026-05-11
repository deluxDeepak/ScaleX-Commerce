const { ValidationError, DatabaseError, NotfoundError } = require("../../shared/errors");
const generateSlug = require("../../shared/utils/genSlug");
const sectionRepo = require("./section.repository");

const getAllSectionService = async () => {
    const section = await sectionRepo.getAllSection();
    if (!section || section.length === 0) {
        return [];
    }

    return section;
}
const createSectionService = async (data) => {
    if (!data) {
        throw new ValidationError("Data is required to create the section ");
    }
    if (!data.name) {
        throw new ValidationError("Name of Section is required");
    };

    const slug = generateSlug(data?.name);
    data.slug = slug;

    const section = await sectionRepo.createSection(data);
    if (!section) {
        throw new DatabaseError("Section is not created ");
    }

    return section;
}
const updateSectionService = async (sectionId, data) => {
    if (!data || !sectionId) {
        throw new ValidationError("Data or section is required to update the section ");
    }
    if (!data.name) {
        throw new ValidationError("Name of Section is reuqired");
    };

    const slug = generateSlug(data?.name);
    data.slug = slug;

    const section = await sectionRepo.updateSection(sectionId, data);
    if (!section) {
        throw new NotfoundError("Sectin not found ");
    }

    return section;
}
const deleteSectionService = async (sectionId) => {
    if (!sectionId) {
        throw new ValidationError("section is required to delte the section ");
    }
    const section = await sectionRepo.delteSection(sectionId);
    if (!section) {
        throw new NotfoundError("Section not found ");
    }

    return section;
}
module.exports = {
    getAllSectionService,
    createSectionService,
    updateSectionService,
    deleteSectionService,
}