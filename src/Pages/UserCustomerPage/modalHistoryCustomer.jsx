import React, { useEffect, useState } from "react";
import { Modal, Table, Tag } from "antd";
import { apiGetAll, apiPatchFormData, apiPost } from "../../API/APIService";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddress } from "../../Redux/Slide/addressSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ModalCustomerHistory = ({ setModalHistory, selected }) => {
  const [history, setHistory] = useState([]);
  const handleCancel = () => {
    setModalHistory(false);
  };

  const callApi = async () => {
    try {
      const response = await apiGetAll(
        `admin-get-booking-by-userId/${selected._id}`
      );
      if (response) {
        setHistory(response.data);
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

  const handleOk = () => {
    setModalHistory(false);
  };

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
      title: "Amount",
      render: (_, record) => (
        <div className="flex items-center font-bold">{record.totalAmount}</div>
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

  return (
    <Modal
      title="Booking History"
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      <Table
        columns={columns}
        dataSource={history}
        pagination={false}
        bordered
      />
      <ToastContainer />
    </Modal>
  );
};

export default ModalCustomerHistory;
