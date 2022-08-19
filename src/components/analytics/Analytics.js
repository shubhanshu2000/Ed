import React, { useState } from "react";
import { useEffect } from "react";
import { Chart } from "react-google-charts";

const Analytics = ({ data }) => {
  const [chartjsData, setChartjsData] = useState([]);
  const { productRes, userRes, orderRes } = data;
  const chartdata = () => {
    let cD = [["name", "id"]];
    productRes?.map(({ product_id, name }) => {
      let userData = [product_id, name];
      cD.push(userData);
      setChartjsData(cD);
      return cD;
    });
  };
  console.log(chartjsData);
  useEffect(() => {
    chartdata();
  }, []);
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
