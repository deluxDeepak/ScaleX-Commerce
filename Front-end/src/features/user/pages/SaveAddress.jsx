import React from 'react'
import SavedAdress from '../components/SavedAddress'
import { useAddress } from '../hooks/useAdress'

const ShowEmptyAddress = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-gray-50">
      <p className="text-gray-600 mb-2">You don’t have any saved addresses.</p>
      <button className="text-lg font-semibold">Add Address</button>
    </div>
  )
};

const ShowAddress = ({ userAddress }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-3">Your Saved Addresses</h2>

      <div className="flex flex-col gap-3">
        {userAddress.map((addr) => (
          <div
            key={addr._id}
            className="p-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition"
          >
            <p className="text-sm font-medium">{addr.fullName}</p>
            <p className="text-sm text-gray-600">{addr.addressLine}</p>
            <p className="text-xs text-gray-500">
              {addr.city}, {addr.state} - {addr.pincode}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
};

const SaveAddress = () => {
  const { userAddress } = useAddress();
  console.log("UserAddress is ", userAddress)

  if (!userAddress || userAddress.length === 0) {
    return <ShowEmptyAddress />
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <ShowAddress userAddress={userAddress} />
    </div>
  )
}

export default SaveAddress;