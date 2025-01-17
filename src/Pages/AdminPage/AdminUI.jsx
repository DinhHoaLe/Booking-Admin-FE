import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import Header from "../Header/header";
import DashboardPage from "../DashBoardPage/DashBoardPage";
import AllBookingPage from "../AllBookingPage/AllBookingPage";
import AllAddPage from "../AllAddPage/AllAddPage";
import AllUserPage from "../AllUserPage/AllUserPage";
import UserAdminPage from "../UserAdminPage/UserAdminPage";
import ReviewPage from "../ReviewPage/ReviewPage";
import AllPromotionPage from "../PromotionPage/AllPromotionPage";
import AllProductPage from "../AllProductPage/AllProductPage";
import RoomPage from "../RoomPage/Roompage";
import HelpPage from "../HelpPage/HelpPage";
import DataPage from "../DataPage/DataPage";
import SettingPage from "../SettingPage/SettingPage";
import AllSupportPage from "../AllSupportPage/AllSupportPage";
import AnalyticsPage from "../AnalyticsPage/AnalyticsPage";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout, refreshAccessToken } from "../../Redux/Slide/infoUserSlice";
import MonthlyRevenue from "../AnalyticsPage/MonthlyRevenue";

const AdminUI = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = Cookies.get("accessToken");

  console.log(accessToken);
  const refreshToken = Cookies.get("refreshToken");

  console.log(refreshToken);
  useEffect(() => {
    if (refreshToken) {
      if (!accessToken) {
        dispatch(refreshAccessToken()).finally(() => setIsLoading(false));
      } else {
        setToken(true);
        setIsLoading(false);
      }
    } else {
      setToken(false);
      dispatch(logout());
      navigate("/");
      setIsLoading(false);
    }
  }, [dispatch, accessToken, refreshToken, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return token ? (
    <div className="h-screen flex w-full">
      <Sidebar />
      <div className="flex flex-col w-full overflow-auto">
        <Header />
        <div className="bg-[#F5F6FA] overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route
              path="/analytics/monthly-revenue"
              element={<MonthlyRevenue />}
            />
            <Route path="/daily-revenue" element={<AnalyticsPage />} />
            <Route
              path="/analytics/monthly-booking"
              element={<AnalyticsPage />}
            />
            <Route
              path="/analytics/product-revenue"
              element={<AnalyticsPage />}
            />
            <Route path="/booking" element={<AllBookingPage />} />
            <Route path="/add" element={<AllAddPage />} />
            <Route path="/user" element={<AllUserPage />} />
            <Route path="/admin" element={<UserAdminPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/promotion" element={<AllPromotionPage />} />
            <Route path="/product" element={<AllProductPage />} />
            <Route path="/product/rooms" element={<RoomPage />} />
            <Route path="/support" element={<AllSupportPage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/setting" element={<SettingPage />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <div>You do not have access. Please log in!</div>
  );
};

export default AdminUI;
