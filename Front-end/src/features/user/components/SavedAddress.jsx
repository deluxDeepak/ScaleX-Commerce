import { CheckCircle, Home, Briefcase, Pencil, Trash2 } from 'lucide-react';
import EmptyAddress from './EmptyAddress';

const SavedAddress = ({
  userAddress,
  selectedId,
  setSelectedId,
  deleteAddress,
}) => {
  if (userAddress.length === 0) {
    return <EmptyAddress />;
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      {userAddress.map((addr) => {
        const isSelected = selectedId === addr._id;
        const isHome = addr.type === 'Home';

        return (
          <div
            key={addr._id}
            onClick={() => setSelectedId(addr._id)}
            className={`relative cursor-pointer rounded-xl border-2 bg-white p-3 transition-all duration-200 sm:rounded-2xl sm:p-4 lg:p-5 ${isSelected
                ? 'border-blue-500 shadow-lg shadow-blue-50'
                : 'border-gray-100 shadow-sm hover:border-blue-200'
              }`}
          >
            {addr.default && (
              <span className="absolute top-2 sm:top-3 right-2 sm:right-3 text-[10px] sm:text-xs bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full border border-green-200">
                Default
              </span>
            )}

            <div className="flex items-start gap-2 sm:gap-3">
              <div className={`mt-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition
                                                ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                {isSelected && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500" />}
              </div>

              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-lg ${isHome ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                    {isHome ? <Home size={10} /> : <Briefcase size={10} />}
                    {addr.type}
                  </span>

                  <span className="font-bold text-gray-800 text-xs sm:text-sm">{addr.fullName}</span>
                  <span className="text-gray-500 text-[10px] sm:text-xs">{addr.phone}</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {addr.line1}, {addr.line2}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  {addr.city}, {addr.state} — <span className="font-bold text-gray-800">{addr.pincode}</span>
                </p>
              </div>

              <div className="flex gap-1 shrink-0">
                <button
                  type="button"
                  aria-label="Edit address"
                  className="p-1 sm:p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-blue-500 transition"
                >
                  <Pencil size={13} />
                </button>

                <button
                  type="button"
                  aria-label="Delete address"
                  className="p-1 sm:p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-red-500 transition"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteAddress(addr._id);
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {isSelected && (
              <div className="mt-2 sm:mt-3 ml-6 sm:ml-8 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-green-600 font-semibold">
                <CheckCircle size={12} className="fill-green-100" />
                Delivering to this address · Estimated 3–5 days
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SavedAddress;