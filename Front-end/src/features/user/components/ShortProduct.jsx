import React from 'react'

// showing only the product details short me w-full ke sath

const ShortProduct = ({ product }) => {
    const { title, price, description } = product

    return (
        <div style={{
            fontFamily: "'DM Sans', sans-serif",
            width: '100%',
        }}>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap" rel="stylesheet" />

            <div className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
        bg-white border border-gray-100 hover:border-gray-200
        hover:shadow-sm active:scale-[0.99] transition-all duration-150 group">

                {/* Image */}
                <div className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-gray-50">
                    <img
                        src={product.images[0]}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
                        {title}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5 leading-snug">
                        {description}
                    </p>
                    <span className="text-sm font-semibold text-gray-900">
                        ${price.toLocaleString()}
                    </span>
                </div>


            </div>
        </div>
    )
}

export default ShortProduct