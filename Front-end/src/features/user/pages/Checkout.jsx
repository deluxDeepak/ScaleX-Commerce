import React, { useState } from 'react'
import { MapPin, Plus, CheckCircle, Home, Briefcase, LocateFixed, Pencil, Trash2 } from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import OrderSummary from '../../store/components/OrderSummary'
import Button from '../../store/components/Button'
import { useAddress } from '../hooks/useAdress'
import SavedAdress from '../components/SavedAddress'
import AddAddressForm from '../components/AddAddressForm'

const Checkout = () => {
    const { cartItems } = useCart();
    const { userAddress, deleteAddress } = useAddress();
    
    const [selectedId, setSelectedId] = useState(null);
    const [showForm, setShowForm] = useState(false);


    const selectedAddress = userAddress.find((a) => a._id === selectedId);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">


            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">

                <div className="flex-1 flex flex-col gap-4 sm:gap-5 lg:gap-6">

                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div>
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-0.5">Step 1</p>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                                <MapPin size={18} className="text-blue-500 sm:block hidden" />
                                Delivery Address
                            </h2>
                        </div>
                    </div>

                    {/* // action + address show  */}
                    <SavedAdress userAddress={userAddress} selectedId={selectedId} setSelectedId={setSelectedId} deleteAddress={deleteAddress} />



                    {!showForm ? (
                        <Button
                            onClick={() => setShowForm(true)}
                            className="mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold text-gray-500 hover:text-blue-600 transition-all"
                        >
                            <Plus size={16} />
                            Add New Address
                        </Button>
                    ) : (
                        <div className="mt-3 sm:mt-4">
                            <AddAddressForm onClose={() => setShowForm(false)} />
                        </div>
                    )}

                </div>

                {/* Order summary (right side )======== */}
                <div className="self-start w-full lg:w-96 xl:w-[400px]">
                    <div className="sticky top-20 sm:top-24 flex flex-col gap-3 sm:gap-4">

                        {selectedAddress && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-start gap-2 sm:gap-3 shadow-sm">
                                <MapPin size={16} className="text-blue-600 mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">Delivering to</p>
                                    <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-0.5">
                                        {selectedAddress.name} · {selectedAddress.line1}, {selectedAddress.city} — {selectedAddress.pincode}
                                    </p>
                                </div>
                            </div>
                        )}

                        <OrderSummary cartItems={cartItems} />
                        <Button
                            className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl sm:rounded-2xl text-sm sm:text-base transition active:scale-95 shadow-lg"
                        >
                            Proceed to Payment
                        </Button>

                        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                            🔒 100% secure & encrypted checkout
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Checkout