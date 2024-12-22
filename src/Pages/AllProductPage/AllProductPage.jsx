import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import HotelPage from "../HotelPage/HotelPage";
import FlightPage from "../FilghtPage/FlightPage";
import TourPage from "../TourPage/TourPage";
import RoomPage from "../RoomPage/Roompage";

const AllProductPage = () => {
  const nameHeader = [
    { name: "Hotel", component: <HotelPage /> },
    { name: "Room", component: <RoomPage /> },
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
          position: "sticky", // Tabs sẽ dính khi cuộn
          display: "flex",
          justifyContent: "space-between",
          // width: "100%",
          top: 0, // Cố định tabs ở đầu trang khi cuộn
          zIndex: 1000, // Đảm bảo Tabs hiển thị trên các phần tử khác
          backgroundColor: "#fff",
          border: "2px solid #f0f0f0",
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
