import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function DashBoardPage() {
  const navigate = useNavigate();

  const orderTab = () => {
    navigate("/orders");
  };
  const customresTab = () => {
    navigate("/customers");
  };
  const productsTab = () => {
    navigate("/products");
  };
  const quotesTab = () => {
    navigate("/quotes");
  };
  const promotionTab = () => {
    navigate("/promotion");
  };
  const analyticsTab = () => {
    navigate("/analytics");
  };

  const calApi = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      console.log(response);
      const responseJSON = await response.json();
      return responseJSON;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    calApi();
  });

  return (
    <div className="p-6 bg-gray-50 flex-grow overflow-auto">
      <div className="grid grid-cols-3 gap-4">
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={analyticsTab}
        >
          <h3 className="text-lg font-semibold">Total Sales ($)</h3>
          <p className="text-2xl font-bold">test</p>
        </div>
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={customresTab}
        >
          <h3 className="text-lg font-semibold">Total Customers</h3>
          <p className="text-2xl font-bold">test</p>
        </div>
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={orderTab}
        >
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold">test</p>
        </div>
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={productsTab}
        >
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">test</p>
        </div>
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={quotesTab}
        >
          <h3 className="text-lg font-semibold">Total Quotes</h3>
          <p className="text-2xl font-bold">test</p>
        </div>
        <div
          className="col-span-1 bg-white p-4 rounded-md shadow-md flex flex-col cursor-pointer"
          onClick={promotionTab}
        >
          <h3 className="text-lg font-semibold">Total Promotion</h3>
          <p className="text-2xl font-bold">test</p>
        </div>
        <div
          className="col-span-3 bg-white p-4 rounded-md shadow-md cursor-pointer"
          onClick={analyticsTab}
        >
          <h3 className="text-lg font-semibold">Best Selling In Month</h3>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default DashBoardPage;
