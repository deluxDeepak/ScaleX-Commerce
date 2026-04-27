const mongoose = require("mongoose");

// Snapshot store karte hai direct product store nahi karte hai 
const OrderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name: String,   //history --new nahi (seller change the price and different)
    price: Number,  //history --new nahi 
    qty: Number,    //history --new nahi
    image: String,  //history --new nahi 
});

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [OrderItemSchema],
        totalPrice: Number,
        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "delivered", "accepted", "cancelled"],
            default: "pending",
        },

        // Order me address snapshot ke liye store karte hain, user wale address se link nahi rakhte.
        // Order karke agr user adress change kar le to problem hoga 
        // A copy of address is save to the db not refrence ----refrence change adress cahange 
        address: {
            fullName: String,
            phone: String,
            street: String,
            city: String,
            state: String,
            pincode: String,
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "ONLINE"],
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;