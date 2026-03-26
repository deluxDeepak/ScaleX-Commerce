import React from 'react'
import ProductPriceInd from '../../../components/ProductPriceInd';

const OrderSummary = ({ cartItems }) => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;




    return (
        <div className="w-full ">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Summary Header */}
                <div className="bg-gray-900 px-6 py-4">
                    <h2 className="text-lg font-bold text-white tracking-tight">Order Summary</h2>
                </div>

                <div className="p-6 flex flex-col gap-4">

                    {/* Line items */}
                    <div className="flex flex-col gap-3 text-sm text-gray-700">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">
                                Items ({totalItems})
                            </span>
                            <ProductPriceInd price={subtotal} />
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Shipping</span>
                            {shipping === 0 ? (
                                <span className="text-green-600 font-semibold text-xs uppercase tracking-wide">
                                    FREE
                                </span>
                            ) : (
                                <ProductPriceInd price={shipping} />
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Discount</span>
                            <span className="text-green-600 font-semibold">—</span>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Total */}
                    <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">Total</span>
                        <div className="text-right">
                            <ProductPriceInd price={total} />
                            <p className="text-xs text-blue-400">Incl. taxes</p>
                        </div>
                    </div>


                    {/* Promo code */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Promo code"
                            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                        />
                        <button className="text-sm font-semibold px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                            Apply
                        </button>
                    </div>



                    <p className="text-center text-xs text-gray-400">
                        By continuing, you agree to our{" "}
                        <a href="#" className="underline hover:text-gray-600">Terms</a> &{" "}
                        <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>
                    </p>
                </div>
            </div>

            {/* Payment icons */}
            <p className="text-center text-xs text-gray-400 mt-3">
                🔒 SSL Encrypted &nbsp;|&nbsp; Visa &nbsp;·&nbsp; Mastercard &nbsp;·&nbsp; UPI &nbsp;·&nbsp; PayPal
            </p>
        </div>
    )
}

export default OrderSummary