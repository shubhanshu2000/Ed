import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Analytics from "./Analytics";

const FetchAnalytics = () => {
  const [data, setData] = useState([]);
  const productUrl = "https://assessment.api.vweb.app/products";
  const orderUrl = "https://assessment.api.vweb.app/orders";
  const userUrl = "https://assessment.api.vweb.app/users";

  const fetchData = async () => {
    const fetchProduct = await fetch(productUrl);
    const productRes = await fetchProduct.json();
    const fetchOrder = await fetch(orderUrl);
    const orderRes = await fetchOrder.json();
    const fetchUser = await fetch(userUrl);
    const userRes = await fetchUser.json();
    const resData = { productRes, orderRes, userRes };
    setData(resData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <Analytics data={data} />
      </div>
    </>
  );
};

export default FetchAnalytics;
