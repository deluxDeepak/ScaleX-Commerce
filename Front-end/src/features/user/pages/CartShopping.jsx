import React from 'react'
import { Minus, Plus, ShoppingCart as CartIcon } from "lucide-react";
import ProductPrice from '../../product/components/ProductPrice';
import { useCart } from '../../../context/CartContext';
import ProductPriceInd from '../../../components/ProductPriceInd';
import EmptyCart from '../components/EmptyCart';
import { useNavigate } from 'react-router-dom';

const Cartheader = ({ cartItems }) => (
    <div className="mb-3 sm:mb-4 lg:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg">
                <CartIcon size={20} className="sm:hidden" />
                <CartIcon size={24} className="hidden sm:block" />
            </div>
            <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                    Shopping Cart
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                    {cartItems.length > 0
                        ? `${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} in your cart`
                        : "Your cart is empty"}
                </p>
            </div>
        </div>
    </div>
)

const OrderSummary = () => {

    const { totalPrice } = useCart();
    console.log("total price is ", totalPrice);

    const subtotal = totalPrice || 0;
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    return (

        <div className="w-full">

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-5 py-3 sm:py-4">
                    <h2 className="text-base sm:text-lg font-bold text-white">
                        Order Summary
                    </h2>
                </div>


                <div className="p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">

                    {/* Subtotal */}
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-500">
                            Subtotal
                        </span>

                        <ProductPriceInd price={subtotal} />
                    </div>


                    {/* Shipping */}
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-500">
                            Shipping
                        </span>

                        {shipping === 0 ? (
                            <span className="text-green-600 font-bold text-xs">
                                FREE
                            </span>
                        ) : (
                            <ProductPriceInd price={shipping} />
                        )}

                    </div>


                    {/* Discount */}
                    <div className="flex justify-between items-center text-xs sm:text-sm">
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

                        <span className="font-bold text-gray-900 text-sm sm:text-base">
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
                            className="flex-1 text-xs sm:text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                        />

                        <button
                            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
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

        <div className="w-full space-y-3 sm:space-y-4">

            <OrderSummary cartItems={cartItems} />

            <button
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm sm:text-base"
                onClick={() => navigate("/user/cart/checkout")}
            >
                Proceed to Checkout
            </button>

        </div>

    );
}

const ProductImage = ({ product }) => (
    <div className="w-full sm:w-28 lg:w-32 h-32 sm:h-28 lg:h-32 bg-gray-50 rounded-lg sm:rounded-xl flex items-center justify-center p-2 border border-gray-100">

        <img
            src={product?.images[0]}
            alt={product.title}
            className="w-full h-full object-contain"
        />

    </div>
);
const ProductInfo = ({ product, quantity }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">

            <ProductImage product={product} />

            <div className="flex-1 space-y-1">

                <span className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                    {product.category}
                </span>

                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 leading-snug">
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

            <div className="hidden lg:flex text-right text-xs text-gray-400 font-medium">
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
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 border-t pt-3"
        >

            {/* Qty */}
            <div className="flex justify-between border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden bg-white shadow-sm max-w-xs">

                <button
                    onClick={() =>
                        decreaseQty(item._id, {
                            quantity: - 1
                        })
                    }
                    className="px-3 sm:px-4 py-2 hover:bg-blue-50 transition"
                >
                    <Minus size={14} />
                </button>

                <span className="w-10 sm:w-12 text-center font-bold text-gray-800 flex items-center justify-center">
                    {item.quantity}
                </span>

                <button
                    onClick={() =>
                        increaseQty(item._id, {
                            quantity: 1
                        })
                    }
                    className="px-3 sm:px-4 py-2 hover:bg-blue-50 transition"
                >
                    <Plus size={14} />
                </button>

            </div>


            {/* Buttons */}
            <div className="flex gap-2">

                <button
                    onClick={() => removeFromCart(item._id)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm bg-red-50 text-red-600 rounded-lg border border-red-100 hover:bg-red-100 transition font-semibold"
                >
                    Remove
                </button>

                <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition font-semibold">
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
                <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-2 sm:py-4 lg:py-8  sm:px-4 lg:px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="lg:col-span-2">

                            <Cartheader cartItems={cartItems} />

                            <div className="space-y-3 sm:space-y-4">
                                {cartItems.map((p) => (
                                    <div
                                        key={p._id}
                                        className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5 transition hover:shadow-md hover:border-blue-100"
                                    >
                                        <ProductInfo
                                            product={p.productId}
                                            quantity={p.quantity}
                                        />

                                        <div className="mt-3 sm:mt-4">
                                            <ActionButtons item={p} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-20 sm:top-24">
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