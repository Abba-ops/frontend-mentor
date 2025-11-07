import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import productData from "../data.json";
import Product from "./Product";

export default function ProductList() {
  const { items } = useContext(CartContext);

  return (
    <section className="col-span-3 lg:col-span-2">
      <h1 className="text-rose-900 text-3xl font-bold mb-6">Desserts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productData.map((product) => {
          const itemInCart = items.find((i) => i.id === product.id);
          return (
            <Product
              {...product}
              quantity={itemInCart?.quantity || 0}
              isProductInCart={!!itemInCart}
              key={product.id}
            />
          );
        })}
      </div>
    </section>
  );
}
