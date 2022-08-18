import React, { useReducer, useEffect } from "react";
import Cart from "../Cart";
import { cartReducer } from "../reducers/cartReducer";

import Product from "./Product";

function Home() {
  const [state, dispatch] = useReducer(cartReducer, { products: [], cart: [] });

  const url = "https://assessment.api.vweb.app/products";
  const fetchData = async () => {
    const response = await fetch(url);
    const resData = await response.json();
    dispatch({ type: "ADD_PRODUCTS", payload: resData });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex">
        <div className="flex flex-wrap w-4/5 text-center">
          <Product state={state} dispatch={dispatch} />
        </div>
        <Cart state={state} dispatch={dispatch} />
      </div>
    </>
  );
}

export default Home;
