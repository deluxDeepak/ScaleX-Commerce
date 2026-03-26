import React from 'react'

const Button = ({
    type = "button",
    children,
    className,
    ...props
}) => {
    return (
        <button
            type={type}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:cursor-pointer shadow transition-all duration-200 justify-center ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button