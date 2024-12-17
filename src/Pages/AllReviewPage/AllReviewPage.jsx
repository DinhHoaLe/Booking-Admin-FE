import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import RatingPage from "../RatingPage/RatingPage";
import ReviewPage from "../ReviewPage/ReviewPage";

const AllReviewPage = () => {
  const nameHeader = [
    { name: "Review", component: <ReviewPage /> },
    { name: "Rating", component: <RatingPage /> },
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
