import React, { useState } from "react";
import {
  createCheckoutOrderService,
  createRazorpayOrderService,
  loadRazorpayCheckoutScript,
  verifyRazorpayPaymentService,
} from "../service/payment.service";

const getCartOrderItems = (cartItems = []) =>
  cartItems.map((item) => ({
    productId: item?.productId?._id || item?.productId,
    qty: item?.quantity || 0,
  }));

const RazorpayButton = ({
  cartItems = [],
  address,
  onSuccess,
  children = "Proceed to Payment",
  className = "",
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (loading) {
      return;
    }

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!address) {
      setError("Please select a delivery address.");
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey) {
      setError("Razorpay key is not configured.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Create order first 
      const checkoutOrder = await createCheckoutOrderService({
        items: getCartOrderItems(cartItems),
        address,
        paymentMethod: "ONLINE",
      });

      // Create razorpayorder 
      const razorpayOrder = await createRazorpayOrderService(checkoutOrder?.order?._id);
      console.log("Razorpay order is ", razorpayOrder);

      // Load the razorpay gateway 
      const scriptLoaded = await loadRazorpayCheckoutScript();

      if (!scriptLoaded) {
        throw new Error("Unable to load Razorpay checkout.");
      }

      // Razorpay gateway optons 
      const options = {
        key: razorpayKey,
        amount: razorpayOrder?.amount,
        currency: razorpayOrder?.currency || "INR",
        name: "E-commerce",
        description: `Order ${checkoutOrder?._id || "payment"}`,
        order_id: razorpayOrder?.id,
        prefill: {
          name: address?.name || "",
          email: address?.email || "",
          contact: address?.phone || address?.mobile || "",
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          escape: true,
          backdropclose: false,
          ondismiss: () => {
            setLoading(false);
            setError("Payment window closed before completion.");
          },
        },
        handler: async (response) => {
          try {
            console.log("Response of payment successfull", response);

            const verification = await verifyRazorpayPaymentService({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            setError("");

            if (onSuccess) {
              await onSuccess({
                order: checkoutOrder,
                razorpayOrder,
                verification,
              });
            }
          } catch (verificationError) {
            setError(verificationError.message || "Payment verification failed.");
          } finally {
            setLoading(false);
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (checkoutError) {
      setError(checkoutError.message || "Unable to start payment.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl sm:rounded-2xl text-sm sm:text-base transition active:scale-95 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        {loading ? "Preparing payment..." : children}
      </button>

      {error && <p className="text-xs text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default RazorpayButton;