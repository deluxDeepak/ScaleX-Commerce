import React from 'react';
import { category5 } from '../../../assets';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Tag, Truck, RotateCcw } from 'lucide-react';

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[80vh] bg-gradient-to-b from-gray-50 to-white lg:px-4">

            {/* ===== Main Card ===== */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-gray-100 shadow-xl rounded-3xl flex flex-col items-center px-8 py-12 w-full max-w-xl text-center gap-6">

                {/* Glow background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-40" />

                {/* ===== Illustration ===== */}
                <div className="relative flex items-center justify-center z-10">
                    <div className="absolute w-56 h-56 rounded-full bg-blue-100/40 blur-2xl" />
                    
                    <img
                        src={category5}
                        alt="Empty Cart"
                        className="relative z-10 w-44 h-44 object-contain drop-shadow-xl"
                    />

                    {/* Floating icon */}
                    <div className="absolute -top-2 -right-2 w-11 h-11 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                        <ShoppingCart size={18} className="text-white" />
                    </div>
                </div>

                {/* ===== Text ===== */}
                <div className="flex flex-col gap-2 z-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Your cart feels lonely 🛒
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base max-w-md">
                        You haven’t added anything yet. Start exploring and fill it with amazing products.
                    </p>
                </div>

                {/* ===== CTA ===== */}
                <div className="flex flex-col sm:flex-row gap-3 w-full z-10">
                    <Link
                        to="/"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm shadow-lg transition active:scale-95"
                    >
                        Start Shopping <ArrowRight size={16} />
                    </Link>

                    <Link
                        to="/products"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-semibold text-sm transition"
                    >
                        Explore Products
                    </Link>
                </div>
            </div>

            {/* ===== Trust Section ===== */}
            <div className="mt-10 w-full max-w-xl grid grid-cols-3 gap-4">
                {[
                    { icon: Truck, label: "Free Delivery", sub: "Above ₹499", color: "text-blue-600" },
                    { icon: Tag, label: "Best Prices", sub: "Guaranteed", color: "text-green-600" },
                    { icon: RotateCcw, label: "Easy Returns", sub: "10-day policy", color: "text-orange-500" },
                ].map(({ icon: Icon, label, sub, color }) => (
                    <div
                        key={label}
                        className="bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 shadow-md flex flex-col items-center gap-2 py-5 px-3 text-center hover:shadow-lg transition"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${color}`}>
                            <Icon size={18} />
                        </div>
                        <p className="text-sm font-semibold text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default EmptyCart;