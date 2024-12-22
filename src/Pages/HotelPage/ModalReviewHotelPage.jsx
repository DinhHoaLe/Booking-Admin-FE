import React, { useEffect, useState } from "react";
import { Modal, Table, Tag } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { apiGetAll } from "../../API/APIService";

const ModalReviewHotel = ({ openModal, selected }) => {
  const [review, setReview] = useState([]);
  const handleCancel = () => {
    openModal(false);
  };

  const handleOk = async () => {
    openModal(false);
  };

  console.log(review);
  const callApi = async () => {
    try {
      const response = await apiGetAll(
        `get-reviews-by-hotelId/${selected._id}`
      );
      if (response) {
        setReview(response.data.reviewId);
      }
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Something went wrong, please try again.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productName",
      render: (text, record) => (
        <div className="flex items-center">{record._id}</div>
      ),
    },
    {
      title: "Product Type",
      dataIndex: "productName",
      render: (text, record) => (
        <div className="flex items-center">{record.objectType}</div>
      ),
    },
    {
      title: "Date - Time",
      dataIndex: "dateTime",
      render: (_, record) => (
        <div className="flex items-center">{record.createdAt.slice(0, 16)}</div>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
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
      render: (_, record) => (
        <div className="flex items-center font-bold">{record.rating}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = "";
        let text = "";

        switch (status) {
          case "pending":
            color = "orange";
            text = "Pending";
            break;
          case "confirmed":
            color = "blue";
            text = "Confirmed";
            break;
          case "cancelled":
            color = "red";
            text = "Cancelled";
            break;
          case "completed":
            color = "green";
            text = "Completed";
            break;
          default:
            color = "default";
            text = status;
            break;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  const truncateStyle = {
    fontWeight: 700,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "calc(1.2em * 3)",
    lineHeight: "1.2em",
  };

  return (
    <Modal
      title="Hotel Review"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }} // Kiểm soát chiều cao và cuộn dọc
      okButtonProps={{ style: { backgroundColor: "#07689F" } }}
    >
      <Table
        columns={columns}
        dataSource={review}
        pagination={false}
        bordered
      />
      {/* <ToastContainer /> */}
    </Modal>
  );
};

export default ModalReviewHotel;
