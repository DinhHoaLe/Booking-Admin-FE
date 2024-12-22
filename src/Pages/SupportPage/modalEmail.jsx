import React, { useEffect, useState } from "react";
import { Modal, Input, Typography, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MailOutlined,
  UserOutlined,
  CommentOutlined,
  EditOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { apiPatch } from "../../API/APIService";

const { TextArea } = Input;
const { Title, Text } = Typography;

const ModalEmail = ({ openModal, selected }) => {
  const [messageReply, setMessageReply] = useState("");
  const [subject, setSubject] = useState("");

  const handleCancel = () => {
    openModal(false);
  };

  const handleOk = async () => {
    const toastId = toast.loading("Creating...");
    try {
      const response = await apiPatch(`reply-support/${selected._id}`, {
        subject: subject,
        messageReply: messageReply,
      });

      toast.update(toastId, {
        render: response.message,
        type: "success",
        isLoading: false,
        autoClose: 1000,
        onClose: () => openModal(false),
      });
    } catch (error) {
      console.log(error);
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

  return (
    <div>
      <Modal
        title={<Title level={3}>Send Email</Title>}
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" icon={<MailOutlined />} onClick={handleOk}>
              Send Email
            </Button>
          </div>
        }
        bodyStyle={{ padding: 20 }}
      >
        {/* User Message */}
        <div style={{ marginBottom: 20 }}>
          <Title level={5}>
            <CommentOutlined style={{ marginRight: 8 }} /> User's Message
          </Title>
          <Text style={{ display: "block", marginTop: 8 }}>
            {selected.message}
          </Text>
        </div>

        {/* User Information */}
        <div style={{ marginBottom: 20 }}>
          <Title level={5}>
            <UserOutlined style={{ marginRight: 8 }} /> User Information
          </Title>
          <Text strong style={{ marginBottom: 8, display: "block" }}>
            User's Email:
          </Text>
          <Input
            value={selected.userId.email}
            disabled
            prefix={<MailOutlined />}
          />
        </div>

        {/* Admin Response */}
        <div style={{ marginBottom: 20 }}>
          <Title level={5}>
            <EditOutlined style={{ marginRight: 8 }} /> Admin Response
          </Title>
          <Text strong style={{ marginBottom: 8, display: "block" }}>
            Subject:
          </Text>
          <Input
            placeholder="Enter a brief subject"
            onChange={(e) => setSubject(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Text strong style={{ marginBottom: 8, display: "block" }}>
            Message:
          </Text>
          <TextArea
            rows={6}
            placeholder="Write your reply here..."
            value={messageReply}
            onChange={(e) => setMessageReply(e.target.value)}
          />
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ModalEmail;
