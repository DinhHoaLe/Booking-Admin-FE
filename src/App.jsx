import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./Pages/LogInPage/LogInPage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import AdminUI from "./Pages/AdminPage/AdminUI";
import Dashboard from "./Pages/DashBoardPage/DashBoardPage";
import UserAdminPage from "./Pages/UserAdminPage/UserAdminPage";
import ReviewPage from "./Pages/ReviewPage/ReviewPage";
import RatingPage from "./Pages/RatingPage/RatingPage";
import SettingPage from "./Pages/SettingPage/SettingPage";
import HelpPage from "./Pages/HelpPage/HelpPage";
import AnalyticsPage from "./Pages/AnalyticsPage/AnalyticsPage";
import DataPage from "./Pages/DataPage/DataPage";
import AllProductPage from "./Pages/AllProductPage/AllProductPage";
import AllAddPage from "./Pages/AllAddPage/AllAddPage";
import AllBookingPage from "./Pages/AllBookingPage/AllBookingPage";
import AllUserPage from "./Pages/AllUserPage/AllUserPage";
import AllSupportPage from "./Pages/AllSupportPage/AllSupportPage";
import VerifyEmailPage from "./Pages/VerifyEmailPage/VerifyEmailPage";
import DetailBookingHotelPage from "./Pages/AllBookingPage/DetailBookingHotelPage";
import DetailBookingTourPage from "./Pages/AllBookingPage/DetailBookingTourPage";
import DetailBookingFlightPage from "./Pages/AllBookingPage/DetailBookingFlightPage";
import AllPromotionPage from "./Pages/PromotionPage/AllPromotionPage";
// import RoomPage from "./Pages/RoomPage/Roompage";
import MonthlyRevenue from "./Pages/AnalyticsPage/MonthlyRevenue";
import RoomPage from "./Pages/RoomPage/RoomPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/detail-hotel-booking/:bookingId",
    element: <DetailBookingHotelPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/detail-tour-booking/:bookingId",
    element: <DetailBookingTourPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/detail-flight-booking/:bookingId",
    element: <DetailBookingFlightPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin-page",
    element: <AdminUI />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "product",
        element: <AllProductPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "rooms",
            element: <RoomPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "add",
        element: <AllAddPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "booking",
        element: <AllBookingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "user",
        element: <AllUserPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "admin",
        element: <UserAdminPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "review",
        element: <ReviewPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "rating",
        element: <RatingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "promotion",
        element: <AllPromotionPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "support",
        element: <AllSupportPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "monthly-revenue",
            element: <MonthlyRevenue />,
            errorElement: <ErrorPage />,
          },
          {
            path: "daily-revenue",
            element: <AnalyticsPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "monthly-booking",
            element: <AnalyticsPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "product-revenue",
            element: <AnalyticsPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "data",
        element: <DataPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
