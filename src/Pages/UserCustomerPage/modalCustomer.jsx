import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Form, Image, DatePicker } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import moment from "moment";
import { jwtDecode } from "jwt-decode";

const ModalCustomer = ({ setModal, selected }) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState("");
  const [newImage, setNewImage] = useState(selected.avatar);
  const [phone, setPhone] = useState(selected.phone);
  const [dateOfBirth, setDateOfBirth] = useState(selected.dateOfBirth);

  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = async () => {
    if (user === "admin") {
      try {
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
    }
  };

  return (
    <Modal
      title="Customer Information"
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
          email: selected.email,
          username: selected.username,
          firstName: selected.firstName,
          lastName: selected.lastName,
          dateOfBirth: selected.DOB ? moment(selected.DOB) : null,
          gender: selected.gender,
          phone: selected.phone,
          city: selected.address.city ? selected.address.city : "",
          ward: selected.address.ward ? selected.address.ward : "",
          district: selected.address.district ? selected.address.district : "",
          street: selected.address.street ? selected.address.street : "",
          status: selected.status,
          avatar: selected.avatar,
        }}
      >
        <Form.Item label="User ID" name="_id">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <PhoneInput
            inputStyle={{ width: "100%" }}
            // country={"vn"}
            onChange={(value) => setPhone(value)}
          />
        </Form.Item>

        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName">
          <Input />
        </Form.Item>

        <Form.Item label="Date Of Birth" name="dateOfBirth">
          <DatePicker
            style={{ width: "100%" }}
            defaultValue={selected.DOB ? moment(selected.DOB) : null}
            onChange={(date, dateString) => setDateOfBirth(dateString)}
          />
        </Form.Item>

        <Form.Item label="City" name="city">
          <Input />
        </Form.Item>

        <Form.Item label="District" name="district">
          <Input />
        </Form.Item>

        <Form.Item label="Ward" name="ward">
          <Input />
        </Form.Item>

        <Form.Item label="Street" name="street">
          <Input />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select>
            <Select.Option value={false}>Male</Select.Option>
            <Select.Option value={true}>Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="suspended">Suspended</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

export default ModalCustomer;
