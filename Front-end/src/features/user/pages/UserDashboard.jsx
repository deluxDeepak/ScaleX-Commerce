import React from 'react'
import { Link } from 'react-router-dom'

// ── DATA ────────────────────────────────────────────────
const stats = [
  { label: 'Total Orders', value: '142', change: '+8 this month', up: true, icon: '📦' },
  { label: 'Wishlist Items', value: '28', change: '+3 this week', up: true, icon: '❤️' },
  { label: 'Reviews Given', value: '37', change: '+2 recently', up: true, icon: '⭐' },
  { label: 'Total Spent', value: '₹84k', change: '-₹2k vs last month', up: false, icon: '₹' },
]

const wishlistItems = [
  { emoji: '👟', name: 'Nike Air Max 270', sub: 'Size: 42 · Black', price: '₹8,499' },
  { emoji: '🎧', name: 'Sony WH-1000XM5', sub: 'Wireless Headphones', price: '₹24,990' },
  { emoji: '📱', name: 'iPhone 16 Cover', sub: 'Magsafe Compatible', price: '₹1,299' },
]

const reviews = [
  { product: 'Boat Airdopes 141', stars: 5, text: 'Amazing sound quality for the price. Battery lasts all day, very happy with the purchase!' },
  { product: 'Puma Running Tee', stars: 4, text: 'Good fabric and fitting. Slight color difference from the photos but otherwise great.' },
  { product: 'Prestige Kettle 1.5L', stars: 5, text: 'Fast delivery, works perfectly. Highly recommended for everyday use.' },
]

// Future links 
const quickLinks = [
  { icon: '🛒', label: 'My Cart', bg: '#fff0eb', link: "/user/cart/product" },
  { icon: '📍', label: 'Saved Addresses', bg: '#ecf5f0', link: "/user/saveAdress" },
  { icon: '💳', label: 'Transactions', bg: '#fdf8ec', link: "admin/support" },
  { icon: '🎧', label: 'Support', bg: '#f0f0fb' },
  { icon: '🔔', label: 'Notifications', bg: '#fdf0ec' },
]

// ── SUB-COMPONENTS ───────────────────────────────────────
const StatCard = ({ label, value, change, up, icon }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-2 hover:border-gray-300 transition-all hover:-translate-y-0.5">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{label}</span>
      <span className="text-base">{icon}</span>
    </div>
    <p className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{value}</p>
    <span className={`text-[11px] font-semibold self-start px-2 py-0.5 rounded-lg
      ${up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'}`}>
      {change}
    </span>
  </div>
)

const WishCard = ({ emoji, name, sub, price }) => (
  <div className="flex items-center gap-3 p-2.5 border border-gray-100 rounded-xl hover:border-gray-300 hover:bg-gray-200 transition-colors">
    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0">
      {emoji}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
    <span className="text-sm font-medium text-orange-600 font-mono shrink-0">{price}</span>
  </div>
)

const ReviewItem = ({ product, stars, text, isFirst }) => (
  <div className={`flex flex-col gap-1 py-3 ${!isFirst ? 'border-t border-gray-100' : ''}`}>
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-gray-900">{product}</span>
      <span className="text-xs tracking-wide">{'⭐'.repeat(stars)}</span>
    </div>
    <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
  </div>
)

const QuickLink = ({ icon, label, bg, link }) => (
  <Link
    className="flex items-center gap-3 px-3 py-2.5 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all w-full text-left"
    to={link}
  >
    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
      style={{ background: bg }}>
      {icon}
    </div>
    <span className="flex-1 text-sm font-semibold text-gray-800">{label}</span>
    <span className="text-gray-400 text-lg">›</span>
  </Link>
)

const QuickAction = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 h-fit">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
        Quick Links
      </p>
      <div className="flex flex-col gap-2">
        {quickLinks.map(l => <QuickLink key={l.label} {...l} />)}
      </div>

      {/* Saved card */}
      <div className="mt-2 pt-4 border-t border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
          Saved Card
        </p>
        <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-4 text-white flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-semibold opacity-60 uppercase tracking-wider">HDFC Bank</span>
            <span className="font-bold font-mono text-sm tracking-wider">VISA</span>
          </div>
          <p className="font-mono text-sm font-medium tracking-widest">•••• •••• •••• 4821</p>
          <p className="text-[10px] font-semibold opacity-60 tracking-wider uppercase">RAHUL KUMAR</p>
        </div>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ───────────────────────────────────────
const UserDashboard = () => {
  return (
    <div className="min-h-screen  font-sans">
      <div className=" mx-auto px-4  flex flex-col gap-5">

        {/* ── Profile Header ── */}
        <div className="bg-blue-100 border border-gray-100 rounded-2xl p-5 flex items-center gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-400
              flex items-center justify-center text-white text-xl font-bold tracking-tight select-none">
              RK
            </div>
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500
              rounded-full border-2 border-white" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900">Rahul Kumar</h2>
            <p className="text-sm text-gray-500">rahul.kumar@email.com</p>
            <div className="flex flex-wrap gap-3 mt-1.5">
              {['📍 Patna, Bihar', '🎯 Premium Member', '📅 Since Jan 2023'].map(m => (
                <span key={m} className="text-[11px] font-semibold text-gray-400">{m}</span>
              ))}
            </div>
          </div>

          {/* Edit button */}
          <button className="shrink-0 bg-gray-900 text-white text-sm font-semibold
            px-4 py-2 rounded-xl flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            ✏️ Edit Profile
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* ── Main Two-Column ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4">

          {/* LEFT: Wishlist + Reviews */}
          <div className="flex flex-col gap-4">

            {/* Wishlist preview */}
            <div className="bg-gray-100  border border-gray-100 rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                Wishlist Preview
              </p>
              <div className="flex flex-col gap-2 ">
                {wishlistItems.map(item => <WishCard key={item.name} {...item} />)}
              </div>
              <button className="mt-3 text-xs font-semibold text-orange-600 flex items-center gap-1 hover:gap-2 transition-all">
                View all 28 items →
              </button>
            </div>

            {/* Recent reviews */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                Recent Product Reviews
              </p>
              {reviews.map((r, i) => (
                <ReviewItem key={r.product} {...r} isFirst={i === 0} />
              ))}
            </div>
          </div>

          {/* RIGHT: Quick Links + Saved Card */}
          <QuickAction />


        </div>
      </div>
    </div>
  )
}

export default UserDashboard