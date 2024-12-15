import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import items from "../data/dataSideBar";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import Logo from "../../img/Logo.png";

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

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <nav className=" text-white p-4 space-y-2 sm:w-auto">
      <div className="flex justify-center">
        {!isMobile ? (
          <div>
            <img
              src={Logo}
              alt="Logo"
              className="w-full h-13 object-cover cursor-pointer"
              onClick={() => navigate("/admin-page")}
            />
          </div>
        ) : (
          <div className="block sm:hidden px-2 py-2 rounded transition duration-200 ease-in-out w-full sm:w-auto cursor-pointer">
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{
                marginBottom: 16,
                backgroundColor: "#07689f",
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </div>
        )}
      </div>
      <div className="border-b-2 border-white mb-2"></div>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        style={{ fontWeight: "bold", marginRight: "20px" }}
        inlineCollapsed={collapsed}
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </nav>
  );
}

export default Sidebar;
