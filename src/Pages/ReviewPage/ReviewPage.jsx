import React, { useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space, Popconfirm } from "antd";
import ModalReview from "./modatalReview";
import { DownOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchReview } from "../../Redux/Slide/reviewSlice";
import { apiDelete } from "../../API/APIService";

const ReviewPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const openModal = (record) => {
    setIsModalOpen(true);
    setSelected(record);
  };

  const setModal = (value) => {
    setIsModalOpen(value);
  };

  const { reviews, statusReviews, errorReviews } = useSelector(
    (state) => state.reviews
  );

  const confirm = async (xxx) => {
    try {
      const response = await apiDelete(`delete-review/${xxx._id}`);
      toast.success(response.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (statusReviews === "idle") {
      dispatch(fetchReview());
    }
  }, [dispatch, statusReviews]);

  if (statusReviews === "loading") return <p>Loading</p>;
  if (statusReviews === "error") return <p>{errorReviews.message}</p>;

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Popconfirm
          title="Delete the hotel"
          description="Are you sure to delete this hotel?"
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

  // const filtersID = reviews?.data.map((item) => ({
  //   text: item._id.toString(),
  //   value: item._id.toString(),
  // }));

  const filtersType = [
    { text: "Tour", value: "tour" },
    { text: "Room", value: "room" },
    { text: "Hotel", value: "Hotel" },
    { text: "Flight", value: "Flight" },
  ];

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
      // filters: filtersID,
      fixed: "left",
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div>{record._id}</div>,
    },
    {
      title: "Type",
      dataIndex: "objectType",
      key: "objectType",
      filters: filtersType,
      onFilter: (value, record) => record.objectType === value, // Lọc dựa trên giá trị
      render: (text) => <div style={{ width: "50px" }}>{text}</div>,
    },
    {
      title: "Comment",
      dataIndex: "Comment",
      key: "Comment",
      render: (text, record) => (
        <div style={{ width: 200 }}>
          <p style={truncateStyle}>{record.comment}</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(record.comment);
            }}
          >
            Read more
          </a>
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 80,
      render: (text) => <div style={{ width: "50px" }}>{text}</div>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // width: 250,
      render: (text) => <div>{text}</div>,
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
        dataSource={reviews.data}
        rowKey="_id"
        scroll={{ x: true }}
        sticky
        rowClassName={(record) => {
          switch (record.status) {
            case "active":
              return;
            case "block":
              return "bg-gray-100";
            case "pending":
              return "bg-yellow-100";
            default:
              return "";
          }
        }}
      />
      {isModalOpen && <ModalReview setModal={setModal} selected={selected} />}
      <ToastContainer />
    </div>
  );
};

export default ReviewPage;
