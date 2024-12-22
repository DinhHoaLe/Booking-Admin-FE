import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import Header from "../Header/header";
import DashboardPage from "../DashBoardPage/DashBoardPage";
import UserAdminPage from "../UserAdminPage/UserAdminPage";
import RatingPage from "../RatingPage/RatingPage";
import HelpPage from "../HelpPage/HelpPage";
import DataPage from "../DataPage/DataPage";
import SettingPage from "../SettingPage/SettingPage";
import AnalyticsPage from "../AnalyticsPage/AnalyticsPage";
import AllProductPage from "../AllProductPage/AllProductPage";
import AllAddPage from "../AllAddPage/AllAddPage";
import AllBookingPage from "../AllBookingPage/AllBookingPage";
import AllUserPage from "../AllUserPage/AllUserPage";
// import AllReviewPage from "../AllReviewPage/AllReviewPage";
import AllSupportPage from "../AllSupportPage/AllSupportPage";
import ReviewPage from "../ReviewPage/ReviewPage";
import AllPromotionPage from "../PromotionPage/AllPromotionPage";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AdminUI = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");
    console.log(refreshToken);
    if (!refreshToken || refreshToken.trim() === "") {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, []);

  const accessToken = Cookies.get("accessToken");
  console.log("Access Token:", accessToken);
  // useEffect(() => {
  //   if (accessToken) {
  //     console.log(jwtDecode(accessToken));
  //   }
  // }, []);

  if (isLoading) {
    return (
      <div>You do not have access before logging in! Please log in first!</div>
    );
  }

  return (
    <div className="h-screen flex w-full ">
      <Sidebar />
      <div className="flex flex-col w-full overflow-auto ">
        <Header />
        <div className=" bg-[#F5F6FA] overflow-auto">
          {/* <div className="h-screen m-3 "> */}
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/booking" element={<AllBookingPage />} />
            <Route path="/add" element={<AllAddPage />} />
            <Route path="/user" element={<AllUserPage />} />
            <Route path="/admin" element={<UserAdminPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/rating" element={<RatingPage />} />
            <Route path="/promotion" element={<AllPromotionPage />} />
            <Route path="/product" element={<AllProductPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/support" element={<AllSupportPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AdminUI;
