import {
    updateAddressApi,
    getMyAddressApi,
    addAddressApi,
    deleteAddressApi,
    setDefaultAddressApi,

} from "../api/address.api";

// Adresses ------------------------------------- 
export const getMyAddressService = async () => {
    const res = await getMyAddressApi();
    return res.data;
}
export const addAddressService = async (data) => {
    const res = await addAddressApi(data);
    return res.data;
}
export const updateAddressService = async (id, data) => {
    const res = await updateAddressApi(id, data);
    return res.data;
}
export const deleteAddressService = async (id) => {
    const res = await deleteAddressApi(id);
    return res.data;
}
export const setDefaultAddressService = async (addressId) => {
    const res = await setDefaultAddressApi(addressId);
    return res.data;
}