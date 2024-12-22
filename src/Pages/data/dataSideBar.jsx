import {
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
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UseMenuItems = () => {
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logout function called");
    // Xóa accessToken và refreshToken từ cookies
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });

    // Chuyển hướng về trang chủ
    navigate("/");
  };

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
    {
      key: "/admin-page/user",
      icon: <UserOutlined />,
      label: "USER",
    },
    {
      key: "/admin-page/product",
      label: "PRODUCT",
      icon: <ProductOutlined />,
    },
    {
      key: "/admin-page/add",
      label: "ADD",
      icon: <FileAddOutlined />,
    },
    {
      key: "/admin-page/booking",
      label: "BOOKING",
      icon: <CalendarOutlined />,
    },
    {
      key: "/admin-page/review",
      label: "REVIEW",
      icon: <LikeOutlined />,
    },
    {
      key: "/admin-page/support",
      label: "SUPPORT",
      icon: <CustomerServiceOutlined />,
    },
    {
      key: "/admin-page/promotion",
      icon: <GiftOutlined />,
      label: "PROMOTION",
    },
    {
      key: "/admin-page/data",
      icon: <CloudOutlined />,
      label: "DATA",
    },
    {
      key: "/admin-page/setting",
      icon: <SettingOutlined />,
      label: "SETTING",
    },
    {
      key: "/admin-page/help",
      icon: <QuestionCircleOutlined />,
      label: "HELP",
    },
    {
      key: "divider",
      type: "divider", // Dùng để thêm một đường phân cách
    },
    {
      icon: <LogoutOutlined />,
      label: (
        <span style={{ cursor: "pointer", color: "red" }} onClick={logout}>
          LOG OUT
        </span>
      ),
    },
  ];

  return items;
};

export default UseMenuItems;
