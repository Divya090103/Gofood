import React, { createContext, useReducer, useEffect } from "react";
import Cartreducer from "./Cartreducer";

const CartContext = createContext();

const initialState = {
  cart: [],
  amount: 0,
  user_id:""
};

const Cartprovider = ({ children }) => {
  const [state, dispatch] = useReducer(Cartreducer, initialState);
  const addcart = (item) => {
    if (localStorage.getItem("authorize")) {
      //if item alredy present in our cart and the size is same then we just have to update a cart not add another element
      var found = false;
      for (let data of state.cart) {
        if (data.id === item.id && data.Size === item.Size) {
          console.log(data.id);
          console.log("data already present in cart");
          found = true;
          dispatch({
            type: "Update Cart",
            payload: { price: item.price, Quantity: item.Qty, item: item.id },
          });
        }
      }
      if (!found) dispatch({ type: "add to cart", payload: item });
    } else alert("Login First to Order");
  };

  //update on cart is a  asynchronous code which depend on the state of the cart
  useEffect(() => {
    console.log("Updated cart:", state.cart);
  }, [state.cart]);
  //remove item from cart
  const remove = (index) => {
    console.log("remove from cart", index);
    dispatch({ type: "delete item from cart", payload: index });
  };

  //previous orders
  const orderplaced = (product) => {
    dispatch({type:"clear cart"});
    //after order places empty the cart

  
  };


  return (
    <CartContext.Provider value={{ ...state, addcart, remove, orderplaced }}>
      {children}
    </CartContext.Provider>
  );
};
export default Cartprovider;
export { CartContext };
