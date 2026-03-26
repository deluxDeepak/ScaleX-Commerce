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
      border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow
      ${className}`}
    >

      {/* Image */}
      <div className="relative p-2 bg-gray-50 sm:w-48 sm:shrink-0">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-20  object-cover"
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col sm:flex-row justify-between flex-1 p-3 gap-3">

        {/* Left: category, title, order id */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-center bg-gray-200 px-2 py-0.5 rounded-md text-black uppercase tracking-wide w-fit">
            {product.subCategory}
          </p>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-snug">
            {product.title}
          </h3>
          <p className="text-xs text-gray-300 font-mono">
            #{product.id.toString().padStart(6, '0')}
          </p>
        </div>



        {/* Right: price + actions */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-2 sm:shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">${product.price}</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-300 line-through">${product.oldPrice}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button className="bg-gray-100 text-red-500 text-xs px-2 py-0.5">
              <Delete />
              Remove
            </Button>
            <Button className="bg-gray-100 text-red-500 text-xs px-2 py-0.5">
              <Edit />
              Edit
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductCard