import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import SupportPage from "../SupportPage/SupportPage";
import ChatSupportPage from "./ChatSupportPage";

const AllSupportPage = () => {
  const nameHeader = [
    { name: "Email", component: <SupportPage /> },
    { name: "Chat", component: <ChatSupportPage /> },
  ];

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        tabBarStyle={{
          position: "sticky",
          display: "flex",
          justifyContent: "space-between",
          top: 0,
          zIndex: 1000,
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
