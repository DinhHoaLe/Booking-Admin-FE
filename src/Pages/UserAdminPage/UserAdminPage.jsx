import React, { useEffect, useState } from "react";
import {
  DownOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Table, Dropdown, Menu, Space } from "antd";
import ModalAdmin from "./modalAdmin.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const UserAdminPage = () => {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dataUserName, setDataUserName] = useState([]);

  const openModal = (select) => {
    setSelected(select);
    setModal(true);
  };

  const EyeOut = () => {
    setShowPassword(!showPassword);
  };

  if (!dataUserName || dataUserName.length === 0) {
    return <div>Loading...</div>;
  }

  const filtersID = dataUserName.map((item) => ({
    text: item._id.toString(),
    value: item._id.toString(),
  }));

  const filtersEmail = dataUserName.map((item) => ({
    text: item.email.toString(),
    value: item.email.toString(),
  }));

  const filtersUsername = dataUserName.map((item) => ({
    text: item.username.toString(),
    value: item.username.toString(),
  }));

  const filtersPhone = dataUserName.map((item) => ({
    text: item.phone,
    value: item.phone,
  }));

  const filtersFirstName = dataUserName.map((item) => ({
    text: item.firstName,
    value: item.firstName,
  }));

  const filtersLastName = dataUserName.map((item) => ({
    text: item.lastName,
    value: item.lastName,
  }));

  const filtersStatus = [
    { text: "Active", value: "active" },
    { text: "Inactive", value: "inactive" },
    { text: "Pending", value: "pending" },
    { text: "Suspended", value: "suspended" },
  ];

  const filtersGender = [
    { text: "Male", value: "Male" },
    { text: "Female", value: "Female" },
  ];

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <button onClick={() => delUser(record)}>Delete</button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      filters: filtersID,
      fixed: "left",
      // width: 100,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div>{record._id}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      showSorterTooltip: {
        target: "full-header",
      },
      fixed: "left",
      filters: filtersEmail,
      onFilter: (value, record) => record.email.indexOf(value) === 0,
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (text, record) => <div>{record.email}</div>,
    },
    {
      title: "User",
      dataIndex: "username",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: filtersUsername,
      onFilter: (value, record) => record.username.indexOf(value) === 0,
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text, record) => <div>{record.username}</div>,
    },
    {
      title: (
        <span>
          Password{" "}
          {showPassword ? (
            <EyeInvisibleOutlined onClick={EyeOut} />
          ) : (
            <EyeOutlined onClick={EyeOut} />
          )}
        </span>
      ),
      dataIndex: "password",
      render: (text) => (
        <div style={{ width: 200 }}>
          {showPassword ? text : "***************"}
        </div>
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: filtersFirstName,
      onFilter: (value, record) => record.firstName.indexOf(value) === 0,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      render: (text, record) => (
        <div style={{ width: 150 }}>{record.firstName}</div>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: filtersLastName,
      onFilter: (value, record) => record.lastName.indexOf(value) === 0,
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      render: (text, record) => (
        <div style={{ width: 150 }}>{record.lastName}</div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: filtersPhone,
      onFilter: (value, record) => record.phone.indexOf(value) === 0,
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.phone}</div>
      ),
    },
    {
      title: "Birthday",
      dataIndex: "dateOfBirth",
      render: (text, record) => <div>{record.dateOfBirth}</div>,
    },
    {
      title: "Image",
      dataIndex: "avatar",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          <img
            src={record.avatar}
            alt={record.firstName}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: filtersGender,
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
      render: (text, record) => (
        <div style={{ width: 80 }}>
          {record.gender === true ? "Man" : "Woman"}
        </div>
      ),
    },
    {
      title: "Rank",
      dataIndex: "rank",
      render: (text, record) => <div style={{ width: 100 }}>{record.rank}</div>,
    },
    {
      title: "City",
      dataIndex: "city",
      render: (text, record) => <div style={{ width: 100 }}>{record.city}</div>,
    },
    {
      title: "Street",
      dataIndex: "street",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.street}</div>
      ),
    },
    {
      title: "Number",
      dataIndex: "number",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.number}</div>
      ),
    },
    {
      title: "Zipcode",
      dataIndex: "zipcode",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.zipcode}</div>
      ),
    },
    {
      title: "Phone Verified",
      dataIndex: "isPhoneVerified",
      render: (text, record) => (
        <div style={{ width: 80 }}>
          {record.isPhoneVerified === true ? "yes" : "no"}
        </div>
      ),
    },
    {
      title: "Email Verified",
      dataIndex: "isEmailVerified",
      render: (text, record) => (
        <div style={{ width: 80 }}>
          {record.isEmailVerified === true ? "yes" : "no"}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: filtersStatus,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.status}</div>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <a href="#">
            <Space>
              Action
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataUserName}
        // onChange={onChange}
        rowKey="id"
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        scroll={{ x: true, y: 950 }}
        // style={{ maxWidth: 1080 }}
        sticky
      />
      {modal && (
        <ModalAdmin
          setModal={setModal}
          selected={selected}
          callApi={callApi}
          callRefreshToken={callRefreshToken}
          token={token}
          setToken={setToken}
          setCookie={setCookie}
        />
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default UserAdminPage;
