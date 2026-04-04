import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Heart, ShoppingBag } from 'lucide-react'
import { products } from '../../product/data/products'
import ProductCard from '../../product/components/ProductCard'
import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'

// ── Empty state ───────────────────────────────────────────
const ShowEmpty = () => (
  <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 gap-3 sm:gap-4 text-center bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
      <Heart size={28} className="text-red-300" />
    </div>
    <div>
      <p className="text-base sm:text-lg font-bold text-gray-800 mb-1">Your wishlist is empty</p>
      <p className="text-xs sm:text-sm text-gray-500">Save items you love — they'll show up here.</p>
    </div>
    <Link
      className="mt-2 flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-blue-700
      text-white text-xs sm:text-sm font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
      to="/"
    >
      <ShoppingBag size={16} />
      Browse products
    </Link>
  </div>
)

// ── Wishlist page ─────────────────────────────────────────
const Wishlist = () => {
  const wishlistProduct = products.filter((p) => p.price <= 1000)
  const [showAll, setShowAll] = useState(false)
  const visibleProduct = showAll ? wishlistProduct : wishlistProduct.slice(0, 4)

  return (
    <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">

      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">My wishlist</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {wishlistProduct.length > 0
              ? `${wishlistProduct.length} item${wishlistProduct.length > 1 ? 's' : ''} saved`
              : 'No items saved yet'}
          </p>
        </div>
        {wishlistProduct.length > 0 && (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 px-3 py-1.5 rounded-full">
            <Heart size={13} className="fill-red-500" />
            <span className="hidden sm:inline">Wishlist</span>
          </span>
        )}
      </div>

      {/* Content */}
      {visibleProduct.length === 0
        ? <ShowEmpty />
        : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {/* ✅ Fixed: use visibleProduct instead of wishlistProduct */}
              {visibleProduct.map((p) => (
                <ProductCard key={p.id} products={p} />
              ))}
            </div>

            {/* ✅ Fixed: only show button if there are more than 4 items + toggle label */}
            {wishlistProduct.length > 4 && (
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="w-full flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                {showAll ? (
                  <>
                    Show less <ChevronUp size={18} />
                  </>
                ) : (
                  <>
                    View all {wishlistProduct.length} items
                    <ChevronDown size={18} />
                  </>
                )}
              </button>
            )}
          </>
        )
      }

    </div>
  )
}

export default Wishlist