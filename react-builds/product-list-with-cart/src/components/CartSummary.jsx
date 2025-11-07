import { CartContext } from "../store/cart-context";
import removeItemIcon from "../assets/images/icon-remove-item.svg";
import emptyCartIllustration from "../assets/images/illustration-empty-cart.svg";
import carbonNeutralBadge from "../assets/images/icon-carbon-neutral.svg";
import { useContext } from "react";

export default function CartSummary() {
  const { items, removeItem, confirmOrder } = useContext(CartContext);

  const totalAmount = items.reduce((sum, item) => sum + item.totalAmount, 0);

  return (
    <aside className="col-span-3 lg:col-span-1 bg-white sticky top-6 rounded-xl p-6">
      <h2 className="text-red text-2xl font-bold">
        Your Cart ({items.length})
      </h2>

      {items.length > 0 ? (
        <>
          <div className="mb-6 max-h-32 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center font-semibold border-b border-b-rose-100 py-3 text-xs">
                <div>
                  <h5 className="text-rose-900 mb-1.5">{item.name}</h5>
                  <div className="flex gap-4">
                    <span className="text-red">{item.quantity}x</span>
                    <span className="text-rose-300">
                      @${item.price.toFixed(2)}
                    </span>
                    <span className="text-rose-500">
                      ${item.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
                <img
                  alt="remove item"
                  className="border border-rose-300 rounded-full cursor-pointer w-5 h-5 p-1 hover:border-rose-900"
                  onClick={() => removeItem(item.id)}
                  src={removeItemIcon}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-6 text-rose-900">
            <p className="text-xs">Order Total</p>
            <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
          </div>

          <div className="bg-rose-50 rounded-lg inline-flex justify-center gap-1.5 py-3.5 mb-6 w-full text-sm text-rose-900">
            <img src={carbonNeutralBadge} alt="carbon neutral" />
            This is <strong>carbon-neutral</strong> delivery
          </div>

          <button
            onClick={confirmOrder}
            className="bg-red w-full cursor-pointer rounded-full py-3.5 text-rose-100 text-sm">
            Confirm Order
          </button>
        </>
      ) : (
        <div className="text-center mt-10">
          <img
            className="mx-auto mb-4"
            src={emptyCartIllustration}
            alt="empty cart image"
          />
          <p className="text-sm text-rose-500 font-semibold">
            Your added items will appear here
          </p>
        </div>
      )}
    </aside>
  );
}
