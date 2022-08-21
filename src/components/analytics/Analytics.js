import React, { useEffect, useState } from "react";

import { Chart } from "react-google-charts";
import { ACTIONS } from "../Actions";

const Analytics = ({ state, dispatch }) => {
  const [data, setData] = useState([]);

  const { orderRes, productRes, userRes } = state.analyticData;

  const ProductSort = (arr = []) => {
    const priceSorter = (a, b) => {
      return a.selling_price - b.selling_price;
    };
    arr.sort(priceSorter);
    let priceSortedArr = [["selling price", "name"]];
    let stockSortedArr = [["stock", "name"]];
    arr.map(({ selling_price, name }) => {
      priceSortedArr.push([selling_price, name]);
      return priceSortedArr;
    });
    dispatch({
      type: ACTIONS.PRODUCTS_SORTED_ACC_TO_PRICE,
      payload: priceSortedArr,
    });

    const stockSorter = (a, b) => {
      return a.stock - b.stock;
    };
    arr.sort(stockSorter);
    arr.map(({ stock, name }) => {
      stockSortedArr.push([stock, name]);
      return stockSortedArr;
    });
    dispatch({
      type: ACTIONS.PRODUCTS_SORTED_ACC_TO_STOCK,
      payload: stockSortedArr,
    });
  };
  console.log(state.mappedData);
  useEffect(() => {
    ProductSort(productRes);
  }, [state.analyticData]);
  console.log(state.priceSorted);
  return (
    <>
      <div className="flex flex-col w-full">
        {productRes ? (
          <Chart
            chartType="Bar"
            data={state.priceSorted}
            options={{
              title: "Most purchased product",
            }}
            width="100%"
            height="100vh"
          />
        ) : (
          <div>Loading...</div>
        )}
        {productRes ? (
          <Chart
            chartType="Bar"
            data={state.stockSorted}
            options={{
              title: "Most purchased product",
            }}
            width="100%"
            height="100vh"
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Analytics;
