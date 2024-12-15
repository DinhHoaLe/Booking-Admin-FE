import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import Header from "../Header/header";
import DashboardPage from "../DashBoardPage/DashBoardPage";
import UserAdminPage from "../UserAdminPage/UserAdminPage";
import RatingPage from "../RatingPage/RatingPage";
import PromotionPage from "../PromotionPage/PromotionPage";
import HelpPage from "../HelpPage/HelpPage";
import DataPage from "../DataPage/DataPage";
import SettingPage from "../SettingPage/SettingPage";
import AnalyticsPage from "../AnalyticsPage/AnalyticsPage";
import AllProductPage from "../AllProductPage/AllProductPage";
import AllAddPage from "../AllAddPage/AllAddPage";
import AllBookingPage from "../AllBookingPage/AllBookingPage";
import AllUserPage from "../AllUserPage/AllUserPage";
import AllReviewPage from "../AllReviewPage/AllReviewPage";
import AllSupportPage from "../AllSupportPage/AllSupportPage";

const AdminUI = () => {
  return (
    <div className="h-screen flex w-full ">
      <Sidebar />
      <div className="flex flex-col w-full overflow-hidden ">
        <Header />
        <div className=" bg-[#F5F6FA] ">
          <div className="h-screen m-3 ">
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/booking" element={<AllBookingPage />} />
              <Route path="/add" element={<AllAddPage />} />
              <Route path="/user" element={<AllUserPage />} />
              <Route path="/admin" element={<UserAdminPage />} />
              <Route path="/review" element={<AllReviewPage />} />
              <Route path="/rating" element={<RatingPage />} />
              <Route path="/promotion" element={<PromotionPage />} />
              <Route path="/product" element={<AllProductPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/data" element={<DataPage />} />
              <Route path="/setting" element={<SettingPage />} />
              <Route path="/support" element={<AllSupportPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUI;
