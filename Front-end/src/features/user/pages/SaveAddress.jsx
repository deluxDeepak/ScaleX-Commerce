// import { Briefcase, Home, MapPin, Plus } from 'lucide-react'
// import React, { useState } from 'react'
// import Button from '../../../components/ui/Button'
// import Input from '../../../components/ui/Input';
// // import { useAddress } from '../context/AdressContext';
// import ShowAddress from '../components/ShowAddress';

// // ── Type button config ────────────────────────────────────
// const TYPE_CONFIG = {
//   Home: { Icon: Home, activeColor: 'bg-blue-600 text-white border-blue-600 shadow-sm' },
//   Work: { Icon: Briefcase, activeColor: 'bg-violet-600 text-white border-violet-600 shadow-sm' },
//   Other: { Icon: MapPin, activeColor: 'bg-teal-600 text-white border-teal-600 shadow-sm' },
// }

// // ── Field config ─────────────────────────────────────────
// const FIELDS = [
//   { label: 'Full Name', name: 'name', placeholder: 'Rahul Sharma', span: false },
//   { label: 'Phone Number', name: 'phone', placeholder: '+91 98765 43210', span: false },
//   { label: 'Address Line 1', name: 'line1', placeholder: 'House / Flat / Block No.', span: true },
//   { label: 'Address Line 2', name: 'line2', placeholder: 'Area, Colony, Street', span: true },
//   { label: 'City', name: 'city', placeholder: 'Mumbai', span: false },
//   { label: 'State', name: 'state', placeholder: 'Maharashtra', span: false },
//   { label: 'Pincode', name: 'pincode', placeholder: '400053', span: false },
// ]

// const EMPTY_FORM = {
//   type: 'Home', name: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '',
// }

// // ── Section label ─────────────────────────────────────────
// const SectionLabel = ({ children }) => (
//   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
//     {children}
//   </p>
// )

// // ── EditAddress ───────────────────────────────────────────
// const EditAddress = () => {
//   const { setAddress } = useAddress()

//   const [form, setForm] = useState(EMPTY_FORM)

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleClick = () => {
//     setAddress((prev) => [...prev, form])  // save to context — original logic
//     setForm(EMPTY_FORM)
//   }

//   return (
//     <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-5">

//       {/* Type selector */}
//       <div>
//         <SectionLabel>Address type</SectionLabel>
//         <div className="flex flex-wrap gap-2">
//           {Object.entries(TYPE_CONFIG).map(([t, { Icon, activeColor }]) => (
//             <Button
//               key={t}
//               type="button"
//               onClick={() => setForm({ ...form, type: t })}
//               className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-semibold transition
//                 ${form.type === t
//                   ? activeColor
//                   : 'bg-white text-gray-500 border-gray-200 hover:border-blue-200 hover:text-blue-600'
//                 }`}
//             >
//               <Icon size={14} />
//               {t}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-gray-100" />

//       {/* Form fields */}
//       <div>
//         <SectionLabel>Delivery details</SectionLabel>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           {FIELDS.map(({ label, name, placeholder, span }) => (
//             <div key={name} className={span ? 'sm:col-span-2' : ''}>
//               <Input
//                 label={label}
//                 name={name}
//                 value={form[name]}
//                 onChange={handleChange}
//                 placeholder={placeholder}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
//                   text-gray-800 outline-none focus:border-blue-400 focus:ring-2
//                   focus:ring-blue-50 transition placeholder-gray-400 bg-gray-50
//                   hover:border-gray-300"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Save button */}
//       <Button
//         className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3
//           rounded-xl bg-gray-900 text-white text-sm font-semibold
//           hover:bg-gray-800 active:scale-[0.98] transition-all"
//         onClick={handleClick}
//       >
//         <Plus size={15} />
//         Save address
//       </Button>
//     </div>
//   )
// }

// // ── SaveAddress ───────────────────────────────────────────
// const SaveAddress = () => {
//   const { address } = useAddress()
//   const [showForm, setShowForm] = useState(false)

//   return (
//     <div className="flex flex-col gap-4">

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-base font-bold text-gray-900">Saved addresses</h2>
//           <p className="text-xs text-gray-400 mt-0.5">
//             {address?.length
//               ? `${address.length} address${address.length > 1 ? 'es' : ''} saved`
//               : 'No addresses yet'}
//           </p>
//         </div>
//       </div>

//       {/* Address list */}
//       {address && address.length !== 0 && (
//         <ShowAddress savedAddress={address} />
//       )}

//       {/* Toggle: show form OR add-new button — original logic */}
//       {showForm
//         ? (
//           <div className="flex flex-row gap-3">
//             <div className='flex flex-col w-1/2 '>
//               <EditAddress address={address} />
//               <button
//                 className="text-md text-blue-400 hover:text-gray-600 transition-colors self-start"
//                 onClick={() => setShowForm(false)}
//               >
//                 ← Cancel
//               </button>
//             </div>
//             <div>
//               select from live location
//               - fill live location details 
//             </div>
//           </div>
//         )
//         : (
//           <Button
//             className="flex items-center gap-3 p-4 rounded-2xl border border-dashed
//               border-gray-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all group w-full"
//             onClick={() => setShowForm((prev) => !prev)}
//           >
//             <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center
//               text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors">
//               <Plus size={18} />
//             </div>
//             <span className="text-sm text-gray-400 font-medium
//               group-hover:text-blue-600 transition-colors">
//               Add new address
//             </span>
//           </Button>
//         )
//       }
//     </div>
//   )
// }

// export default SaveAddress

import React from 'react'

const SaveAddress = () => {
  return (
    <div>SaveAddress</div>
  )
}

export default SaveAddress