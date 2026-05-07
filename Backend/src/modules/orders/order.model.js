const mongoose = require("mongoose");

// Snapshot store karte hai direct product store nahi karte hai 
const OrderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,   //history --new nahi (seller change the price and different)
    price: Number,  //history --new nahi 
    qty: Number,    //history --new nahi
    image: String,  //history --new nahi 
});

const ShipmentSchema = new mongoose.Schema({

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    trackingId: String,      // courier tracking number
    courier: String,        // e.g., Delhivery, BlueDart

    // "pending" → "accepted" → "packed" → "shipped" → "out_for_delivery" → "delivered"
    status: {
        type: String,
        enum: [
            "pending",
            "accepted",
            "packed",
            "shipped",
            "out_for_delivery",
            "delivered"
        ],
        default: "pending"
    },

    // Push current status 
    statusHistory: [
        {
            status: String,
            timestamp: {
                type: Date,
                default: Date.now()
            }

        }

    ],
})

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [OrderItemSchema],    //Snapshot of the order 
        shipments: [ShipmentSchema],    //tracking layer of the order

        totalPrice: Number,
        status: {
            type: String,
            enum: [
                "created",     // order placed
                "paid",        // payment done
                "cancelled",    // Order cancel
                "completed",   // all shipments delivered
                "processing"
            ],
            default: "created",
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

        // What is the Payment method ?.
        paymentMethod: {
            type: String,
            enum: ["COD", "ONLINE"],
        },

        // Payment is done or not 
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending"
        },

        // After payment is done 
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        },
        estimatedDelivery: Date
    },
    { timestamps: true }
);

OrderSchema.index({
    "shipments.seller": 1,
    "shipments.status": 1,
    createdAt: -1
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;