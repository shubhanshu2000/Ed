import React, { useEffect, useState } from "react";

import { Chart } from "react-google-charts";
import { ACTIONS } from "../Actions";
import Text from "./Text";

const Analytics = ({ state, dispatch }) => {
  const [data, setData] = useState([]);

  const { orderRes, productRes, userRes } = state.analyticData;

  const ProductSort = (arr = []) => {
    const priceSorter = (a, b) => {
      return a.selling_price - b.selling_price;
    };
    arr.sort(priceSorter);
    let priceSortedArr = [["selling price", "name"]];
    arr.map(({ selling_price, name }) => {
      priceSortedArr.push(["$" + selling_price, name]);
      return priceSortedArr;
    });
    dispatch({
      type: ACTIONS.PRODUCTS_SORTED_ACC_TO_PRICE,
      payload: priceSortedArr,
    });

    //Stock sorter
    let stockSortedArr = [["name of product", "stock"]];
    const stockSorter = (a, b) => {
      return a.stock - b.stock;
    };
    arr.sort(stockSorter);
    arr.map(({ name, stock }) => {
      stockSortedArr.push([name, stock]);
      return stockSortedArr;
    });
    dispatch({
      type: ACTIONS.PRODUCTS_SORTED_ACC_TO_STOCK,
      payload: stockSortedArr,
    });
  };

  const MostPurchasedProduct = (arr = []) => {};

  useEffect(() => {
    ProductSort(productRes);
  }, [state.analyticData]);

  return (
    <>
      <div className="flex mb-4 flex-col  w-full">
        <div>
          <Text txt={"Product sorted acording to price"} />
          {productRes ? (
            <Chart
              chartType="Bar"
              data={state.priceSorted}
              options={{
                title: "Product sorted according to price",
              }}
              width="100%"
              height="100vh"
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <div>
          <Text txt={"Products sorted according to price"} />
          {productRes ? (
            <Chart
              chartType="Bar"
              data={state.stockSorted}
              options={{
                title: "Stock of products ",
              }}
              width="100%"
              height="100vh"
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Analytics;
