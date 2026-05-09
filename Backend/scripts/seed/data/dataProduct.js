const Category = require("../../../src/modules/category/category.model");
const User = require("../../../src/modules/user/user.model");

const imageList = [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
];

const sections = [
    "trending",
    "newArrival",
    "featured",
    "topDiscounted",
    "flashSale",
];


// ---------------- helpers ----------------

const getRandom = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

const getRandomImage = () => getRandom(imageList);

const getImages = () => [
    getRandomImage(),
    getRandomImage(),
    getRandomImage(),
];

const getRandomSection = () => getRandom(sections);

const getRandomPrice = () =>
    Math.floor(Math.random() * 5000) + 500;

const getRandomStock = () =>
    Math.floor(Math.random() * 50) + 1;


// ---------------- main ----------------

const getProducts = async () => {

    const categories = await Category.find().populate({
        path: "subCategories",
        select: "name slug icon"   // optimize response
    });

    const seller = await User.findOne({ role: "seller" });

    const sellerId = seller._id;
    const products = [];
    let count = 1;

    for (const cat of categories) {

        for (const sub of cat.subCategories) {

            const price = getRandomPrice();

            products.push({
                title: `${sub.name} Product ${count}`,
                slug: `${sub.slug}-${count}`,
                description: "Test product description",

                features: ["Good", "Quality", "Best"],
                images: getImages(),
                category: cat._id,
                subCategory: sub._id,
                price: price,
                oldPrice: price + 200,
                stock: getRandomStock(),
                seller: sellerId,

                sections: [getRandomSection()],
            });

            count++;
        }
    }

    return products;
};

module.exports = getProducts;