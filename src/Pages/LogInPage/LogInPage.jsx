import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
  Row,
  Col,
  Typography,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgLogIn from "../../img/login.jpg";
import imgLogo from "../../img/Logo.png";
import imgEN from "../../img/EN.png";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const req1 = await fetch(`${import.meta.env.VITE_URL_API}/admin-log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const res1 = await req1.json();
      if (req1.status === 400) {
        if (res1.emailVerified === false) {
          toast.warn(res1.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => navigate("/verify-email"),
          });
        } else {
          toast.warn(res1.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else if (req1.status === 200) {
        localStorage.setItem("accessToken", res1.accessToken);
        localStorage.setItem("refreshToken", res1.refreshToken);
        toast.success(res1.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => navigate("/admin-page"),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img src={imgLogo} alt="" />
        <div className="flex items-center gap-3">
          <img
            src={imgEN}
            alt="language"
            style={{ marginRight: "10px", cursor: "pointer" }}
          />
          <Button
            type="text"
            icon={<QuestionCircleOutlined style={{ fontSize: "24px" }} />}
            style={{
              height: "24px",
              width: "24px",
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          width: "100%",
        }}
      >
        <Row
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: "10px",
            overflow: "hidden",
            maxWidth: "750px",
            width: "100%",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Col xs={24} md={12} style={{ padding: "0" }}>
            <img
              src={imgLogIn}
              alt="Login"
              className=" object-cover hidden md:block"
            />
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="w-full">
              <Title level={2} style={{ fontWeight: "bold" }}>
                Login To Admin
              </Title>
              <Text>Login to access your Easyset24 Admin's account</Text>
              <Form
                name="login"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ marginTop: "20px" }}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid email!",
                    },
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Easyset24@gmail.com" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="********" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <div className="flex justify-between items-center">
                    <Checkbox className="font-medium">Remember Me</Checkbox>
                    <a
                      href="#forgot-password"
                      className="text-[#07689f] font-bold"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="bg-[#07689f]"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
      <ToastContainer />
    </Layout>
  );
};

export default LoginPage;
