import { useContext } from "react";
import { AuthContext } from "./AuthContext";


// 1.Context hook hai ye (Context helper hai )
/*
    isme login nahi hota hai 
    isme state nahi hota hai 
*/
/*
2.Logic hook (ye context nahi hota ) - Service call karta hai 
    - login
    - register
    - logout
    - loading
    - error
    - service call
*/

export const useAuth = () => {
    return useContext(AuthContext);
};