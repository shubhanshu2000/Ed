import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { ACTIONS } from "../Actions";
import Text from "./Text";

const Analytics = ({ state, dispatch }) => {
  const { orderRes, productRes, userRes } = state.analyticData;

  const ProductSort = (arr = []) => {
    const priceSorter = (a, b) => {
      return a.selling_price - b.selling_price;
    };
    arr.sort(priceSorter);
    let priceSortedArr = [["selling price", "name"]];
    arr.map(({ selling_price, name, product_id }) => {
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

  const PurchasedProduct = (arr = []) => {
    let MostPurchasedProductArr = [["Name", "Quantity"]];
    let ppl = [];

    let q = [];
    let n = [];

    arr.filter(({ product_id, quantity, user_id, order_date }) => {
      productRes.find((product) => {
        product.product_id === product_id &&
          q.push({ name: product.name, quantity }) &&
          n.push({ name: product.name, quantity, user_id, order_date });
        return product.product_id === product_id;
      });
      return product_id;
    });
    //Most purchased product acc to quantity
    q = q.reduce((obj, item) => {
      let find = obj.find((i) => i.name === item.name);
      let d = { ...item };
      find ? (find.quantity += item.quantity) : obj.push(d);
      return obj;
    }, []);

    q.sort((a, b) => a.quantity - b.quantity);
    q.map(({ name, quantity }) => {
      MostPurchasedProductArr.push([name, quantity]);
      return MostPurchasedProductArr;
    });
    dispatch({
      type: ACTIONS.MOST_PURCHASED_PRODUCT,
      payload: MostPurchasedProductArr,
    });
  };

  useEffect(() => {
    ProductSort(productRes);
    PurchasedProduct(orderRes);
  }, [state.analyticData]);

  return (
    <>
      <div className="flex mb-4 flex-col  w-full">
        {productRes ? (
          <>
            <div>
              <Text txt={"Product sorted acording to price"} />
              <Chart
                chartType="Bar"
                data={state.priceSorted}
                options={{
                  title: "Product sorted according to price",
                }}
                width="100%"
                height="100vh"
              />
            </div>
            <div>
              <Chart
                chartType="ComboChart"
                data={state.stockSorted}
                options={{
                  title: "Stock of products ",
                }}
                width="100%"
                height="100vh"
              />
            </div>
            <div>
              <Chart
                chartType="ColumnChart"
                data={state.mostPurchasedProduct}
                options={{
                  title: "Most purchased product",
                }}
                width="100%"
                height="100vh"
              />
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Analytics;
