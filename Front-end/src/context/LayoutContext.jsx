import { createContext, useState } from "react";


export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [showFooter, setShowFooter] = useState(true)
    return (
        <LayoutContext.Provider value={{ showFooter, setShowFooter }}>
            {children}
        </LayoutContext.Provider>
    )
}