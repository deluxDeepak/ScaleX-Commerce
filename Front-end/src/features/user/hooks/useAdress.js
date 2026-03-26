import { useContext } from "react";
import { AddressContext } from "../context/AdressContext";

export const useAddress = () => {
    return useContext(AddressContext)
}