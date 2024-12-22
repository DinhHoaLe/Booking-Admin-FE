import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Space, Select, Form, Popconfirm } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ModalPromotion from "./modalPromotion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPromotion } from "../../Redux/Slide/promotionSlice";
import { fetchAllHotel } from "../../Redux/Slide/allHotelSlice";
import { apiDelete, apiGet } from "../../API/APIService";

const { Option } = Select;

const PromotionPage = () => {
  const [selectedPromotion, setSelectedPromotion] = useState([]);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const { promotion, statusPromotion, errorPromotion } = useSelector(
    (state) => state.promotion
  );

  console.log(promotion);

  const openModal = (xxx) => {
    setModal(true);
    setSelectedPromotion(xxx);
  };

  useEffect(() => {
    if (statusPromotion === "idle") {
      dispatch(fetchPromotion());
      dispatch(fetchAllHotel());
    }
  }, [dispatch, statusPromotion]);

  if (statusPromotion === "loading") return <p>Loading...</p>;
  if (statusPromotion === "failed") return <p>Error: {errorPromotion}</p>;

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Popconfirm
          title="Delete the promotion"
          description="Are you sure to delete this promotion?"
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

  const truncateStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "calc(1.2em * 3)",
    lineHeight: "1.2em",
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      // width: 100,
      render: (text, record) => (
        <div style={{ width: "200px" }}>{record._id}</div>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
    },
    {
      title: "Object Type",
      dataIndex: "objectType",
      key: "objectType",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
    },
    {
      title: "Object Name",
      dataIndex: "objectType",
      key: "objectType",
      render: (text, record) => (
        <div style={{ width: "100px" }}>
          {record?.objectId?.hotelName ? record?.objectId?.hotelName : "ALL"}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <div style={{ width: 150 }}>
          <p style={truncateStyle}>{record.description}</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(record.description);
            }}
          >
            Read more
          </a>
        </div>
      ),
    },
    {
      title: "Imagine",
      dataIndex: "imgPromotion",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          <img
            src={record.imgPromotion}
            alt="SALES"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
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
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
    },
    {
      title: "Discount Value",
      dataIndex: "discountValue",
      key: "discountValue",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
    },
    {
      title: "Minimum Value",
      dataIndex: "minimumValue",
      key: "minimumValue",
      width: 150,
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
    },
    {
      title: "Max Discount",
      dataIndex: "maxDiscount",
      key: "maxDiscount",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
    },
    {
      title: "Applicable Categories",
      dataIndex: "applicableCategories",
      key: "applicableCategories",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
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
        dataSource={promotion.data}
        scroll={{ x: true }}
        // style={{ maxWidth: 1080 }}
        sticky={{ offsetHeader: 35 }}
        rowKey="id"
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
