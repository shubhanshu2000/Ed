import React, { useReducer, useEffect } from "react";
import { ACTIONS } from "../Actions";
import Cart from "../Cart";
import { cartReducer } from "../reducers/cartReducer";

import Product from "./Product";

function Home() {
  const [state, dispatch] = useReducer(cartReducer, { products: [], cart: [] });

  const url = "https://assessment.api.vweb.app/products";
  const fetchData = async () => {
    const response = await fetch(url);
    const resData = await response.json();
    dispatch({ type: ACTIONS.ADD_PRODUCT, payload: resData });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex">
        <div
          style={{ width: state.cart.length > 0 ? "80%" : "100%" }}
          className="flex flex-wrap  text-center"
        >
          <Product state={state} dispatch={dispatch} />
        </div>
        {state.cart.length > 0 ? (
          <Cart state={state} dispatch={dispatch} />
        ) : null}
      </div>
    </>
  );
}

export default Home;
