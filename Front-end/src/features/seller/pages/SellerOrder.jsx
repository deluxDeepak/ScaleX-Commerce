import { CheckCircle, Info, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useSellerAction, useSellerOrder } from "../seller.hook"
import Pagination from "../../../components/Pagination";
const TABS = ["All", "Pending", "Processing", "Completed"];

const STATUS_MAP = {
  Pending: "pending",
  Processing: "processing",
  Completed: "completed",
};

const BADGE = {
  Pending: "bg-amber-50 text-amber-700",
  Processing: "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  All: "bg-gray-100 text-gray-700",
};

const toCurrency = (amount) => {
  if (typeof amount !== "number") return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const toDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const HeaderOrders = ({ active, onChange }) => (
  <div>
    <h2 className="text-base font-bold text-gray-900">Orders</h2>
    <p className="text-xs text-gray-400 mt-0.5">
      Manage and track your customer orders
    </p>

    <div className="flex gap-1.5 mt-4 bg-[#ebe9e5] rounded-2xl p-1">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 text-xs font-medium py-2 rounded-xl transition-all
          ${active === tab
              ? "bg-white text-gray-900 font-semibold shadow-sm"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

const ProductOrder = ({ order, status }) => {
  const Icon = ShoppingBag;
  const firstItem = order.items?.[0];

  const title = firstItem?.name || "Order Item";
  const qty = firstItem?.qty ?? 0;
  const total = toCurrency(order.totalPrice);
  const date = toDate(order.createdAt);

  const { cancelOrder, acceptOrder, message } = useSellerAction();

  return (
    <div className="bg-white border rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
      {/* Top */}
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-gray-400">{order._id}</p>
          <p className="text-sm font-semibold">{title}</p>
        </div>

        <span
          className={`text-[10px] px-2 py-1 rounded-full font-bold ${BADGE[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
          <Icon size={18} />
        </div>

        <div className="flex gap-4 text-sm">
          <span>Qty: {qty}</span>
          <span>Total: {total}</span>
          <span>{date}</span>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="text-xs p-2 rounded bg-gray-100">
          {message.text}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {status === "Pending" && (
          <button
            onClick={() => acceptOrder(order._id)}
            className="flex-1 flex items-center justify-center gap-1 py-2 bg-black text-white rounded-xl text-xs"
          >
            <CheckCircle size={14} />
            Confirm
          </button>
        )}

        <button className="flex-1 flex items-center justify-center gap-1 py-2 border rounded-xl text-xs">
          <Info size={14} />
          Details
        </button>

        {status !== "Completed" && status !== "All" && (
          <button
            onClick={() => cancelOrder(order._id)}
            className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-50 text-red-600 rounded-xl text-xs"
          >
            <X size={14} />
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

const SellerOrder = () => {
  const [activeTab, setActiveTab] = useState("All");




  // Selected page 
  const [selectedPage, setSelectedPage] = useState(1);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedPage(1);
  }



  const backendStatus = activeTab === "All" ? null : STATUS_MAP[activeTab];
  console.log("Backend status", backendStatus);

  const { sellerOrders, totalPage, loading, error, } =
    useSellerOrder(backendStatus, selectedPage);


  return (
    <div className="bg-[#f5f4f1] min-h-screen p-4 flex flex-col gap-4">
      <HeaderOrders active={activeTab} onChange={handleTabChange} />

      {/* Loading */}
      {loading && (
        <div className="text-center text-sm text-gray-400">
          Loading orders...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Orders if orders is greater than 10 then give the page option  */}
      {!loading && sellerOrders.map((order) => (
        <ProductOrder
          key={order._id}
          order={order}
          status={activeTab}
        />
      ))}

      {
        totalPage > 1 && (
          <Pagination
            totalPage={totalPage}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        )
      }

      {/* Empty */}
      {!loading && sellerOrders.length === 0 && (
        <div className="bg-white p-6 text-center rounded-2xl text-sm text-gray-500">
          📦 No orders found
        </div>
      )}
    </div>
  );
};

export default SellerOrder;