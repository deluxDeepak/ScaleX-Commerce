import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Heart, ShoppingBag } from 'lucide-react'
import { products } from '../../product/data/products'
import ProductCard from '../../product/components/ProductCard'
import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'

// ── Empty state ───────────────────────────────────────────
const ShowEmpty = () => (
  <div className="flex flex-col items-center justify-center py-16 px-6 gap-4 text-center">
    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
      <Heart size={24} className="text-gray-300" />
    </div>
    <div>
      <p className="text-base font-semibold text-gray-800 mb-1">Your wishlist is empty</p>
      <p className="text-sm text-gray-400">Save items you love — they'll show up here.</p>
    </div>
    <Link
      className="mt-1 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900
      text-white text-sm font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all"
      to="/"
    >
      <ShoppingBag size={14} />
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
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900">My wishlist</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {wishlistProduct.length > 0
              ? `${wishlistProduct.length} item${wishlistProduct.length > 1 ? 's' : ''} saved`
              : 'No items saved yet'}
          </p>
        </div>
        {wishlistProduct.length > 0 && (
          <span className="flex items-center gap-1.5 text-xs font-medium text-red-400">
            <Heart size={13} className="fill-red-400" />
            Wishlist
          </span>
        )}
      </div>

      {/* Content */}
      {visibleProduct.length === 0
        ? <ShowEmpty />
        : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* ✅ Fixed: use visibleProduct instead of wishlistProduct */}
              {visibleProduct.map((p) => (
                <ProductCard key={p.id} products={p} />
              ))}
            </div>

            {/* ✅ Fixed: only show button if there are more than 4 items + toggle label */}
            {wishlistProduct.length > 4 && (
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 active:scale-[0.98] transition-all duration-150"
              >
                {showAll ? (
                  <>
                    Show less <ChevronUp />
                  </>
                ) : (
                  <>
                    View all {wishlistProduct.length} items
                    <ChevronDown />
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