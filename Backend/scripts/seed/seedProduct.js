const Product = require("../../src/modules/products/product.model");
const getProducts = require("./data/dataProduct");

const seedProduct = async () => {

    // delete old products
    await Product.deleteMany();

    // generate products
    const productData = await getProducts();

    // insert
    const products = await Product.insertMany(productData);
    console.log("Products seeded Susscessfully ");

    return products;
}

module.exports = seedProduct;