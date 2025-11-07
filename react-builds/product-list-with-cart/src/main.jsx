import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartContextProvider } from "./store/cart-context.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </StrictMode>
);
