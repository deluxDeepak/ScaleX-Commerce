import React from 'react'

const BuyNowButton = ({
    children,
    className,
    ...props
}) => {
    return (
        <button
            type="button"
            className={`flex border-2 border-black items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-gray-100 to-gray-200 hover:cursor-pointer text-black font-medium shadow transition-all duration-200 w-full sm:w-auto text-base sm:text-lg justify-center ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default BuyNowButton