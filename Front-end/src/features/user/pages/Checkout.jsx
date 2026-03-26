import React, { useEffect, useState } from 'react'
import { MapPin, Plus, CheckCircle, ChevronRight, Home, Briefcase, LocateFixed, Pencil, Trash2 } from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import OrderSummary from '../../store/components/OrderSummary'
import Button from '../../store/components/Button'
import { savedAddresses } from '../../store/data/savedAddress'
import { useAddress } from '../hooks/useAdress'
import { setDefaultAddressService } from '../service/address.service'
import { removeCartItemsService } from '../service/cart.service'

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

    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col gap-5">
            <h3 className="font-bold text-gray-900 text-lg">Add New Address</h3>

            <div className="flex gap-3">
                {["Home", "Work", "Other"].map((t) => (
                    <Button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, type: t })}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-semibold transition
                            ${form.type === t
                                ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                : "bg-white text-gray-600 border-gray-200 hover:border-blue-200"
                            }`}
                    >
                        {t === "Home" ? <Home size={14} /> : <Briefcase size={14} />}
                        {t}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
                        <input
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition placeholder-gray-400"
                        />
                    </div>
                ))}
            </div>

            <Button
                type="Button"
                className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition w-max"
            >
                <LocateFixed size={15} />
                Use my current location
            </Button>

            <div className="flex gap-3">


                <button
                    onClick={handleSubmit}

                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition active:scale-95 shadow-sm shadow-blue-100"
                >
                    Save Address
                </button>

                <Button
                    onClick={onClose}
                    className="px-5 py-3 border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold rounded-xl text-sm transition"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

const Checkout = () => {
    const { cartItems } = useCart();
    const { userAddress, setDefaultAddress } = useAddress();
    console.log("User address", userAddress);

    // const firstAdress = userAddress?.[0]?._id;
    const [selectedId, setSelectedId] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const handleSaveAddress = (form) => {
        setDefaultAddress(selectedId);
        setShowForm(false);
    };

    const handleRemove = (e) => {
        e.preventDefault();
        console.log("hellow clicked id is",);
    }

    const selectedAddress = userAddress.find((a) => a._id === selectedId);

    return (
        <div className="min-h-screen bg-gray-50">


            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">

                <div className="flex-1 flex flex-col gap-6">

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-0.5">Step 1</p>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <MapPin size={20} className="text-blue-500" />
                                    Delivery Address
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {userAddress.map((addr) => {
                                const isSelected = selectedId === addr._id;
                                return (
                                    <div
                                        key={addr._id}
                                        onClick={() => setSelectedId(addr._id)}
                                        className={`relative bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all duration-200
                                            ${isSelected
                                                ? "border-blue-500 shadow-md shadow-blue-50"
                                                : "border-gray-100 hover:border-blue-200 shadow-sm"
                                            }`}
                                    >
                                        {addr.default && (
                                            <span className="absolute top-0 right-3 text-xs bg-green-50 text-green-600 font-semibold px-2 py-0.5 rounded-full border border-green-100">
                                                Default
                                            </span>
                                        )}

                                        <div className="flex items-start gap-3">

                                            <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition
                                                ${isSelected ? "border-blue-500" : "border-gray-300"}`}>
                                                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
                                            </div>

                                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg
                                                        ${addr.type === "Home" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-500"}`}>
                                                        {addr.type === "Home" ? <Home size={11} /> : <Briefcase size={11} />}
                                                        {addr.type}
                                                    </span>
                                                    <span className="font-semibold text-gray-800 text-sm">{addr.name}</span>
                                                    <span className="text-gray-400 text-xs">{addr.phone}</span>
                                                </div>

                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {addr.line1}, {addr.line2}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {addr.city}, {addr.state} — <span className="font-semibold text-gray-800">{addr.pincode}</span>
                                                </p>
                                            </div>

                                            <div className="flex gap-1 shrink-0">

                                                {/* ----------Update same form khule and delte address -- */}
                                                <button className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-blue-500 transition"
                                                >
                                                    <Pencil size={14} />
                                                </button>

                                                <button className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-red-500 transition"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {isSelected && (
                                            <div className="mt-3 ml-8 flex items-center gap-2 text-xs text-green-600 font-medium">
                                                <CheckCircle size={13} className="fill-green-100" />
                                                Delivering to this address · Estimated 3–5 days
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {!showForm ? (
                            <Button
                                onClick={() => setShowForm(true)}
                                className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl text-sm font-semibold text-gray-500 hover:text-blue-600 transition-all"
                            >
                                <Plus size={16} />
                                Add New Address
                            </Button>
                        ) : (
                            <div className="mt-4">
                                <AddressForm onClose={() => setShowForm(false)} onSave={handleSaveAddress} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="self-start w-full lg:w-96 xl:w-[380px]">
                    <div className="sticky top-24 flex flex-col gap-4">

                        {selectedAddress && (
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-start gap-3">
                                <MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">Delivering to</p>
                                    <p className="text-sm text-gray-700 font-medium mt-0.5">
                                        {selectedAddress.name} · {selectedAddress.line1}, {selectedAddress.city} — {selectedAddress.pincode}
                                    </p>
                                </div>
                            </div>
                        )}

                        <OrderSummary cartItems={cartItems} />
                        <Button
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-base transition active:scale-95 shadow-lg shadow-blue-100"
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