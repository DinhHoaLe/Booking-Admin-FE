import React, { useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ModalQuotes from "./modalQuotes";
import { ToastContainer, toast } from "react-toastify";
import ModalEmail from "./modalEmail";

const SupportPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEmail, setIsModalOpenEmail] = useState(false);
  const [selected, setSelected] = useState(null);
  const [token, setToken] = useState("");
  const [dataQuotes, setDataQuotes] = useState([]);

  const openModal = (record) => {
    setIsModalOpen(true);
    setSelected(record);
  };

  const openModalEmail = (record) => {
    setIsModalOpenEmail(true);
    setSelected(record);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      // width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      // width: 150,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      // width: 300,
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      // width: 300,
      render: (text, record) => record.createdAt.slice(0, 10),
    },
    {
      title: "Reply",
      key: "reply",
      render: (text, record) =>
        record.reply && record.reply.statusReply ? "Yes" : "No",
    },
    {
      title: "Time Reply",
      dataIndex: "timeReply",
      key: "timeReply",
      // width: 300,
      render: (text, record) =>
        record.reply.timeReply ? record.reply.timeReply.slice(0, 10) : "",
    },
    {
      title: "Note",
      key: "note",
      render: (text, record) => record.reply.note,
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
                {/* <button onClick={() => deleteSupport(record)}>Delete</button> */}
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
    <div className="overflow-hidden">
      <Table
        columns={columns}
        dataSource={dataQuotes}
        rowKey="_id"
        scroll={{ x: 1200, y: 950 }}
        sticky
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
        <ModalQuotes
          openModal={setIsModalOpen}
          selected={selected}
          token={token}
          setToken={setToken}
        />
      )}
      {isModalOpenEmail && (
        <ModalEmail
          openModal={setIsModalOpenEmail}
          selected={selected}
          token={token}
          setToken={setToken}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default SupportPage;
