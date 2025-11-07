import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { CartContext } from "../store/cart-context";
import orderConfirmedIcon from "../assets/images/icon-order-confirmed.svg";
import { createPortal } from "react-dom";

export default forwardRef(function OrderModal(props, ref) {
  const { items } = useContext(CartContext);

  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  return createPortal(
    <dialog
      ref={dialog}
      className="fixed bottom-0 left-0 w-full max-w-full bg-white p-7 rounded-t-lg z-50 backdrop:bg-black/50 md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[28rem] md:rounded-lg">
      <img
        src={orderConfirmedIcon}
        alt="order confirmed icon"
        className="mb-4 md:w-9"
      />
      <h2 className="text-rose-900 text-3xl font-bold mb-1">Order Confirmed</h2>
      <p className="text-xs text-rose-400 mb-6">We hope you enjoy your food!</p>
      <div className="bg-rose-50 p-4 rounded-md mb-7">
        <div className="max-h-32 overflow-y-auto mb-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border-b border-b-rose-100 font-semibold py-2 text-xs flex items-center gap-2.5 first-of-type:pt-0">
              <img
                src={item.image.desktop}
                className="w-9 h-9 object-cover rounded"
                alt={item.name}
              />
              <div>
                <h5 className="text-rose-900 mb-1.5">{item.name}</h5>
                <div className="flex gap-3">
                  <span className="text-red">{item.quantity}x</span>
                  <span className="text-rose-400">
                    @${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <p className="ml-auto text-rose-900">
                ${item.totalAmount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-rose-900">
          <p className="text-xs">Order Total</p>
          <p className="text-xl font-bold">$46.50</p>
        </div>
      </div>

      <button
        onClick={() => dialog.current.close()}
        className="bg-red w-full cursor-pointer rounded-full py-3 text-rose-100 text-sm">
        Start New Order
      </button>
    </dialog>,
    document.getElementById("root")
  );
});
