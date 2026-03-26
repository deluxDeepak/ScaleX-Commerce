import React from "react";

const Input =
    (
        {
            type = "text",
            name,
            value,
            placeholder,
            onChange,
            onBlur,
            label,
            error,
            className = "",
            ...props
        },
        ref
    ) => {
        return (
            <div className="flex flex-col gap-1 w-full">

                {label && (
                    <label
                        htmlFor={name}
                        className="text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`
            w-full
            border
            rounded-md
            p-2
            outline-none
            focus:ring-2
            focus:ring-blue-400
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
                    {...props}
                />

                {error && (
                    <span className="text-xs text-red-500">
                        {error}
                    </span>
                )}

            </div>
        );
    }

Input.displayName = "Input";

export default Input;