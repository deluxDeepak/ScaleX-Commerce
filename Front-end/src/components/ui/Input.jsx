
import React from 'react'

const Input = ({
    label,
    type = "text",
    value,
    onChange = () => { },
    placeholder,
    name,
    className

}) => {
    return (
        <>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition placeholder-gray-400${className}`}
            />
        </>
    )
}

export default Input