import React, { useEffect, useState } from "react";
import {
  DownOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Table, Dropdown, Menu, Space } from "antd";
import ModalCustomer from "./modalCustomer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../Redux/Slide/userSlice";

const UserCustomerPage = () => {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [dataUserName, setDataUserName] = useState([]);

  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    } else if (status === "succeeded") {
      setDataUserName(users.data);
    }
  }, [dispatch, status]);

  console.log(users);
  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const openModal = (select) => {
    setSelected(select);
    setModal(true);
  };

  const filtersID = dataUserName.map((item) => ({
    text: item._id.toString(),
    value: item._id.toString(),
  }));

  const filtersEmail = dataUserName.map((item) => ({
    text: item.email.toString(),
    value: item.email.toString(),
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
    { text: "Pending", value: "pending" },
    { text: "Suspended", value: "suspended" },
    { text: "Delete", value: "delete" },
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
      title: "Contact Info",
      dataIndex: "ContactInfo",
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
      render: (text, record) => <div>{record.DOB.slice(0, 10)}</div>,
    },
    {
      title: "Avatar",
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
      title: "City",
      dataIndex: "city",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.address.city}</div>
      ),
    },
    {
      title: "District",
      dataIndex: "district",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.address.district}</div>
      ),
    },
    {
      title: "Ward",
      dataIndex: "ward",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.address.ward}</div>
      ),
    },
    {
      title: "Street",
      dataIndex: "street",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.address.street}</div>
      ),
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.nationality}</div>
      ),
    },
    {
      title: "Rank",
      dataIndex: "rank",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.membershipLevel}</div>
      ),
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.totalSpent}</div>
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
        rowClassName={(record) => {
          switch (record.status) {
            case "active":
              return "bg-green-100";
            case "delete":
              return "bg-gray-100";
            case "pending":
              return "bg-yellow-100";
            case "suspended":
              return "bg-red-100";
            default:
              return "";
          }
        }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        scroll={{ x: true, y: 950 }}
        // style={{ maxWidth: 1080 }}
        sticky
      />
      {modal && <ModalCustomer setModal={setModal} selected={selected} />}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default UserCustomerPage;