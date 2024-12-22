import React from "react";
import { Form, Input, Button, Layout, Select, Typography } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiPost } from "../../API/APIService";

const { Option } = Select;
const { Title, Text } = Typography;
const workplace = ["TP Hà Nội", "TP Hồ Chí Minh"];

const SignUpPage = () => {
  const onFinish = async (values) => {
    const toastId = toast.loading("Creating...");
    try {
      console.log(values);
      const response = await apiPost("admin-sign-up", values);
      toast.update(toastId, {
        render: response.message,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: "An error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };
  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Text>Sing up new account admin </Text>
      <Form
        name="register"
        layout="vertical"
        initialValues={{ policies: true }}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        style={{ marginTop: "20px" }}
      >
        <Form.Item
          label="Workplace"
          name="workplace"
          rules={[{ required: true, message: "Please select workplace!" }]}
        >
          <Select placeholder="Select Workplace">
            {workplace.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className="flex justify-between gap-5">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
            className="w-1/2"
          >
            <Input placeholder="Easyset24" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
            className="w-1/2"
          >
            <Input placeholder="Easyset24" />
          </Form.Item>
        </div>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Easyset24@gmail.com" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="********" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please input confirm!" }]}
        >
          <Input.Password placeholder="********" visibilityToggle={false} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="bg-[#07689f]"
          >
            SIGN UP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpPage;
