const Category = require("../../src/modules/category/category.model");
const SubCategory = require("../../src/modules/category/subCategory.model");
const categoryData = require("./data/dataCategory");

const createCategoryWithSubs = async (dataArray) => {
    await Category.deleteMany();

    const results = [];

    for (const data of dataArray) {
        const { name, slug, icon, subCategories } = data;

        const createdSubs = await SubCategory.insertMany(subCategories);

        const category = await Category.create({
            name,
            slug,
            icon,
            subCategories: createdSubs.map(s => s._id),
        });

        results.push(category);
    }

    return results;
};


const seedCategory = async () => {
    const cats = await createCategoryWithSubs(categoryData);

    console.log("Category seeded with Subcategory");
    return cats
};

module.exports = seedCategory