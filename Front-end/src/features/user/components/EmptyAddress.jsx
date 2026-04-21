import React from 'react';
import { MapPinOff, Plus, ShieldCheck, Truck } from 'lucide-react';

const EmptyAddress = () => {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
            <div className="absolute -top-14 -right-10 h-40 w-40 rounded-full bg-blue-100/50 blur-2xl" />

            <div className="relative flex flex-col gap-5">
                <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <MapPinOff size={20} />
                    </div>

                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-blue-600">Address Book</p>
                        <h3 className="mt-1 text-lg font-extrabold text-gray-900 sm:text-xl">No saved addresses yet</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                            Add your delivery address to continue checkout faster next time.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                        <Truck size={15} className="text-blue-600" />
                        <span className="text-xs font-semibold text-gray-700">Faster checkout</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                        <ShieldCheck size={15} className="text-green-600" />
                        <span className="text-xs font-semibold text-gray-700">Securely stored</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyAddress;