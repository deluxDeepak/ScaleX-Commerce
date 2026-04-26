import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

// ===================== DATA =====================
const stats = [
  { label: "Total Revenue", value: "$24,530", change: "+12.4%", up: true, icon: "₹" },
  { label: "Orders Today", value: "38", change: "+5 today", up: true, icon: "📦" },
  { label: "Active Listings", value: "124", change: "-2 this week", up: false, icon: "🏷️" },
  { label: "Avg. Rating", value: "4.6", change: "+0.2", up: true, icon: "⭐" },
];

const recentProducts = products.filter((p) => p.section === "Trending");

// ===================== HEADER =====================
const SellerHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-400">
            Last 30 days
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            onClick={() => navigate("/seller/addProduct")}
            className="text-xs sm:text-sm bg-gray-900 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            + Add
          </Button>

          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
            R
          </div>
        </div>
      </div>
    </header>
  );
};

// ===================== STAT CARD =====================
const StatCard = ({ label, value, change, up, icon }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between min-h-[110px]">
    <div className="flex items-center justify-between">
      <span className="text-[10px] sm:text-xs text-gray-400 uppercase">
        {label}
      </span>
      <span>{icon}</span>
    </div>

    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{value}</h2>

    <span
      className={`text-[10px] sm:text-xs px-2 py-1 rounded-md w-fit ${
        up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
      }`}
    >
      {change}
    </span>
  </div>
);

// ===================== QUICK ACTION =====================
const QuickActionCard = ({ icon, label, description, onClick, accent }) => (
  <button
    onClick={onClick}
    className="w-full bg-white border border-gray-200 rounded-xl p-4 flex gap-3 hover:shadow-sm transition"
  >
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent}`}>
      {icon}
    </div>

    <div className="text-left">
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  </button>
);

// ===================== MAIN =====================
const SellerDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: "➕",
      label: "Add Product",
      description: "List a new item",
      onClick: () => navigate("/seller/addProduct"),
      accent: "bg-gray-900 text-white",
    },
    {
      icon: "🚀",
      label: "Campaign",
      description: "Boost sales",
      onClick: () => {},
      accent: "bg-orange-50",
    },
    {
      icon: "🎧",
      label: "Support",
      description: "Get help",
      onClick: () => {},
      accent: "bg-blue-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <SellerHeader />

      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6">

        {/* ================= STATS ================= */}
        <section className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase">
            Overview
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </section>

        {/* ================= LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PRODUCTS */}
          <section className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Trending Products
                </h3>
                <p className="text-xs text-gray-400">
                  {recentProducts.length} items
                </p>
              </div>

              <Button className="text-xs border px-3 py-1.5 rounded-md">
                View all
              </Button>
            </div>

            <div className="space-y-3">
              {recentProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className="space-y-4">

            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase">
                Quick Actions
              </h3>

              <div className="space-y-3">
                {quickActions.map((action) => (
                  <QuickActionCard key={action.label} {...action} />
                ))}
              </div>
            </div>

            {/* TIP */}
            <div className="bg-gray-900 rounded-xl p-4">
              <p className="text-xs text-white font-semibold">💡 Tip</p>
              <p className="text-xs text-gray-300 mt-1">
                Add 3+ images to increase clicks by{" "}
                <span className="text-white font-medium">40%</span>
              </p>
            </div>

          </aside>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;