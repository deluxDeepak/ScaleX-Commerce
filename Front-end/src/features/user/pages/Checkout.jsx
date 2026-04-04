import React, { useState } from 'react'
import { MapPin, Plus, CheckCircle, Home, Briefcase, LocateFixed, Pencil, Trash2 } from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import OrderSummary from '../../store/components/OrderSummary'
import Button from '../../store/components/Button'
import { useAddress } from '../hooks/useAdress'

// ===== Add / Edit Address Form =====
const AddressForm = ({ onClose }) => {
    const [form, setForm] = useState({
        type: "Home", name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: ""
    });

    const { addAddress } = useAddress();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form is ", form);
        addAddress(form);
        onClose();

    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-5">
            <h3 className="font-bold text-gray-900 text-base sm:text-lg">Add New Address</h3>

            <div className="flex flex-wrap gap-2 sm:gap-3">
                {["Home", "Work", "Other"].map((t) => (
                    <Button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, type: t })}
                        className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border text-xs sm:text-sm font-semibold transition
                            ${form.type === t
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-md"
                                : "bg-white text-gray-600 border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                            }`}
                    >
                        {t === "Home" ? <Home size={14} /> : <Briefcase size={14} />}
                        {t}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                    { label: "Full Name", name: "name", placeholder: "Rahul Sharma" },
                    { label: "Phone Number", name: "phone", placeholder: "+91 98765 43210" },
                    { label: "Address Line 1", name: "line1", placeholder: "House / Flat / Block No." },
                    { label: "Address Line 2", name: "line2", placeholder: "Area, Colony, Street" },
                    { label: "City", name: "city", placeholder: "Mumbai" },
                    { label: "State", name: "state", placeholder: "Maharashtra" },
                    { label: "Pincode", name: "pincode", placeholder: "400053" },
                ].map(({ label, name, placeholder }) => (
                    <div key={name} className={name === "line1" || name === "line2" ? "sm:col-span-2" : ""}>
                        <label className="block text-[10px] sm:text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
                        <input
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="w-full border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition placeholder-gray-400"
                        />
                    </div>
                ))}
            </div>

            <Button
                type="Button"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition w-max"
            >
                <LocateFixed size={15} />
                Use my current location
            </Button>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">


                <button
                    onClick={handleSubmit}

                    className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg sm:rounded-xl text-xs sm:text-sm transition active:scale-95 shadow-md"
                >
                    Save Address
                </button>

                <Button
                    onClick={onClose}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold rounded-lg sm:rounded-xl text-xs sm:text-sm transition"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

// action + address show 
const SavedAdress = ({ userAddress, selectedId, setSelectedId, deleteAddress }) => {


    return (
        <div className="flex flex-col gap-2 sm:gap-3">
            {userAddress.map((addr) => {
                const isSelected = selectedId === addr._id;
                return (
                    <div
                        key={addr._id}
                        onClick={() => setSelectedId(addr._id)}
                        className={`relative bg-white rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 lg:p-5 cursor-pointer transition-all duration-200
                                            ${isSelected
                                ? "border-blue-500 shadow-lg shadow-blue-50"
                                : "border-gray-100 hover:border-blue-200 shadow-sm"
                            }`}
                    >
                        {addr.default && (
                            <span className="absolute top-2 sm:top-3 right-2 sm:right-3 text-[10px] sm:text-xs bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full border border-green-200">
                                Default
                            </span>
                        )}

                        <div className="flex items-start gap-2 sm:gap-3">

                            <div className={`mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition
                                                ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                                {isSelected && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500" />}
                            </div>

                            {/* Show address details ====== */}
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg
                                                        ${addr.type === "Home" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"}`}>
                                        {addr.type === "Home" ? <Home size={10} /> : <Briefcase size={10} />}
                                        {addr.type}
                                    </span>
                                    <span className="font-bold text-gray-800 text-xs sm:text-sm">{addr.fullName}</span>
                                    <span className="text-gray-500 text-[10px] sm:text-xs">{addr.phone}</span>
                                </div>

                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                    {addr.line1}, {addr.line2}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    {addr.city}, {addr.state} — <span className="font-bold text-gray-800">{addr.pincode}</span>
                                </p>
                            </div>


                            {/* ----------Update same form khule and delte address -- */}
                            <div className="flex gap-1 shrink-0">

                                <button className="p-1 sm:p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-blue-500 transition"
                                >
                                    <Pencil size={13} />
                                </button>

                                <button className="p-1 sm:p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-red-500 transition"
                                    onClick={deleteAddress}
                                >
                                    <Trash2 size={13} />
                                </button>
                            </div>


                        </div>

                        {isSelected && (
                            <div className="mt-2 sm:mt-3 ml-6 sm:ml-8 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-green-600 font-semibold">
                                <CheckCircle size={12} className="fill-green-100" />
                                Delivering to this address · Estimated 3–5 days
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    )

}

const Checkout = () => {
    const { cartItems } = useCart();
    const { userAddress, setDefaultAddress, deleteAddress } = useAddress();
    console.log("User address", userAddress);

    // const firstAdress = userAddress?.[0]?._id;
    const [selectedId, setSelectedId] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const handleSaveAddress = () => {
        setDefaultAddress(selectedId);
        setShowForm(false);
    };


    const selectedAddress = userAddress.find((a) => a._id === selectedId);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">


            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">

                <div className="flex-1 flex flex-col gap-4 sm:gap-5 lg:gap-6">

                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div>
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-0.5">Step 1</p>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                <MapPin size={18} className="text-blue-500 sm:block hidden" />
                                Delivery Address
                            </h2>
                        </div>
                    </div>

                    <SavedAdress userAddress={userAddress} selectedId={selectedId} setSelectedId={setSelectedId} deleteAddress={deleteAddress} />



                    {!showForm ? (
                        <Button
                            onClick={() => setShowForm(true)}
                            className="mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold text-gray-500 hover:text-blue-600 transition-all"
                        >
                            <Plus size={16} />
                            Add New Address
                        </Button>
                    ) : (
                        <div className="mt-3 sm:mt-4">
                            <AddressForm onClose={() => setShowForm(false)} onSave={handleSaveAddress} />
                        </div>
                    )}

                </div>

                {/* Order summary (right side )======== */}
                <div className="self-start w-full lg:w-96 xl:w-[400px]">
                    <div className="sticky top-20 sm:top-24 flex flex-col gap-3 sm:gap-4">

                        {selectedAddress && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-start gap-2 sm:gap-3 shadow-sm">
                                <MapPin size={16} className="text-blue-600 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">Delivering to</p>
                                    <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-0.5">
                                        {selectedAddress.name} · {selectedAddress.line1}, {selectedAddress.city} — {selectedAddress.pincode}
                                    </p>
                                </div>
                            </div>
                        )}

                        <OrderSummary cartItems={cartItems} />
                        <Button
                            className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl sm:rounded-2xl text-sm sm:text-base transition active:scale-95 shadow-lg"
                        >
                            Proceed to Payment
                        </Button>

                        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                            🔒 100% secure & encrypted checkout
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Checkout