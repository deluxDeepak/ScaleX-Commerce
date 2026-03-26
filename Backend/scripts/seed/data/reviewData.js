
const Product = require("../../../src/modules/products/product.model");
const User = require("../../../src/modules/user/user.model");


// ✅ Better product review images
const imageList = [
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db", // laptop
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", // phone
    "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd", // headphones
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff", // shoes
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad", // watch
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f", // camera
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853", // macbook
];


// ✅ random image
const getRandomImage = () => {
    return imageList[
        Math.floor(Math.random() * imageList.length)
    ];
};


// ✅ 3 images per review
const getImages = () => {
    return [
        getRandomImage(),
        getRandomImage(),
        getRandomImage(),
    ];
};


// ✅ random rating 1-5
const generateRating = () => {
    return Math.ceil(Math.random() * 5);
};



// ✅ generate reviews
const getReview = async () => {

    const products = await Product.find();
    const user = await User.findOne({ role: "customer" });

    if (!user) {
        throw new Error("Customer not found");
    }
    const userId = user._id;
    const reviews = [];

    for (let product of products) {

        reviews.push({
            product: product._id,
            user: userId,
            name: "Test User",
            title: "Good product",
            rating: generateRating(),
            description: "This is a test review",
            reviewImages: getImages()
        });
    }

    return reviews;
};

module.exports = getReview;