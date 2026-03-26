const mongoose = require("mongoose");

// How many items in the cart 
const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,   //Refrence to product id
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    //   agr seller price change kar de to cart pe effect nahi ho 
    price: {
        type: Number,
        // snapshot at time of adding (price change se protect karta hai)
        required: true,
    },
});

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // ek user ka sirf ek cart
        },
        // cart ke andar ek embedded array of items hota hai, separate collection nahi. Ek hi query mein poora cart milta hai.
        items: [CartItemSchema],
        totalPrice: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Total price yehi calculate hona chiye (function this persent)
// CartSchema.method.calculateTotalPrice = function () {
//     this.totalPrice = this.items.reduce((total, item) => (
//         total = item.quantity * item.price

//     ), 0)

// }

// Next is not a fucntion =========(use async)
// CartSchema.pre("save", function (next) {

//     this.totalPrice = this.items.reduce((total, item) => {
//         return total + item.quantity * item.price

//     }, 0)

//     next();
// });
CartSchema.pre("save", async function () {

    this.totalPrice = this.items.reduce((total, item) => {
        return total + item.quantity * item.price

    }, 0)

});

CartSchema.post("findOneAndUpdate", async function (doc) {

    if (!doc) return;

    doc.totalPrice = doc.items.reduce((t, item) => {
        return t + item.quantity * item.price;
    }, 0);

    await doc.save();
});



const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;