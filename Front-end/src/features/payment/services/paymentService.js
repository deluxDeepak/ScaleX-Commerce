// HandlePayment here 

import axios from "axios"

export const handlePayement = async () => {
    const { data } = await axios.post("http://localhost:3000/create-order", { amount: 500 });
    console.log("data dekh lo ", data);

    return data;


}
