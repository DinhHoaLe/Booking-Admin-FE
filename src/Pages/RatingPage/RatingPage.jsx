import React, { useContext, useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import ModalRating from "./modalRating";
import { DownOutlined, EyeOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";

const RatingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [newDataProduct, setNewDataProduct] = useState([]);
  const [selected, setSelected] = useState();
  const [token, setToken] = useState("");

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelected(product);
  };

  const filtersID = dataProduct.map((item) => ({
    text: item._id.toString(),
    value: item._id.toString(),
  }));

  const filtersTitle = dataProduct.map((item) => ({
    text: item.title.toString(),
    value: item.title.toString(),
  }));

  const filtersStatus = [
    { text: "active", value: "active" },
    { text: "block", value: "block" },
  ];

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <button>Delete</button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      filters: filtersID,
      fixed: "left",
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div>{record._id}</div>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filters: filtersTitle,
      onFilter: (value, record) => record.title.indexOf(value) === 0,
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => <div>{record.title}</div>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          <img
            src={record.image}
            alt={record.title}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (text, rating) => (
        <div style={{ width: 70 }}>
          <div>{rating.totalRating}</div>
        </div>
      ),
    },
    {
      title: "Rating Count",
      dataIndex: "rating",
      key: "rating",
      render: (text, rating) => (
        <div style={{ width: 90 }}>
          <div>{rating.countRating}</div>
        </div>
      ),
    },
    {
      title: "Total Comment",
      dataIndex: "Total comment",
      key: "Total comment",
      // width: 130,
      render: (text, record) => (
        <div style={{ width: 100 }}>
          <div>{record.countComment}</div>
        </div>
      ),
    },
    {
      title: "Total Reply",
      dataIndex: "Total comment",
      key: "Total comment",
      // width: 130,
      render: (text, record) => (
        <div style={{ width: 100 }}>
          <div>{record.countReply}</div>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
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
        dataSource={newDataProduct}
        rowKey="id"
        scroll={{ x: true, y: 950 }}
        // style={{ maxWidth: 1080 }}
        sticky
        rowClassName={(record) => {
          switch (record.status) {
            case "available":
              return;
            case "out_of_stock":
              return "bg-red-100";
            case "discontinued":
              return "bg-yellow-100";
            case "pre_order":
              return "bg-gray-100";
            default:
              return "";
          }
        }}
      />
      {isModalOpen && (
        <ModalRating openModal={setIsModalOpen} selected={selected} />
      )}
      <ToastContainer />
    </div>
  );
};

export default RatingPage;
