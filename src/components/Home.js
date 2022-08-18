import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Product from "./Product";

function Home() {
  const [data, setData] = useState([]);

  const url = "https://assessment.api.vweb.app/products";
  const fetchData = async () => {
    const response = await fetch(url);
    const resData = await response.json();
    setData(resData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-wrap w-4/5 text-center">
        {data.map(({ product_id, name, stock, sellin_price }) => {
          return (
            <Product
              product_id={product_id}
              name={name}
              stock={stock}
              sellin_price={sellin_price}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
