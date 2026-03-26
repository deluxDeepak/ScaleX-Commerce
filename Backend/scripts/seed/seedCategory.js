const Category = require("../../src/modules/category/category.model");
const categoryData = require("./data/dataCategory");

const seedCategory = async () => {
    await Category.deleteMany();

    const cats = await Category.create(categoryData);

    cats.map((cat) => {

        console.log("Category created", cat._id);
    })

    console.log("Category seeded ");
    return cats
};

module.exports = seedCategory