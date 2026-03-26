import React from 'react'
import { Minus, Plus, ShoppingCart as CartIcon } from "lucide-react";
import ProductPrice from '../../product/components/ProductPrice';
import { useCart } from '../../../context/CartContext';
import ProductPriceInd from '../../../components/ProductPriceInd';
import EmptyCart from '../components/EmptyCart';
import { useNavigate } from 'react-router-dom';

const Cartheader = ({ cartItems }) => (
    <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
            <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                <CartIcon size={22} />
            </div>
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    Shopping Cart
                </h1>
                <p className="text-sm text-gray-500">
                    {cartItems.length > 0
                        ? `${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} in your cart`
                        : "Your cart is empty"}
                </p>
            </div>
        </div>
    </div>
)

const OrderSummary = ({ cartItems }) => {

    const { totalPrice } = useCart();
    console.log("total price is ", totalPrice);

    const subtotal = totalPrice || 0;
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    return (

        <div className="w-full">

            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-4">
                    <h2 className="text-lg font-bold text-white">
                        Order Summary
                    </h2>
                </div>


                <div className="p-5 flex flex-col gap-4">

                    {/* Subtotal */}
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                            Subtotal
                        </span>

                        <ProductPriceInd price={subtotal} />
                    </div>


                    {/* Shipping */}
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                            Shipping
                        </span>

                        {shipping === 0 ? (
                            <span className="text-green-600 font-semibold text-xs">
                                FREE
                            </span>
                        ) : (
                            <ProductPriceInd price={shipping} />
                        )}

                    </div>


                    {/* Discount */}
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                            Discount
                        </span>

                        <span className="text-green-600 font-semibold">
                            —
                        </span>
                    </div>


                    <hr />


                    {/* Total */}
                    <div className="flex justify-between items-center">

                        <span className="font-bold text-gray-900">
                            Total
                        </span>

                        <div className="text-right">
                            <ProductPriceInd price={total} />
                            <p className="text-xs text-gray-400">
                                Incl. taxes
                            </p>
                        </div>

                    </div>


                    {/* Promo */}
                    <div className="flex gap-2">

                        <input
                            type="text"
                            placeholder="Promo code"
                            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                        />

                        <button
                            className="px-4 py-2 text-sm font-semibold rounded-lg border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
                        >
                            Apply
                        </button>

                    </div>


                    <p className="text-xs text-gray-400 text-center">
                        By continuing you agree to Terms & Privacy
                    </p>

                </div>

            </div>


            <p className="text-center text-xs text-gray-400 mt-3">
                🔒 Secure • Visa • Mastercard • UPI • PayPal
            </p>

        </div>

    );
};
const CartSummary = ({ cartItems }) => {
    const navigate = useNavigate();

    return (

        <div className="w-full space-y-4">

            <OrderSummary cartItems={cartItems} />

            <button
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-md transition active:scale-95"
                onClick={() => navigate("/user/cart/checkout")}
            >
                Proceed to Checkout
            </button>

        </div>

    );
}

const ProductImage = ({ product }) => (
    <div className="w-full sm:w-32 sm:h-32 h-40 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-100">

        <img
            src={product?.images[0]}
            alt={product.title}
            className="w-full h-full object-contain"
        />

    </div>
);
const ProductInfo = ({ product, quantity }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">

            <ProductImage product={product} />

            <div className="flex-1 space-y-1">

                <span className="text-xs font-semibold text-blue-500 uppercase">
                    {product.category}
                </span>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                    {product.title}
                </h3>

                <div className="flex items-center gap-2 mt-1">
                    <ProductPrice price={product.price * quantity} />

                    {product.oldPrice && (
                        <ProductPrice
                            price={product.oldPrice}
                            size="sm"
                            className="line-through text-gray-400"
                        />
                    )}
                </div>

            </div>

            <div className="text-right text-xs text-gray-400 font-medium">
                <ProductPriceInd price={product.price} size="sm" /> /each
            </div>

        </div>
    );
};

const ActionButtons = ({ item }) => {

    const {
        increaseQty,
        decreaseQty,
        removeFromCart,
    } = useCart();

    return (

        <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t pt-3"
        >

            {/* Qty */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">

                <button
                    onClick={() =>
                        decreaseQty(item._id, {
                            quantity: - 1
                        })
                    }
                    className="px-3 py-2 hover:bg-gray-100 transition"
                >
                    <Minus size={14} />
                </button>

                <span className="w-12 text-center font-semibold text-gray-800">
                    {item.quantity}
                </span>

                <button
                    onClick={() =>
                        increaseQty(item._id, {
                            quantity: 1
                        })
                    }
                    className="px-3 py-2 hover:bg-gray-100 transition"
                >
                    <Plus size={14} />
                </button>

            </div>


            {/* Buttons */}
            <div className="flex gap-2">

                <button
                    onClick={() => removeFromCart(item._id)}
                    className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg border border-red-100 hover:bg-red-100 transition"
                >
                    Remove
                </button>

                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition">
                    Buy Now
                </button>

            </div>

        </div>

    );
};
const CartShopping = () => {
    const { cartItems } = useCart();

    return (
        <div>
            {cartItems?.length && cartItems.length > 0 ? (
                <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-8 px-3 sm:px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">

                            <Cartheader cartItems={cartItems} />

                            <div className="space-y-4 mt-4">
                                {cartItems.map((p) => (
                                    <div
                                        key={p._id}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 transition hover:shadow-md"
                                    >
                                        <ProductInfo
                                            product={p.productId}
                                            quantity={p.quantity}
                                        />

                                        <div className="mt-4">
                                            <ActionButtons item={p} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-20">
                                <CartSummary cartItems={cartItems} />
                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <EmptyCart />
                </div>
            )}

        </div>
    );
};

export default CartShopping