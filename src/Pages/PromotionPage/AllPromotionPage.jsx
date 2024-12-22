import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

import AddPromotionPage from "./AddPromotionPage";
import PromotionPage from "./PromotionPage";

const AllPromotionPage = () => {
  const nameHeader = [
    { name: "List", component: <PromotionPage /> },
    { name: "Add", component: <AddPromotionPage /> },
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
          // width: "100%",
          position: "sticky", // Tabs sẽ dính khi cuộn
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

export default AllPromotionPage;
