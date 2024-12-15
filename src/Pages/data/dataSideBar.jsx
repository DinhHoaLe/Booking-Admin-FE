import {
  DashboardOutlined,
  BarChartOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
  StarOutlined,
  CommentOutlined,
  GiftOutlined,
  CloudOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  FormOutlined,
  CalendarOutlined,
  FileAddOutlined,
  MessageOutlined,
  CustomerServiceOutlined,
  PhoneOutlined,
  MailOutlined,
  LikeOutlined,
  ProductOutlined,
  OrderedListOutlined,
  PlusCircleOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  CompassOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { FaPlane, FaHotel, FaMapMarkerAlt, FaRoute } from "react-icons/fa";

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
];

export default items;
