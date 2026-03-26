import { createContext, useContext, useEffect, useState } from "react";
import { addAddressService, deleteAddressService,  getMyAddressService, setDefaultAddressService } from "../service/address.service";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [userAddress, setUserAddress] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
        await addAddressService(data);
        await fetchAddress()
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
            loading,
            error
        }}>
            {children}
        </AddressContext.Provider>
    )
}
export default AddressProvider;


