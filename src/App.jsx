import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./Pages/LogInPage/LogInPage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import AdminUI from "./Pages/AdminPage/AdminUI";
import Dashboard from "./Pages/DashBoardPage/DashBoardPage";
import UserAdminPage from "./Pages/UserAdminPage/UserAdminPage";
import ReviewPage from "./Pages/ReviewPage/ReviewPage";
import RatingPage from "./Pages/RatingPage/RatingPage";
import PromotionPage from "./Pages/PromotionPage/PromotionPage";
import SettingPage from "./Pages/SettingPage/SettingPage";
import HelpPage from "./Pages/HelpPage/HelpPage";
import AnalyticsPage from "./Pages/AnalyticsPage/AnalyticsPage";
import DataPage from "./Pages/DataPage/DataPage";
import AllProductPage from "./Pages/AllProductPage/AllProductPage";
import AllAddPage from "./Pages/AllAddPage/AllAddPage";
import AllBookingPage from "./Pages/AllBookingPage/AllBookingPage";
import AllUserPage from "./Pages/AllUserPage/AllUserPage";
import AllSupportPage from "./Pages/AllSupportPage/AllSupportPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/forgot-password",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    children: [],
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
        element: <PromotionPage />,
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
      },
      {
        path: "data",
        element: <DataPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
