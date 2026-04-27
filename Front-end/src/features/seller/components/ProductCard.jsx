import React from 'react'
import Button from '../../../components/ui/Button'
import { Delete, Edit } from 'lucide-react'

const ProductCard = ({ product, className = "" }) => {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null

  return (
    <div
      className={`w-full flex flex-col sm:flex-row rounded-xl overflow-hidden
      border border-gray-100 bg-white shadow-sm hover:shadow-md transition
      ${className}`}
    >

      {/* Image */}
      <div className="relative w-full sm:w-40 bg-gray-50 flex items-center justify-center p-2">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-32 sm:h-28 object-cover rounded-md"
        />

        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 p-3 gap-3">

        {/* Top Section */}
        <div className="flex justify-between">
          <div className='flex flex-col gap-1'>
            <p className="text-[10px] bg-gray-200 px-2 py-0.5 rounded w-fit uppercase tracking-wide">
              {product.subCategory}
            </p>

            <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-snug line-clamp-2">
              {product.title}
            </h3>

            <p className="text-[10px] text-gray-400 font-mono">
              #{product?._id?.toString().padStart(6, '0')}
            </p>
          </div>

          {/*Number of stock :-  If stock is greater than 5 show in green and else show in red  */}
          <div className="flex flex-col lg:flex items-center gap-2">

            {/* Stock Count */}
            <span className="text:xs lg:text-md font-medium lg:font-semibold text-gray-700">
              Stock: {product.stock}
            </span>

            {/* Status Badge */}
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full
                  ${product.stock === 0
                  ? "bg-red-100 text-red-600"
                  : product.stock < 5
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
            >
              {product.stock === 0
                ? "Out of Stock"
                : product.stock < 5
                  ? "Low Stock"
                  : "In Stock"}
            </span>

          </div>


        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex items-center gap-1 bg-gray-100 text-red-500 text-xs px-3 py-1 rounded-md">
              <Delete size={14} />
              <span className="hidden sm:inline">Remove</span>
            </Button>

            <Button className="flex items-center gap-1 bg-gray-100 text-blue-500 text-xs px-3 py-1 rounded-md">
              <Edit size={14} />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ProductCard