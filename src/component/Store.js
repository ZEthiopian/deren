import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    customerInfo: localStorage.getItem("customerInfo")
      ? JSON.parse(localStorage.getItem("customerInfo"))
      : {},
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // localStorage.setItem('cartItems', JSON.stringify(cartItems));
      const cartItems = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "CLIENT_SIGNIN":
      return { ...state, clientInfo: action.payload };
    case "CUSTOMER_INFO":
      return {
        ...state,
        cart: {
          ...state.cart,
          customerInfo: action.payload,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
