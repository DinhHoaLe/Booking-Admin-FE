import React, { useState } from "react";
import { Modal, Table, Input } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ModalReview = ({ setModal, selected }) => {
  const [newStatus, setNewStatus] = useState(selected?.status || "active");
  // const [newReply, setNewReply] = useState(selected?.reply.text || "");

  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = async () => {
    try {
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update review.", {
        autoClose: 1500,
      });
    }
  };

  const columns1 = [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
      render: () => <div style={{ width: 200 }}>{selected._id}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: () => <div style={{ width: 200 }}>{selected.userId.email}</div>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: () => (
        <div style={{ width: 150 }}>{selected.userId.lastName}</div>
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: () => (
        <div style={{ width: 150 }}>{selected.userId.firstName}</div>
      ),
    },
  ];

  const columns2 = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      render: () => <div style={{ width: 200 }}>{selected.objectId._id}</div>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: () => <div style={{ width: 250 }}>{selected.objectType}</div>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: () => <div style={{ width: 50 }}>{selected.rating}</div>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: () => (
        <div style={{ width: 200 }}>{selected.createdAt.slice(0, 19)}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => (
        <select
          style={{ width: 100 }}
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="block">Block</option>
          <option value="pending">Pending</option>
        </select>
      ),
    },
  ];

  const columns3 = [
    {
      title: "Comment",
      dataIndex: "Comment",
      key: "Comment",
      // width: 250,
      render: (_, record, index) => {
        return index === 1 ? (
          <Input.TextArea
          // value={newReply}
          // onChange={(e) => setNewReply(e.target.value)}
          />
        ) : (
          <Input.TextArea value={selected.comment} disabled />
        );
      },
    },
  ];

  const data1 = [
    { key: "1" }, // Row for current information
    { key: "2" }, // Row for input fields
  ];

  return (
    <div>
      <Modal
        title="Review Information"
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        bodyStyle={{ height: 600 }}
      >
        <div style={{ marginBottom: 16 }}>
          <h3>User Details</h3>
          <Table
            columns={columns1}
            dataSource={[selected]}
            pagination={false}
            rowKey="id"
            style={{ marginBottom: 16 }}
          />
        </div>
        <div>
          <h3>Products</h3>
          <Table
            columns={columns2}
            dataSource={[selected]}
            pagination={false}
            rowKey="productId"
            style={{ marginBottom: 16 }}
          />
        </div>
        <div>
          <h3>Comment</h3>
          <Table
            columns={columns3}
            dataSource={data1}
            pagination={false}
            rowKey="comment"
            style={{ marginBottom: 16 }}
          />
        </div>
      </Modal>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default ModalReview;
