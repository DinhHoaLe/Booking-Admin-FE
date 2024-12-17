import React, { useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import ModalReview from "./modatalReview";
import { DownOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchReview } from "../../Redux/Slide/reviewSlice";

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
        {/* <button onClick={() => deleteReview(record)}>Delete</button> */}
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Reviews ID",
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
      width: 100,
      render: (text) => <div>{text}</div>,
    },
    // {
    //   title: "User Email",
    //   dataIndex: ["userId", "email"],
    //   key: "email",
    //   // width: 200,
    //   render: (text) => <div>{text}</div>,
    // },
    // {
    //   title: "Username",
    //   dataIndex: ["userId", "username"],
    //   key: "username",
    //   // width: 150,
    //   render: (text) => <div>{text}</div>,
    // },
    // {
    //   title: "Comment",
    //   dataIndex: "comment",
    //   key: "comment",
    //   // width: 250,
    //   render: (text) => <div>{text}</div>,
    // },
    // {
    //   title: "Rating",
    //   dataIndex: "rating",
    //   key: "rating",
    //   width: 80,
    //   render: (text) => <div>{text}</div>,
    // },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   // width: 200,
    //   render: (text) => <div>{new Date(text).toLocaleString()}</div>,
    // },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   width: 100,
    //   render: (text) => (
    //     <div>
    //       <img
    //         src={text}
    //         alt="User review"
    //         style={{ width: 100, height: 100 }}
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   title: "Product Title",
    //   dataIndex: "title",
    //   key: "title",
    //   // width: 250,
    //   render: (text, record) => <div>{record.productId.title}</div>,
    // },
    // {
    //   title: "Admin ID",
    //   dataIndex: "adminId",
    //   key: "adminId",
    //   // width: 250,
    //   render: (text, record) => <div>{record.reply.adminId}</div>,
    // },
    // {
    //   title: "Text",
    //   dataIndex: "text",
    //   key: "text",
    //   // width: 250,
    //   render: (text, record) => <div>{record.reply.text}</div>,
    // },
    // {
    //   title: "Status Reply",
    //   dataIndex: "statusReply",
    //   key: "statusReply",
    //   width: 150,
    //   render: (_, record) => (
    //     <div>{record.reply.statusReply === true ? "Yes" : "No"}</div>
    //   ),
    // },
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
        scroll={{ x: true, y: 950 }}
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
      {isModalOpen && (
        <ModalReview
          setModal={setModal}
          selected={selected}
          token={token}
          setToken={setToken}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ReviewPage;
