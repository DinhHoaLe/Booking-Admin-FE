import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Table, Dropdown, Menu, Space, Popconfirm } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { apiDelete, apiGetAll } from "../../API/APIService.jsx";
import ModalHistoryAdmin from "./modalHistoryAdmin.jsx";
import ModalViewProfileAdmin from "./modalViewProfileAdmin.jsx";

const UserAdminPage = () => {
  const [modalView, setModalView] = useState(false);
  const [modalHistory, setModalHistory] = useState(false);
  const [selected, setSelected] = useState("");
  const [dataUserName, setDataUserName] = useState([]);

  const openModal = (select) => {
    setSelected(select);
    setModalView(true);
  };

  const openModalHistory = (select) => {
    setSelected(select);
    setModalHistory(true);
  };

  const callApi = async () => {
    try {
      const response = await apiGetAll("get-all-admin");
      setDataUserName(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const confirm = async (xxx) => {
    const toastId = toast.loading("Creating...");
    try {
      const response = await apiDelete(`delete-admin/${xxx._id}`);
      toast.update(toastId, {
        render: response.message,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
    }
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
      <Menu.Item key="1">
        <button onClick={() => openModalHistory(record)}>History</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Popconfirm
          title="Delete the tour"
          description="Are you sure to delete this tour?"
          onConfirm={() => confirm(record)}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <button className="text-red-500">Delete</button>
        </Popconfirm>
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
      title: "DOB",
      dataIndex: "DOB",
      render: (text, record) => (
        <div style={{ width: "120px" }}>{record.DOB}</div>
      ),
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
      title: "Country",
      dataIndex: "country",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.country}</div>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      render: (text, record) => <div style={{ width: 100 }}>{record.city}</div>,
    },
    {
      title: "District",
      dataIndex: "district",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.district}</div>
      ),
    },
    {
      title: "Ward",
      dataIndex: "ward",
      render: (text, record) => <div style={{ width: 100 }}>{record.ward}</div>,
    },
    {
      title: "Street",
      dataIndex: "street",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.street}</div>
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
        scroll={{ x: true }}
        // style={{ maxWidth: 1080 }}
        sticky
      />
      {modalView && (
        <ModalViewProfileAdmin
          setModalView={setModalView}
          selected={selected}
        />
      )}
      {modalHistory && (
        <ModalHistoryAdmin
          setModalHistory={setModalHistory}
          selected={selected}
        />
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default UserAdminPage;
