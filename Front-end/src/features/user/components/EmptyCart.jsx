import React from 'react';
import { category5 } from '../../../assets';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Tag, Truck, RotateCcw } from 'lucide-react';

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full px-4  bg-gray-50">

            {/* ===== Main Card ===== */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center px-8  py-12 max-w-lg w-full text-center gap-6">

                {/* Illustration wrapper with decorative ring */}
                <div className="relative flex items-center justify-center">
                    {/* Outer soft ring */}
                    <div className="absolute w-52 h-52 rounded-full bg-blue-50 border border-blue-100" />
                    {/* Inner glow */}
                    <div className="absolute w-36 h-36 rounded-full bg-blue-100/60" />
                    <img
                        src={category5}
                        alt="Empty Cart"
                        className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 object-contain drop-shadow-md"
                    />
                    {/* Floating cart icon badge */}
                    <div className="absolute z-20 -top-1 -right-1 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                        <ShoppingCart size={18} className="text-white" />
                    </div>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                        Looks like you haven't added anything yet. Browse our latest products and find something you'll love!
                    </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Link
                        to="/"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-100 transition-all duration-200 active:scale-95"
                    >
                        Shop Now <ArrowRight size={16} />
                    </Link>
                    <Link
                        to="/products"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-bold text-sm transition-all duration-200"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>

            {/* ===== Why Shop With Us — trust strip ===== */}
            <div className="mt-8 w-full max-w-lg grid grid-cols-3 gap-3">
                {[
                    { icon: Truck, label: "Free Delivery", sub: "Above ₹499", color: "text-blue-500" },
                    { icon: Tag, label: "Best Prices", sub: "Guaranteed", color: "text-green-500" },
                    { icon: RotateCcw, label: "Easy Returns", sub: "10-day policy", color: "text-orange-500" },
                ].map(({ icon: Icon, label, sub, color }) => (
                    <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-1.5 py-4 px-2 text-center">
                        <div className={`w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center ${color}`}>
                            <Icon size={18} />
                        </div>
                        <p className="text-xs font-bold text-gray-800">{label}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default EmptyCart;