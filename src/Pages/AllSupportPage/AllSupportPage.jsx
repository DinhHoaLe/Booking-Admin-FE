import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import SupportPage from "../SupportPage/SupportPage";

const AllSupportPage = () => {
  const nameHeader = [
    { name: "Email", component: <SupportPage /> },
    { name: "Chat", component: <SupportPage /> },
    { name: "Call", component: <SupportPage /> },
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

export default AllSupportPage;
