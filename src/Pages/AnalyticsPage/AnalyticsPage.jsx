import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AnalyticsPage = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [token, setToken] = useState("");

  const month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <div className="font-bold">Doanh Thu Từng Tháng</div>
          {/* <Chart options={options1} series={series1} type="bar" height={500} /> */}
        </div>
        <div className="w-1/2">
          <div className="font-bold">Doanh Thu Từng Ngày</div>
          {/* <Chart options={options2} series={series2} type="bar" height={500} /> */}
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <div className="font-bold">Doanh Thu Của Từng Sản Phẩm</div>
          {/* <Chart options={options3} series={series3} type="bar" height={500} /> */}
        </div>
        <div className="w-1/2">
          <div className="font-bold">Số Lượng Bán Ra Của Sản Phẩm</div>
          {/* <Chart options={options4} series={series4} type="bar" height={500} /> */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AnalyticsPage;
