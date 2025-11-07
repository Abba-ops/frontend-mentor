import OrderModal from "../components/OrderModal";
import { createContext, useReducer, useRef } from "react";
import productData from "../data.json";

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
});

function reducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const product = productData.find((item) => item.id === action.payload);
    const existing = state.find((item) => item.id === action.payload);
    if (existing) return state;
    return [...state, { ...product, quantity: 1, totalAmount: product.price }];
  }

  if (action.type === "REMOVE_ITEM") {
    return state.filter((item) => item.id !== action.payload);
  }

  if (action.type === "UPDATE_QUANTITY") {
    return state.map((item) => {
      if (item.id !== action.payload.productId) return item;

      const newQuantity =
        action.payload.action === "INCREASE"
          ? item.quantity + 1
          : Math.max(item.quantity - 1, 1);

      return {
        ...item,
        quantity: newQuantity,
        totalAmount: newQuantity * item.price,
      };
    });
  }
}

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);
  const dialog = useRef();

  const handleConfirmOrder = () => dialog.current.open();

  const addItem = (productId) => {
    dispatch({ type: "ADD_ITEM", payload: productId });
  };

  const removeItem = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId, action) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, action } });
  };

  const contextValue = {
    items: state,
    addItem,
    confirmOrder: handleConfirmOrder,
    updateQuantity,
    removeItem,
  };

  return (
    <CartContext.Provider value={contextValue}>
      <OrderModal ref={dialog} />
      {children}
    </CartContext.Provider>
  );
}
