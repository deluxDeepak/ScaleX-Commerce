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