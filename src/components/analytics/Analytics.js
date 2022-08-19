import React, { useEffect, useReducer, useState } from "react";

import { Chart } from "react-google-charts";

const Analytics = ({ state, dispatch }) => {
  const [chartjsData, setChartjsData] = useState([]);

  const { orderRes, productRes, userRes } = state.analyticData;
  const chartdata = async () => {
    let cD = [["name", "id"]];
    await productRes.map(({ product_id, name }) => {
      let userData = [product_id, name];
      cD.push(userData);
      setChartjsData(cD);
      return cD;
    });
  };

  if (!productRes) {
    <h1 className="text-center font-bold text-2xl">Loading...</h1>;
  }
  useEffect(() => {
    chartdata();
  }, [productRes]);
  const options = {
    title: "Analytics",
  };

  return (
    <>
      <Chart
        chartType="Bar"
        data={chartjsData}
        options={options}
        width="100%"
        height="100vh"
      />
    </>
  );
};

export default Analytics;
