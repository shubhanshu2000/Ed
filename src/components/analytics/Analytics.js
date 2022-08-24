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

  const handleSelectChange = (e) => {
    const { value } = e.target;
    dispatch({ type: ACTIONS.PPL_ID, payload: value });
  };

  let ppl = [];

  function getNewPPL(id) {
    let newPPLArr = [["Product", "Quantitiy"]];
    let ppLen = ppl.length;
    for (let i = 1; i < ppLen; i++) {
      if (ppl[i].user_id === Number(id)) {
        let pr = ppl[i].productName;
        let qn = ppl[i].quantity;
        let un = ppl[i].userName;
        newPPLArr.push([pr, qn]);
        dispatch({ type: ACTIONS.USER_NAME, payload: un });
      }
    }

    dispatch({
      type: ACTIONS.PRODUCTS_PURCHASED_BY_INDIVIDUAL_USER,
      payload: newPPLArr,
    });
  }

  const PurchasedProduct = (arr = []) => {
    let MostPurchasedProductArr = [["Name", "Quantity"]];
    let q = [];
    let n = [];
    arr.filter(({ product_id, quantity, user_id, order_date }) => {
      productRes.find((product) => {
        product.product_id === product_id &&
          q.push({ name: product.name, quantity }) &&
          n.push({ productName: product.name, quantity, user_id, order_date });
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

    n.filter(({ productName, user_id, order_date, quantity }) => {
      userRes.find((user) => {
        user.user_id === user_id &&
          ppl.push({
            userName: user.name,
            productName,
            quantity,
            order_date,
            user_id,
          });
        return user.user_id === user_id;
      });
      return user_id;
    });

    dispatch({ type: ACTIONS.PPL, payload: ppl });
  };

  useEffect(() => {
    ProductSort(productRes);
    PurchasedProduct(orderRes);
    getNewPPL(state.setPPLID);
  }, [state.analyticData, state.setPPLID]);

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

            <div>
              <div className="w-1/12 mx-auto mt-16 ">
                <select
                  onChange={handleSelectChange}
                  name="User Name"
                  id="user_name"
                >
                  {userRes.map(({ user_id, name }) => {
                    return (
                      <option key={user_id} value={user_id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Chart
                chartType="ColumnChart"
                data={state.productsPurchasedByIndividualUser}
                options={{
                  title: `Products purchased by ${state.UserName}`,
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
