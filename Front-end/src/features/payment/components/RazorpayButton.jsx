import React, { useEffect, useState } from "react";
import { handlePayement } from "../services/paymentService";
import { useNavigate } from "react-router-dom";

const RazorpayButton = () => {
  const [dataqr, setDataqr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const databc = async () => {
      const data = await handlePayement();
      console.log("Data in useEffect hook", data);
      setDataqr(data);   // ✔ whole object store karo
    };

    databc();
  }, []);

  const handleNavigate = () => {
    if (dataqr?.upiDeepLink) {
      window.location.href = dataqr.upiDeepLink;
    }
  };

  return (
    <div>
      {dataqr && (
        <>
          <img src={dataqr.qrImage} alt="Scan to proceed" />
          <button onClick={handleNavigate}>Pay here</button>
        </>
      )}
    </div>
  );
};

export default RazorpayButton;