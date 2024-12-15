import React, { useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ModalOrder from "./modalOrder";
import { ToastContainer, toast } from "react-toastify";
import ModalBill from "./modalBill";
import ModalEmailOrder from "./modalEmail";

const BookingPageFail = () => {
  const [selected, setSelected] = useState();
  const [modal, setModal] = useState(false);
  const [bill, setBill] = useState(false);
  const [modalEmail, setModalEmail] = useState(false);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      width: 150,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Price",
      dataIndex: "productId",
      key: "price",
      render: (text, record) => `$${record.productId?.price}`,
      width: 100,
    },
    {
      title: "Total Bill",
      key: "totalPrice",
      render: (text, record) => `$${record.productId?.price * record.quantity}`,
      width: 150,
    },
    {
      title: "Delivery Infor",
      dataIndex: "deliveryId",
      key: "deliveryId",
      render: (text, record) => {
        return (
          <div>
            <div>{`Delivery ID : ${record.deliveryId?._id || "N/A"}`}</div>
            <div>{`EDD : ${
              record.deliveryId?.deliveryDate.slice(0, 10) || "N/A"
            }`}</div>
          </div>
        );
      },
      // width: 300,
    },
    {
      title: "Consignee Infor",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
      // width: 200,
      render: (text, record) => {
        return (
          <div>
            <div>{`Name: ${record.firstName} ${record.lastName}`}</div>
            <div>{`Phone : ${record.phoneNumber}`}</div>
            <div>{`ROD : ${
              record.deliveryId?.orderReceivedDate.slice(0, 10) || "N/A"
            }`}</div>
          </div>
        );
      },
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      width: 150,
      render: (text, record) => {
        return <div>{record.deliveryId.deliveryStatus}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
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

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Item key="1">
        <button onClick={() => openBill(record)}>Bill</button>
      </Menu.Item>
      <Menu.Item key="2">
        <button onClick={() => openEmail(record)}>Mail</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <button>Delete</button>
      </Menu.Item>
    </Menu>
  );

  const openModal = (record) => {
    setSelected(record);
    setModal(true);
  };

  const openBill = (record) => {
    setSelected(record);
    setBill(true);
  };

  const openEmail = (record) => {
    setSelected(record);
    setModalEmail(true);
  };

  return (
    <div className="overflow-x-auto">
      <Table
        columns={columns}
        // dataSource={dataOrder}
        rowKey={(record) => record._id}
        scroll={{ x: true, y: 950 }}
        sticky
        rowClassName={(record) => {
          switch (record.status) {
            case "Waiting":
              return "bg-gray-100";
            case "Confirmed":
              return "bg-red-100";
            case "Cancelled":
              return "bg-yellow-100";
            default:
              return "";
          }
        }}
      />
      {modal && <ModalOrder setModal={setModal} selected={selected} />}
      {bill && <ModalBill setBill={setBill} selected={selected} />}
      {modalEmail && (
        <ModalEmailOrder setModalEmail={setModalEmail} selected={selected} />
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default BookingPageFail;
