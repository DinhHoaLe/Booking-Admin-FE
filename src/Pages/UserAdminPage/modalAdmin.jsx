import React, { useState } from "react";
import { Modal, Input, Select, Form, Image, DatePicker } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import moment from "moment";

const ModalAdmin = ({
  setModal,
  selected,
  callApi,
  callRefreshToken,
  token,
  setToken,
  setCookie,
}) => {
  const [form] = Form.useForm();
  const [newImage, setNewImage] = useState(selected.avatar);
  const [phone, setPhone] = useState(selected.phone);
  const [newUploadImage, setNewUploadImage] = useState();
  const [dateOfBirth, setDateOfBirth] = useState(selected.dateOfBirth);

  const handleCancel = () => {
    setModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result);
      };
      setNewUploadImage(file);
      reader.readAsDataURL(file);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Lấy tất cả giá trị từ form
      const formData = new FormData();
      formData.append("file", newUploadImage); // Thêm tệp vào FormData
      formData.append("userId", selected._id); // Thêm tệp vào FormData
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("gender", values.gender);
      formData.append("phone", phone);
      formData.append("role", values.role);
      formData.append("city", values.city);
      formData.append("district", values.district);
      formData.append("ward", values.ward);
      formData.append("number", values.number);
      formData.append("zipcode", values.zipcode);
      formData.append("status", values.status);
      formData.append("dateOfBirth", dateOfBirth);

      const req1 = await fetch(
        `http://localhost:8080/api/v1/admin/update-admin/${selected._id}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (req1.status === 403) {
        const req2 = await callRefreshToken(token);
        setToken(req2);
        setCookie("token", req2, 7);
        if (!req2) throw new Error("Please Log in first!");
        const req3 = await fetch(
          `http://localhost:8080/api/v1/admin/update-admin/${selected._id}`,
          {
            method: "PATCH",
            authorization: `Bearer ${req2}`,
            body: formData,
          }
        );
        if (req3.status === 200) {
          const res3 = await req3.json();
          toast.success(res3.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => setModal(false),
          });
          callApi();
        } else {
          const res3 = await req3.json();
          toast.warn(res3.message, {
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
      if (req1.status === 200) {
        const res3 = await req1.json();
        toast.success(res3.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => setModal(false),
        });
        callApi();
      } else {
        const res3 = await req1.json();
        toast.warn(res3.message, {
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
      title="Admin Information"
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
          dateOfBirth: selected.dateOfBirth
            ? moment(selected.dateOfBirth)
            : null,
          gender: selected.gender,
          role: selected.role,
          phone: selected.phone,
          city: selected.address.city ? selected.address.city : "",
          ward: selected.address.ward ? selected.address.ward : "",
          district: selected.address.district ? selected.address.district : "",
          number: selected.address.number ? selected.address.number : "",
          zipcode: selected.zipcode,
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

        <Form.Item label="User Name" name="username">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <PhoneInput
            inputStyle={{ width: "100%" }}
            // country={"vn"}
            onChange={(value) => setPhone(value)}
          />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Select>
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
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
            defaultValue={
              selected.dateOfBirth ? moment(selected.dateOfBirth) : null
            }
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

        <Form.Item label="Number" name="number">
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

        <Form.Item label="Image">
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {newImage && (
            <Image src={newImage} alt="Customer Avatar" width={100} />
          )}
        </Form.Item>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

export default ModalAdmin;
