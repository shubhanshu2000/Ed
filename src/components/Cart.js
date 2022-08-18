import { useEffect, useState } from "react";

const Cart = ({ state, dispatch }) => {
  const { cart } = state;
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const changeQty = (id, qty) =>
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id: id,
        qty: qty,
      },
    });

  return (
    <div className="flex flex-col m-2 bg-[#ececec] p-2 w-1/5">
      <b className="font-bold text-center text-4xl">Cart</b>
      <b className="text-center">Subtotal: $ {total}</b>
      <div className="flex flex-col w-full">
        {cart.length > 0 ? (
          cart.map((prod) => (
            <div
              key={prod.title}
              className="flex p-2 border-2 border-gray-400 m-1 justify-between"
            >
              <div className="flex gap-2">
                <div className="flex flex-col justify-evenly">
                  <span>{prod.title}</span>
                  <b>$ {prod.price}</b>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => changeQty(prod.id, prod.qty - 1)}>
                  -
                </button>
                <span>{prod.qty}</span>
                <button onClick={() => changeQty(prod.id, prod.qty + 1)}>
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <span className="p-5 text-center">Cart is empty</span>
        )}
      </div>
    </div>
  );
};

export default Cart;
