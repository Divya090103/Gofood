
const Cartreducer = (state, action) => {
  if (action.type === "add to cart") {
    //return after add the payload
    return {
      ...state,
      cart: [...state.cart, action.payload],
      amount: state.amount + action.payload.price,
    };
  } else if (action.type === "delete item from cart") {
    //delete the element from cart at particular index
    let newarr = [...state.cart];
    const removeelem = newarr.splice(action.payload, 1)[0];
    return { ...state, cart: newarr, amount: state.amount - removeelem.price };
  } else if (action.type === "Update Cart") {
    return {
      ...state,
      cart: state.cart.map((item) =>
        item.id === action.payload.item
          ? {
              ...item,
              Qty: item.Qty + action.payload.Quantity,
              price: item.price + action.payload.price,
            }
          : item
      ),
      amount: state.amount + action.payload.price,
    };
  }  else if (action.type === "clear cart") {
  
    return {
      ...state,
      cart: [],
      amount: 0,
      
    };
  } else return state;
};
export default Cartreducer;
