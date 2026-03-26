import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button"
import ProductCard from "../components/ProductCard";
import { products } from "../data/products"

const stats = [
  { label: 'Total Revenue', value: '$24,530', change: '+12.4%', up: true, icon: '₹' },
  { label: 'Orders Today', value: '38', change: '+5 today', up: true, icon: '📦' },
  { label: 'Active Listings', value: '124', change: '-2 this week', up: false, icon: '🏷️' },
  { label: 'Avg. Rating', value: '4.6', change: '+0.2', up: true, icon: '⭐' },
]

const recentProducts = products.filter((p) => p.section === "Trending");

const StatCard = ({ label, value, change, up, icon }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-2 hover:border-gray-200 transition-colors">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-base">{icon}</span>
    </div>
    <p className="text-3xl font-bold text-gray-900 tracking-tight m-0">{value}</p>
    <span className={`text-xs font-semibold self-start px-2 py-1 rounded-lg ${up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
      {change}
    </span>
  </div>
);

const QuickActionCard = ({ icon, label, description, onClick, accent }) => (
  <button
    onClick={onClick}
    className={`w-full text-left bg-white border border-gray-100 rounded-2xl p-4 flex items-start gap-3 hover:border-gray-200 hover:shadow-sm transition-all group`}
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${accent}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-800 m-0 group-hover:text-gray-900">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5 m-0">{description}</p>
    </div>
  </button>
);

const SellerDashboard = () => {
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/seller/addProduct");
  }

  const quickActions = [
    {
      icon: '➕',
      label: 'Add New Product',
      description: 'List a new item to your store',
      onClick: handlenavigate,
      accent: 'bg-gray-900 text-white',
    },
    {
      icon: '🚀',
      label: 'Run a Campaign',
      description: 'Boost visibility of your products',
      onClick: () => { },
      accent: 'bg-orange-50',
    },
    {
      icon: '🎧',
      label: 'Get Support',
      description: 'Talk to our seller support team',
      onClick: () => { },
      accent: 'bg-blue-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 tracking-tight m-0">
            Performance Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Last 30 days · Updated just now</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={handlenavigate}
            className="text-sm bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors font-medium"
          >
            + Add Product
          </Button>
          <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-500">
            R
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4">

        {/* Stats */}
        <section className="mb-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Overview</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </section>

        {/* Main Content */}
        <div className="flex gap-6 items-start">

          {/* Trending Products */}
          <section className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest m-0">
                  Trending Products
                </p>
                <p className="text-xs text-gray-400 mt-1 m-0">
                  {recentProducts.length} listings · sorted by popularity
                </p>
              </div>
              <Button className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
                View all
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              {recentProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  className="rounded-xl"
                />
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <aside className="w-64 shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Quick Actions
            </p>
            <div className="flex flex-col gap-3">
              {quickActions.map((action) => (
                <QuickActionCard key={action.label} {...action} />
              ))}
            </div>

            {/* Tip Banner */}
            <div className="mt-4 bg-gray-900 rounded-2xl p-4">
              <p className="text-xs font-semibold text-white m-0">💡 Seller Tip</p>
              <p className="text-xs text-gray-400 mt-1 m-0 leading-relaxed">
                Products with 3+ images get <span className="text-white font-semibold">40% more clicks</span> than single-image listings.
              </p>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;