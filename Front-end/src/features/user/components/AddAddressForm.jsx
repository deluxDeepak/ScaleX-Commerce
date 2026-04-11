import { useState } from "react";
import { useAddress } from "../hooks/useAdress";
import { Briefcase, Home, LocateFixed } from "lucide-react";
import Button from "../../store/components/Button";
import ErrorMessage from "../../../components/ErrorMessage";


const AddAddressForm = ({ onClose }) => {
    const [form, setForm] = useState({
        type: "Home", name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: ""
    });

    const { addAddress, addAddressError } = useAddress();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form is ", form);

        const ok = await addAddress(form);
        if (ok) {
            onClose();
        }

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

            <ErrorMessage message={addAddressError} />

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

export default AddAddressForm;