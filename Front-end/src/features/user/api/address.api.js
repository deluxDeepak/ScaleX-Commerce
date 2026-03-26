import { api } from "../../../core/api/client";

// Adresses 
export const getMyAddressApi = async () => {
    return await api.get("/user/address");
}
export const addAddressApi = async (data) => {
    return await api.post("/user/address", data);
}
export const updateAddressApi = async (id, data) => {
    return await api.patch(`/user/address/${id}`, data);
}
export const deleteAddressApi = async (id, data) => {
    return await api.delete(`/user/address/${id}`, data);
}
export const setDefaultAddressApi = async (id) => {
    return await api.patch(`/user/address/${id}/default`);
}