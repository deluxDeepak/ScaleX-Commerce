import React from 'react'
import ShortProduct from '../components/ShortProduct'
import { products } from '../../product/data/products'
import Button from '../../../components/ui/Button'

const transitOrders = products.slice(0, 2)
const deliveredOrders = products.slice(2, 4)
const cancelledOrders = products.slice(4, 6)

const Order = () => (
  <div className="flex flex-col gap-5">

    {/* Header */}
    <div>
      <h2 className="text-base font-bold text-gray-900">My orders</h2>
      <p className="text-xs text-gray-400 mt-0.5">
        {transitOrders.length + deliveredOrders.length + cancelledOrders.length} items total
      </p>
    </div>

    {/* In transit */}
    <div className="bg-gray-50 rounded-2xl p-3 flex flex-col gap-2">
      <span className="text-xs font-semibold text-blue-600">In transit</span>
      {transitOrders.map((p) => <ShortProduct key={p.id} product={p} />)}
      <div className="flex gap-2 mt-1">
        <Button className="flex-1 text-xs py-2.5 rounded-xl bg-gray-900 text-white">Track order</Button>
        <Button className="flex-1 text-xs py-2.5 rounded-xl bg-white text-blue-600 border border-blue-200">View details</Button>
      </div>
    </div>

    {/* Delivered */}
    <div className="bg-gray-50 rounded-2xl p-3 flex flex-col gap-2">
      <span className="text-xs font-semibold text-green-700">Delivered</span>
      {deliveredOrders.map((p) => <ShortProduct key={p.id} product={p} />)}
      <div className="flex gap-2 mt-1">
        <Button className="flex-1 text-xs py-2.5 rounded-xl bg-gray-900 text-white">Buy again</Button>
        <Button className="flex-1 text-xs py-2.5 rounded-xl bg-white text-green-700 border border-green-200">View details</Button>
      </div>
    </div>

    {/* Cancelled */}
    <div className="bg-gray-50 rounded-2xl p-3 flex flex-col gap-2 opacity-75">
      <span className="text-xs font-semibold text-red-500">Cancelled</span>
      {cancelledOrders.map((p) => <ShortProduct key={p.id} product={p} />)}
      <div className="flex gap-2 mt-1">
        <Button className="flex-1 text-xs py-2.5 rounded-xl bg-gray-900 text-white">Buy again</Button>
        <Button className="flex-1 text-xs py-2.5 rounded-xl bg-white text-gray-400 border border-gray-200">View details</Button>
      </div>
    </div>

  </div>
)

export default Order