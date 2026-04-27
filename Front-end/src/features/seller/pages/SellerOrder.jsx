import { CheckCircle, Info, X, Package, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useSellerAction, useSellerOrder } from '../seller.hook'

const TABS = ['Pending', 'Processing', 'Completed']

const BADGE = {
  Pending: 'bg-amber-50   text-amber-700',
  Processing: 'bg-blue-50    text-blue-700',
  Completed: 'bg-green-50   text-green-700',
}

// Map the status 
const STATUS_MAP = {
  Pending: ['pending'],
  Processing: ['accepted', 'paid', 'shipped', 'processing'],
  Completed: ['delivered', 'completed', 'cancelled'],
}


// Convert into inc currency 
const toCurrency = (amount) => {
  if (typeof amount !== 'number') return amount || '-'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Convert into date 
const toDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
}

const HeaderOrders = ({ active, onChange }) => (
  <div>
    <h2 className="text-base font-bold text-gray-900">Orders</h2>
    <p className="text-xs text-gray-400 mt-0.5">Manage and track your customer orders</p>

    <div className="flex gap-1.5 mt-4 bg-[#ebe9e5] rounded-2xl p-1">
      {TABS.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 text-xs font-medium py-2 rounded-xl transition-all
            ${active === tab
              ? 'bg-white text-gray-900 font-semibold shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
)

const ProductOrder = ({ order, status }) => {
  const Icon = order.icon || ShoppingBag
  const firstItem = order.items?.[0]
  const title = firstItem?.name || order.name || 'Order Item'
  const qty = firstItem?.qty ?? order.qty ?? 0
  const total = toCurrency(order.totalPrice ?? order.total)
  const date = toDate(order.createdAt ?? order.date)


  const {
    cancelOrder,
    message,
    acceptOrder
  } = useSellerAction();


  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">

      {/* Top row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] text-gray-300 mb-0.5">{order._id}</p>
          <p className="text-sm font-semibold text-gray-900">{title}</p>
        </div>

        <span className={`text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full ${BADGE[status]}`}>
          {status}
        </span>
      </div>

      {/* Meta data row */}
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-100 flex items-center justify-center flex-shrink-0">
          <Icon size={18} className="text-gray-400" />
        </div>

        <div className="flex gap-4">
          {[['Qty', qty], ['Total', total], ['Date', date]].map(([label, val]) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">{label}</span>
              <span className="text-sm font-medium text-gray-700">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">

        {/* Message */}
        {message && (
          <div
            className={`text-[11px] px-3 py-2 rounded-lg border ${message.type === "success"
              ? "bg-green-50 border-green-100 text-green-700"
              : "bg-red-50 border-red-100 text-red-700"
              }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex gap-2">

          {status === 'Pending' && (
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 active:scale-[0.97] transition-all"
              onClick={() => acceptOrder(order._id)}
            >
              <CheckCircle size={13} />
              Confirm
            </button>
          )}

          {/* Show details about order  */}
          <button className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl
          bg-[#f5f4f1] border border-gray-200 text-gray-600 text-xs font-semibold
          hover:bg-[#eceae6] active:scale-[0.97] transition-all
          ${status === 'Pending' ? 'flex-1' : 'flex-[2]'}`}>
            <Info size={13} />
            {status === 'Completed' ? 'View Details' : 'Details'}
          </button>

          {status !== 'Completed' && (
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold hover:bg-red-100 active:scale-[0.97] transition-all"

              onClick={() => cancelOrder(order._id)}
            >
              <X size={13} />
              Cancel
            </button>
          )}

        </div>

      </div>
    </div>
  )
}

const SellerOrder = () => {
  const [activeTab, setActiveTab] = useState('Pending');
  const { sellerOrders } = useSellerOrder();

  const normalizedOrders = Array.isArray(sellerOrders)
    ? sellerOrders.filter((order) => {
      const backendStatus = String(order?.status || '').toLowerCase()
      return STATUS_MAP[activeTab].includes(backendStatus)
    })
    : []

  return (
    <div className="bg-[#f5f4f1] min-h-screen">
      <div className="flex flex-col gap-4 p-4">
        <HeaderOrders active={activeTab} onChange={setActiveTab} />
        {normalizedOrders.map(order => (
          <ProductOrder key={order._id || order.id} order={order} status={activeTab} />
        ))}
        {normalizedOrders.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center text-sm text-gray-500">
            No orders in {activeTab.toLowerCase()} state.
          </div>
        )}
      </div>
    </div>
  )
}

export default SellerOrder