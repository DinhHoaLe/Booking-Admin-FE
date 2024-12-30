import React, { useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ModalQuotes from "./modalQuotes";
import { ToastContainer, toast } from "react-toastify";
import ModalEmail from "./modalEmail";
import { apiGet, apiGetAll } from "../../API/APIService";

const SupportPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEmail, setIsModalOpenEmail] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dataQuotes, setDataQuotes] = useState([]);

  const openModal = (record) => {
    setIsModalOpen(true);
    setSelected(record);
  };

  const openModalEmail = (record) => {
    setIsModalOpenEmail(true);
    setSelected(record);
  };

  const callApi = async () => {
    try {
      const response = await apiGetAll("support");
      setDataQuotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const truncateStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "calc(1.2em * 3)",
    lineHeight: "1.2em",
  };

  useEffect(() => {
    callApi();
  }, []);

  const deleteSupport = async () => {};

  const columns = [
    {
      title: "Reviews ID",
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
      // width: 100,
      render: (text, record) => <div>{text}</div>,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text, record) => (
        <div className="w-20">{record.userId.firstName}</div>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text, record) => (
        <div className="w-20">{record.userId.lastName}</div>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text, record) => (
        <div style={{ width: 150 }}>
          <p style={truncateStyle}>{record.message}</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(record.message);
            }}
          >
            Read more
          </a>
        </div>
      ),
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      // width: 300,
      render: (text, record) => (
        <div className="w-20">{record.createdAt.slice(0, 10)}</div>
      ),
    },
    {
      title: "Reply",
      key: "reply",
      render: (text, record) => (
        <div className="w-20">
          {record.reply && record.statusReply ? "Yes" : "No"}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Approved", value: "approved" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0">
                <button onClick={() => openModal(record)}>Edit</button>
              </Menu.Item>
              <Menu.Item key="1">
                <button onClick={() => openModalEmail(record)}>Reply</button>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3">
                <button onClick={() => deleteSupport(record)}>Delete</button>
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
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
        dataSource={dataQuotes}
        rowKey="_id"
        scroll={{ x: true }}
        sticky={{ offsetHeader: 35 }} // Kích hoạt sticky cho Table Header
        rowClassName={(record) => {
          switch (record.status) {
            case "available":
              return;
            case "pending":
              return "bg-red-100";
            case "approved":
              return "bg-yellow-100";
            case "rejected":
              return "bg-gray-100";
            default:
              return "";
          }
        }}
      />
      {isModalOpen && (
        <ModalQuotes openModal={setIsModalOpen} selected={selected} />
      )}
      {isModalOpenEmail && (
        <ModalEmail openModal={setIsModalOpenEmail} selected={selected} />
      )}
      <ToastContainer />
    </div>
  );
};

export default SupportPage;
