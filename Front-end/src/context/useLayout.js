import { useContext } from "react";
import { LayoutContext } from "./LayoutContext";

export const useLayout = () => useContext(LayoutContext);