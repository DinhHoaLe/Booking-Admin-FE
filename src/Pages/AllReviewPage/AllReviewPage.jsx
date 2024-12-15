import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import BookingHotelPage from "./BookingHotelPage";
import BookingTourPage from "./BookingTourPage";
import BookingFlightPage from "./BookingFlightPage";

const AllReviewPage = () => {
  const nameHeader = [
    { name: "Hotel", component: <BookingHotelPage /> },
    { name: "Flight", component: <BookingFlightPage /> },
    { name: "Tour", component: <BookingTourPage /> },
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

export default AllReviewPage;
