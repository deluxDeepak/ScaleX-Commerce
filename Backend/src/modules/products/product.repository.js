const { default: mongoose } = require("mongoose");
const pagination = require("../../shared/utils/pagination.utils");
const Product = require("./product.model");
const Apifeature = require("../../shared/utils/ApiFetures");
require("../category/subCategory.model");

// Pagination laga ke bhej sakte hai pura product bhej denge load bharega db pe 
const findAllProduct = async (query) => {
    // filter apply kar sakte hai 
    const mongoQuery = Product.find().populate("category").lean()    //performance better 
    // const mongoQuery = Product.find(filter).lean()    //performance better 
    return await pagination(mongoQuery, query);
}
const findFilterProduct = async (queryParams) => {

    const feature = new Apifeature(Product.find(), queryParams);
    return await feature.search().sort().execute();

}
const findProductSuggestion = async (keyword) => {
    // if keyword nahi rehega to pura document return ho jayega 
    if (!keyword) return [];


    // means case insensitive options -i 
    return await Product.find({
        title: { $regex: keyword, $options: 'i' },

    }).select("title price images").limit(10);

}

const findProductByid = async (id) => {
    // .populate() tabhi kaam karta hai jab field me ref defined ho.

    return await Product.findById(id).populate("category subCategory").lean();
}

// Seller product 
const findProductBySellerId = async (sellerId) => {
    return await Product.find({ seller: sellerId }).limit(10).lean()
}

// All can be done by single api also 
// All category match return filter baad me 
const findProductByCategoryId = async (catId) => {
    return await Product.find({
        category: new mongoose.Types.ObjectId(catId)
    }).lean();
}
const findProductBySubCategoryId = async (subId) => {
    return await Product.find({
        subCategory: new mongoose.Types.ObjectId(subId)
    }).lean();
}
const updateProductById = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });    //send the new product updated 

}

// product.service.js
const updateStock = async (productId, type = "decrese", qty, session) => {
    if (type === "decrease") {
        const updated = await Product.findOneAndUpdate({
            _id: productId,
            //for two user in one time important
            stock: { $gte: qty }    
        },
            { $inc: { stock: -qty } },
            { returnDocument: "after", session }
        );

        if (!updated) {
            throw new Error("Insufficient stock");
        }

        return updated;
    }

    // increase case
    return Product.findByIdAndUpdate(
        productId,
        { $inc: { stock: qty } },
        { new: true, session }
    );

}

const deleteProductById = async (id) => {
    return await Product.findByIdAndDelete(id);

}
const createProduct = async (data) => {
    return await Product.create(data);
}

// ====================Image===================
// ✔ fastest
// ✔ production level
// ✔ no load full doc --->bext for update 
const updateProductImg = async (id, images) => {
    return await Product.findByIdAndUpdate(id, {
        $push: {
            images: {
                $each: images   //for array
            }
        }
    }, { new: true })

}

// Kaun sa image remove karna hai url dena hoga 
const deleteProductImg = async (id, imagesUrl) => {
    return await Product.findByIdAndUpdate(id, {
        $pull: {
            images: imagesUrl
        }
    }, { new: true });
}


module.exports = {
    // Basic crud on Product 
    findAllProduct,
    findProductByid,
    findFilterProduct,
    findProductSuggestion,
    findProductByCategoryId,
    findProductBySubCategoryId,
    findProductBySellerId,
    createProduct,
    updateProductById,
    updateStock,
    deleteProductById,

    // Images 
    updateProductImg,
    deleteProductImg


}