import { MapPin, BadgeCheck, XCircle } from "lucide-react";

const UserProfile = ({ user }) => {
    return (
        <div className="flex flex-col items-center bg-white  p-6 w-full">

            {/* Avatar */}
            <div className="relative mb-3">
                <img
                    src={user.image}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow"
                />
                {user.isverified && (
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow">
                        <BadgeCheck size={18} className="text-blue-500" fill="#3b82f6" color="white" />
                    </div>
                )}
            </div>

            {/* Name */}
            <h3 className="text-gray-800 font-bold text-lg leading-tight">{user.name}</h3>

            {/* Location */}
            <div className="flex items-center gap-1 mt-1 text-gray-400 text-sm">
                <MapPin size={13} />
                <span>{user.location}</span>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-gray-100 my-4" />

            {/* Verified Status */}
            {user.isverified ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    <BadgeCheck size={13} /> Verified Account
                </span>
            ) : (
                <span className="flex items-center gap-1.5 text-xs font-medium text-red-400 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    <XCircle size={13} /> Not Verified
                </span>
            )}

        </div>
    );
};

export default UserProfile;