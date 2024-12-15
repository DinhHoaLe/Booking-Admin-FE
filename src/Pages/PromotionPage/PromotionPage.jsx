import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ModalPromotion from "./modalPromotion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PromotionPage = () => {
  const [token, setToken] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState([]);
  const [modal, setModal] = useState(false);
  const [dataPromotion, setDataPromotion] = useState([]);

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        {/* <button onClick={() => openModal(record)}>Edit</button> */}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        {/* <button onClick={() => deletePromotion(record)}>Delete</button> */}
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      // width: 100,
      render: (text, record) => <div>{record._id}</div>,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} alt="" style={{ width: "100px", height: "100px" }} />
      ),
    },
    {
      title: "StartDate",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Discount Value",
      dataIndex: "discountValue",
      key: "discountValue",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Min Order Value",
      dataIndex: "minimumOrderValue",
      key: "minimumOrderValue",
      width: 150,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Max Discount",
      dataIndex: "maxDiscount",
      key: "maxDiscount",
      width: 150,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Applicable Products",
      dataIndex: "applicableProducts",
      key: "applicableProducts",
      width: 180,
      render: (text, record) => (
        <div>
          {record.applicableProducts.map((item, index) => (
            <div key={index}>- {item.title}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Applicable Categories",
      dataIndex: "applicableCategories",
      key: "applicableCategories",
      width: 200,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => <div style={{ width: 50 }}>{text}</div>,
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
        dataSource={dataPromotion}
        scroll={{ x: true, y: 950 }}
        // style={{ maxWidth: 1080 }}
        rowKey="id"
        sticky
        rowClassName={(record) => {
          switch (record.status) {
            case "active":
              return "bg-green-100";
            case "inactive":
              return "bg-gray-100";
            case "expired":
              return "bg-yellow-100";
            default:
              return "";
          }
        }}
      />
      {modal && (
        <ModalPromotion selected={selectedPromotion} setModal={setModal} />
      )}
    </div>
  );
};

export default PromotionPage;
