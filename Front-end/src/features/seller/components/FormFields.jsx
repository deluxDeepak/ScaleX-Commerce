import React from 'react'

const FormFields = () => {
    return (
        <div>
            <SectionLabel>Delivery details</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FIELDS.map(({ label, name, placeholder, span }) => (
                    <div key={name} className={span ? 'sm:col-span-2' : ''}>
                        <Input
                            label={label}
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                  text-gray-800 outline-none focus:border-blue-400 focus:ring-2
                  focus:ring-blue-50 transition placeholder-gray-400 bg-gray-50
                  hover:border-gray-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FormFields