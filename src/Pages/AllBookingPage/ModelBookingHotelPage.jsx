import React, { useState } from "react";
import { Modal, Input, Select, Form, Image, DatePicker } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import moment from "moment";
import { apiPatch } from "../../API/APIService";

const ModelBookingHotelPage = ({ openModal, selected }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    openModal(false);
  };

  const handleOk = async () => {
    const toastId = toast.loading("Creating...");
    try {
      const values = await form.validateFields();
      const response = await apiPatch(`update-contact/${selected._id}`, values);

      toast.update(toastId, {
        render: response.message,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
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
  return (
    <Modal
      title="Contact Information"
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      <Form
        layout="vertical"
        form={form}
        // onFinish={handleOk}
        initialValues={{
          _id: selected._id,
          email: selected.contactInfo.email,
          name: selected.contactInfo.name,
          phone: selected.contactInfo.phone,
          status: selected.status,
        }}
      >
        <Form.Item label="Booking ID" name="_id">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <PhoneInput inputStyle={{ width: "100%" }} country={"vn"} />
        </Form.Item>

        <Form.Item label="Name" name="name">
          <Input placeholder="Input Name" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Input Email" />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="confirmed">Confirmed</Select.Option>
            <Select.Option value="cancelled">Cancelled</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

export default ModelBookingHotelPage;
