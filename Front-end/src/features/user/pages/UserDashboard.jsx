import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProfile } from '../hooks/user.hook'

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
  <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col gap-2 hover:border-blue-200 hover:shadow-md transition-all hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-gray-400">{label}</span>
      <span className="text-lg sm:text-xl">{icon}</span>
    </div>
    <p className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-none">{value}</p>
    <span className={`text-[10px] sm:text-[11px] font-semibold self-start px-2 py-0.5 rounded-lg
      ${up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'}`}>
      {change}
    </span>
  </div>
)

const WishCard = ({ emoji, name, sub, price }) => (
  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 border border-gray-100 rounded-lg sm:rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all hover:shadow-sm">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-lg sm:text-xl shrink-0">
      {emoji}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{name}</p>
      <p className="text-[10px] sm:text-xs text-gray-500">{sub}</p>
    </div>
    <span className="text-xs sm:text-sm font-bold text-blue-600 font-mono shrink-0">{price}</span>
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
    className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 border border-gray-100 rounded-lg sm:rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all w-full text-left group"
    to={link}
  >
    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base shrink-0 group-hover:scale-110 transition-transform"
      style={{ background: bg }}>
      {icon}
    </div>
    <span className="flex-1 text-xs sm:text-sm font-semibold text-gray-800">{label}</span>
    <span className="text-gray-400 text-base sm:text-lg group-hover:text-blue-500 transition-colors">›</span>
  </Link>
)

const QuickAction = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col gap-3 h-fit shadow-sm lg:sticky lg:top-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
        Quick Links
      </p>
      <div className="flex flex-col gap-1.5 sm:gap-2">
        {quickLinks.map(l => <QuickLink key={l.label} {...l} />)}
      </div>

      {/* Saved card */}
      <div className="mt-2 pt-3 sm:pt-4 border-t border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 sm:mb-3">
          Saved Card
        </p>
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 text-white flex flex-col gap-2 sm:gap-3 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-[9px] sm:text-[10px] font-semibold opacity-70 uppercase tracking-wider">HDFC Bank</span>
            <span className="font-bold font-mono text-xs sm:text-sm tracking-wider">VISA</span>
          </div>
          <p className="font-mono text-xs sm:text-sm font-medium tracking-widest">•••• •••• •••• 4821</p>
          <p className="text-[9px] sm:text-[10px] font-semibold opacity-70 tracking-wider uppercase">RAHUL KUMAR</p>
        </div>
      </div>
    </div>
  )
}

const EditProfile = () => {
  return (
    <div>
      {['Name'].map((inp) => (
        <div key={inp}>
          <input type="text" placeholder={inp} />
        </div>
      ))}
    </div>
  )
}

// ── MAIN COMPONENT ───────────────────────────────────────
const UserDashboard = () => {

  const { userProfile, } = useProfile();

  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit((prev) => !prev);

  }

  return (
    <div className="min-h-screen font-sans">
      <div className="mx-auto flex flex-col gap-3 sm:gap-4 lg:gap-5">

        {/* ── Profile Header ── */}
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-purple-50 border border-blue-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* Avatar If profile img persent then show imag otherwise show two letters */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600
              flex items-center justify-center text-white text-lg sm:text-xl font-bold tracking-tight select-none shadow-lg">
              <img src={userProfile?.profileImg ? userProfile?.profileImg : userProfile?.name.slice(0, 2)} alt="" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500
              rounded-full border-2 border-white shadow-sm" />
          </div>



          {/* Info  Membership details yehi show kar sakte hai */}
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">{userProfile?.name}</h2>
            <p className="text-xs sm:text-sm text-gray-600">{userProfile?.email}</p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-1 sm:mt-1.5">
              {['📍 Patna, Bihar', '🎯 Premium Member', '📅 Since Jan 2023'].map(m => (
                <span key={m} className="text-[10px] sm:text-[11px] font-semibold text-gray-500">{m}</span>
              ))}
            </div>
          </div>

          {/* Edit button */}
          <button
            className="shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl flex items-center gap-1.5 hover:shadow-lg hover:scale-105 transition-all"
            onClick={handleEdit}
          >
            ✏️ <span className="hidden sm:inline">Edit Profile</span><span className="sm:hidden">Edit</span>
          </button>
        </div>
        {showEdit && <EditProfile />}

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* ── Main Two-Column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3 sm:gap-4">

          {/* LEFT: Wishlist + Reviews */}
          <div className="flex flex-col gap-3 sm:gap-4">

            {/* Wishlist preview */}
            <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 sm:mb-3">
                Wishlist Preview
              </p>
              <div className="flex flex-col gap-2">
                {wishlistItems.map(item => <WishCard key={item.name} {...item} />)}
              </div>
              <Link to="/user/wishlist/product" className="mt-2 sm:mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all w-fit">
                View all 28 items →
              </Link>
            </div>

            {/* Recent reviews */}
            <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-sm">
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