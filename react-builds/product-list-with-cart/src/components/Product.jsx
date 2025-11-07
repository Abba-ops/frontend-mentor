import decrementIcon from "../assets/images/icon-decrement-quantity.svg";
import incrementIcon from "../assets/images/icon-increment-quantity.svg";
import addToCartIcon from "../assets/images/icon-add-to-cart.svg";
import { CartContext } from "../store/cart-context";
import { useContext } from "react";

export default function Product({
  image,
  name,
  category,
  price,
  id,
  quantity,
  isProductInCart,
}) {
  const { addItem, updateQuantity } = useContext(CartContext);

  return (
    <div>
      <div className="relative pb-9">
        <img
          alt={name}
          className={`rounded-lg object-cover ${
            isProductInCart ? "border-2 border-red" : ""
          }`}
          src={image.desktop}
        />
        <button
          onClick={!isProductInCart ? () => addItem(id) : undefined}
          className={`absolute left-1/2 -translate-x-1/2 bottom-5 rounded-full py-3 w-max inline-flex gap-1.5 text-sm font-semibold ${
            isProductInCart
              ? "bg-red text-rose-100 min-w-40 justify-between px-4 items-center"
              : "bg-white text-rose-900 border border-rose-500 px-7 cursor-pointer"
          }`}>
          {isProductInCart ? (
            <>
              <img
                src={decrementIcon}
                className="border border-rose-100 rounded-full cursor-pointer w-5 h-5 p-1"
                onClick={() => updateQuantity(id, "DECREASE")}
                alt="decrease quantity"
              />
              <span>{quantity}</span>
              <img
                src={incrementIcon}
                className="border border-rose-100 rounded-full cursor-pointer w-5 h-5 p-1"
                onClick={() => updateQuantity(id, "INCREASE")}
                alt="increase quantity"
              />
            </>
          ) : (
            <>
              <img src={addToCartIcon} alt="add to cart" />
              Add to Cart
            </>
          )}
        </button>
      </div>

      <p className="text-rose-400 text-sm">{category}</p>
      <h4 className="text-rose-900 font-semibold">{name}</h4>
      <p className="text-red font-semibold">${price.toFixed(2)}</p>
    </div>
  );
}
