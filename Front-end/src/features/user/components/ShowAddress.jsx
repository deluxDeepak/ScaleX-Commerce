import React from 'react'

// ── Icons ────────────────────────────────────────────────
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V10.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
)

const WorkIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
)

const OtherIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-current fill-none"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const iconMap = {
  Home: { Icon: HomeIcon, bg: 'bg-blue-50',   text: 'text-blue-600'   },
  Work: { Icon: WorkIcon, bg: 'bg-yellow-50', text: 'text-yellow-600' },
  Other:{ Icon: OtherIcon,bg: 'bg-purple-50', text: 'text-purple-600' },
}

// ── Address Card ─────────────────────────────────────────
const AddressCard = ({ address }) => {
  const { Icon, bg, text } = iconMap[address.type] || iconMap.Other

  return (
    <div className={`bg-white rounded-2xl p-4 flex gap-4 transition-all
      ${address.default
        ? 'border border-blue-400 shadow-sm'
        : 'border border-gray-100 hover:border-gray-300'}`}>

      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg} ${text}`}>
        <Icon />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-900">{address.type}</span>
          {address.default && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
              Default
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-0.5">{address.name}</p>
        <p className="text-sm text-gray-500 leading-relaxed">
          {address.line1}<br />
          {address.line2 && <>{address.line2}<br /></>}
          {address.city}, {address.state} – {address.pincode}
        </p>
        <p className="text-xs text-gray-400 mt-1.5">{address.phone}</p>
      </div>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────
const ShowAddress = ({ savedAddress }) => {

  return (
    <div className="flex flex-col gap-3">

      {savedAddress.map(address => (
        <AddressCard
          key={address.id}
          address={address}

        />
      ))}

    </div>
  )
}

export default ShowAddress