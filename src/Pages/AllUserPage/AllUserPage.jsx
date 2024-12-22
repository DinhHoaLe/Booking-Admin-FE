import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import UserCustomerPage from "../UserCustomerPage/UserCustomerPage";
import SignUpPage from "../SignupPage/SignUpPage";
import UserAdminPage from "../UserAdminPage/UserAdminPage";
import { apiGetAll } from "../../API/APIService";
import Cookies from "js-cookie";

const AllUserPage = () => {
  const [role, setRole] = useState("");

  const callApi = async () => {
    try {
      const checkRole = await apiGetAll("check-role");
      setRole(checkRole.role);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const nameHeader = [
    { name: "User", component: <UserCustomerPage />, visible: true },
    { name: "Admin", component: <UserAdminPage />, visible: role === "super" },
    { name: "Signup", component: <SignUpPage />, visible: role === "super" },
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
        items={nameHeader
          .filter((item) => item.visible)
          .map((item, i) => ({
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

export default AllUserPage;
