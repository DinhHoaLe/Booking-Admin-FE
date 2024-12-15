import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import HotelPage from "../HotelPage/HotelPage";
import FlightPage from "../FilghtPage/FlightPage";
import TourPage from "../TourPage/TourPage";

const AllProductPage = () => {
  const nameHeader = [
    { name: "Hotel", component: <HotelPage /> },
    { name: "Flight", component: <FlightPage /> },
    { name: "Tour", component: <TourPage /> },
  ];

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        tabBarStyle={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        items={nameHeader.map((item, i) => ({
          label: (
            <div style={{ flex: 1, width: "100px", textAlign: "center" }}>
              {item.name}
            </div>
          ),
          key: String(i + 1),
          children: item.component,
        }))}
      />
    </div>
  );
};

export default AllProductPage;
