import { createContext, useEffect, useState } from "react";
import { addAddressService, deleteAddressService, getMyAddressService, setDefaultAddressService } from "../service/address.service";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [userAddress, setUserAddress] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [delteAddressError, setDeleteAddressError] = useState("");

    const fetchAddress = async () => {
        try {
            setError("");
            setLoading(true);
            const res = await getMyAddressService();
            setUserAddress(res.address || []);

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    }

    const addAddress = async (data) => {
        try {
            setLoading(true);
            await addAddressService(data);
            await fetchAddress();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteAddress = async (id) => {
        try {
            setLoading(true);
            setDeleteAddressError("");
            await deleteAddressService(id);

            // delete karne ke baad list instantly update karna hai 
            setUserAddress((prev) => prev.filter((addr) => addr._id !== id));

        } catch (error) {
            setDeleteAddressError(error.message);

        } finally {
            setLoading(false);
        }

    }


    const setDefaultAddress = async (id) => {
        await setDefaultAddressService(id);
        await fetchAddress();
    }

    useEffect(() => {
        fetchAddress();
    }, [])

    return (
        <AddressContext.Provider value={{
            userAddress,
            addAddress,

            setDefaultAddress,
            deleteAddress,
            delteAddressError,
            loading,
            error
        }}>
            {children}
        </AddressContext.Provider>
    )
}
export default AddressProvider;


