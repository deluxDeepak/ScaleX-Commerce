import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import {
  addCartItemsService,
  clearCartItemsService,
  countCartItemsService,
  getCartItemsService,
  removeCartItemsService,
  totalCartItemsService,
  updateCartItemsService
} from '../features/user/service/cart.service';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);
  const [countCart, setCountCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("Products from the Cart are: ", cartItems);

  // ================= fetch items =================

  const fetchItems = useCallback(async () => {
    try {

      setLoading(true);
      setError("");

      const [cartres, totalres] = await Promise.all([
        getCartItemsService(),
        totalCartItemsService(),
      ]);

      setCartItems(cartres.cart.items);
      setTotalPrice(totalres.price);

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }

  }, []);


  // ================= count =================

  const cartCount = async () => {
    const res = await countCartItemsService();
    console.log("Cart count response is ", res);
    setCountCart(res.count);
  };


  // ================= add =================

  const addToCart = async (productId, data) => {

    await addCartItemsService(productId, data);

    await fetchItems();
    await cartCount();

  };


  // ================= remove =================

  const removeFromCart = async (id) => {

    await removeCartItemsService(id);

    await fetchItems();
    await cartCount();

  };


  // ================= increase =================

  const increaseQty = async (id, data) => {

    await updateCartItemsService(id, data);

    await fetchItems();
    await cartCount();

  };


  // ================= decrease =================

  const decreaseQty = async (id, data) => {

    await updateCartItemsService(id, data);

    await fetchItems();
    await cartCount();

  };


  // ================= clear =================

  const clearCart = async () => {

    await clearCartItemsService();

    await fetchItems();
    await cartCount();

  };


  // ================= total =================

  const totalPriceCart = async () => {

    const res = await totalCartItemsService();

    setTotalPrice(res.price);

  };


  // ================= useEffect =================

  useEffect(() => {

    fetchItems();
    cartCount();

  }, []);


  return (

    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        totalPrice,
        countCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPriceCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );

};


export const useCart = () => useContext(CartContext);