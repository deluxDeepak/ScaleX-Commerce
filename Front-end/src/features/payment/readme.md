# Payment Flow

This feature now owns the checkout button and the Razorpay handoff.

## Flow

1. The user opens the checkout page from the cart.
2. The checkout page builds an order payload from the selected address and cart items.
3. The frontend creates an order with the backend `POST /api/order` endpoint.
4. The backend returns a Mongo order id.
5. The frontend sends that order id to `POST /api/payment/create-order`.
6. The backend creates the Razorpay order and stores a local payment record.
7. The frontend opens the Razorpay checkout modal.
8. After success, the frontend sends the Razorpay response to `POST /api/payment/verify-payment`.
9. The backend verifies the signature, marks the payment captured, and marks the order paid.
10. The checkout page clears the cart and can navigate to the orders page.

## Files

- `components/RazorpayButton.jsx` renders the checkout button and opens Razorpay.
- `api/payment.api.js` contains the HTTP calls.
- `service/payment.service.js` wraps API calls and loads the Razorpay script.

## Notes

- Set `VITE_RAZORPAY_KEY_ID` in the frontend environment.
- Backend routes are mounted under `/api/payment`.
- The payment amount is sent to Razorpay in paise, not rupees.
