import React from "react";
import { ACTIONS } from "../Actions";

const Product = ({ state, dispatch }) => {
  const { products, cart } = state;

  return (
    <>
      {products.map((product) => {
        return (
          <>
            <section className="h-[150px] w-[320px] border-black p-2 border-2 m-2">
              <div className="" key={product.product_id}>
                <h1>Name: {product.name}</h1>
                <p>
                  Stock: <span className="font-semibold">{product.stock}</span>
                </p>
                <h4>
                  ${" "}
                  <span className="font-semibold">{product.selling_price}</span>
                </h4>
              </div>
              {cart.some((p) => p.id === product.product_id) ? (
                <button
                  className="bg-red-400 w-full rounded-xl py-2 my-2 cursor-pointer"
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.REMOVE_FROM_CART,
                      payload: {
                        id: product.product_id,
                      },
                    })
                  }
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="bg-green-400 w-full rounded-xl py-2 my-2 cursor-pointer"
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.ADD_TO_CART,
                      payload: {
                        id: product.product_id,
                        title: product.name,
                        price: product.selling_price,
                      },
                    })
                  }
                >
                  Add to Cart
                </button>
              )}
            </section>
          </>
        );
      })}
    </>
  );
};

export default Product;
