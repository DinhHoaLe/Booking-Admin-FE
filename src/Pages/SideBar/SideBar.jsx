import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import Logo from "../../img/Logo.png";
import Cookies from "js-cookie";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  BarChartOutlined,
  UserOutlined,
  GiftOutlined,
  CloudOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  LikeOutlined,
  ProductOutlined,
  FileAddOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";

const items = [
  {
    key: "/admin-page/dashboard",
    icon: <DashboardOutlined />,
    label: "DASHBOARD",
  },
  {
    key: "/admin-page/analytics",
    icon: <BarChartOutlined />,
    label: "ANALYTICS",
  },
  { key: "/admin-page/user", icon: <UserOutlined />, label: "USER" },
  { key: "/admin-page/product", label: "PRODUCT", icon: <ProductOutlined /> },
  { key: "/admin-page/add", label: "ADD", icon: <FileAddOutlined /> },
  { key: "/admin-page/booking", label: "BOOKING", icon: <CalendarOutlined /> },
  { key: "/admin-page/review", label: "REVIEW", icon: <LikeOutlined /> },
  {
    key: "/admin-page/support",
    label: "SUPPORT",
    icon: <CustomerServiceOutlined />,
  },
  { key: "/admin-page/promotion", icon: <GiftOutlined />, label: "PROMOTION" },
  { key: "/admin-page/data", icon: <CloudOutlined />, label: "DATA" },
  { key: "/admin-page/setting", icon: <SettingOutlined />, label: "SETTING" },
  { key: "/admin-page/help", icon: <QuestionCircleOutlined />, label: "HELP" },
  { key: "divider", type: "divider" },
  {
    key: "/logout",
    icon: <LogoutOutlined />,
    label: <span style={{ cursor: "pointer", color: "red" }}>LOG OUT</span>,
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640);
  };

  const logout = () => {
    console.log("Logout function called");
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
    navigate("/");
  };

  const handleMenuClick = ({ key }) => {
    if (key === "/logout") {
      logout();
    } else {
      navigate(key);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    setCollapsed(isMobile); // Auto-collapse menu on mobile
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <nav className="text-white p-4 space-y-2 sm:w-auto">
      <div className="flex justify-center">
        {!isMobile ? (
          <img
            src={Logo}
            alt="Logo"
            className="h-13 object-cover cursor-pointer"
            onClick={() => navigate("/admin-page")}
          />
        ) : (
          <div className="block sm:hidden  w-full sm:w-auto cursor-pointer">
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{
                marginBottom: 16,
                backgroundColor: "#F5F6FA",
                width : "71px"
              }}
            >
              {collapsed ? (
                <MenuUnfoldOutlined style={{ backgroundColor: "black" }} />
              ) : (
                <MenuFoldOutlined style={{ backgroundColor: "black" }} />
              )}
            </Button>
          </div>
        )}
      </div>
      <div className="border-b-2 border-white mb-2"></div>
      <Menu
        mode="inline"
        theme="light"
        style={{ fontWeight: "bold", marginRight: "20px" }}
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
      />
    </nav>
  );
}

export default Sidebar;
