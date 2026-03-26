import { useContext } from "react";
import { CategoryContext } from "./CategoryContext";

export const useCategory = () => {
    return useContext(CategoryContext);
}