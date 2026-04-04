import React from 'react'
import ShortProduct from '../components/ShortProduct'
import { products } from '../../product/data/products'
import Button from '../../../components/ui/Button'

const transitOrders = products.slice(0, 2)
const deliveredOrders = products.slice(2, 4)
const cancelledOrders = products.slice(4, 6)

const Order = () => (
  <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">

    {/* Header */}
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm">
      <h2 className="text-base sm:text-lg font-bold text-gray-900">My orders</h2>
      <p className="text-xs text-gray-500 mt-0.5">
        {transitOrders.length + deliveredOrders.length + cancelledOrders.length} items total
      </p>
    </div>

    {/* In transit */}
    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 border border-blue-100 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
        <span className="text-xs sm:text-sm font-bold text-blue-700">In transit</span>
      </div>
      {transitOrders.map((p) => <ShortProduct key={p.id} product={p} />)}
      <div className="flex gap-2 mt-1">
        <Button className="flex-1 text-xs sm:text-sm py-2.5 rounded-lg sm:rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-sm">Track order</Button>
        <Button className="flex-1 text-xs sm:text-sm py-2.5 rounded-lg sm:rounded-xl bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 font-semibold">View details</Button>
      </div>
    </div>

    {/* Delivered */}
    <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 border border-green-100 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-green-600">✓</span>
        <span className="text-xs sm:text-sm font-bold text-green-700">Delivered</span>
      </div>
      {deliveredOrders.map((p) => <ShortProduct key={p.id} product={p} />)}
      <div className="flex gap-2 mt-1">
        <Button className="flex-1 text-xs sm:text-sm py-2.5 rounded-lg sm:rounded-xl bg-green-600 text-white hover:bg-green-700 font-semibold shadow-sm">Buy again</Button>
        <Button className="flex-1 text-xs sm:text-sm py-2.5 rounded-lg sm:rounded-xl bg-white text-green-700 border border-green-200 hover:bg-green-50 font-semibold">View details</Button>
      </div>
    </div>

    {/* Cancelled */}
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 border border-gray-200 shadow-sm opacity-80">
      <div className="flex items-center gap-2">
        <span className="text-red-500">✕</span>
        <span className="text-xs sm:text-sm font-bold text-red-600">Cancelled</span>
      </div>
      {cancelledOrders.map((p) => <ShortProduct key={p.id} product={p} />)}
      <div className="flex gap-2 mt-1">
        <Button className="flex-1 text-xs sm:text-sm py-2.5 rounded-lg sm:rounded-xl bg-gray-700 text-white hover:bg-gray-800 font-semibold">Buy again</Button>
        <Button className="flex-1 text-xs sm:text-sm py-2.5 rounded-lg sm:rounded-xl bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 font-semibold">View details</Button>
      </div>
    </div>

  </div>
)

export default Order