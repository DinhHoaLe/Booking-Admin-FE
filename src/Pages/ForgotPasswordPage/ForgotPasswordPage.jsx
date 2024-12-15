import React from "react";
import { useNavigate } from "react-router";
import { Form, Input, Button, Layout, Row, Col, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imgLogIn from "../../img/login.jpg";
import imgLogo from "../../img/Logo.png";
import imgEN from "../../img/EN.png";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const req1 = await fetch(`${import.meta.env.VITE_URL_API}/login`, {
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
      } else if (req1.status === 200) {
        toast.success(res1.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            navigate("/profile");
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error internal", {
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
        }}
      >
        <Row
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: "10px",
            overflow: "hidden",
            maxWidth: "900px",
            width: "100%",
            height: "720px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Col xs={24} md={12} style={{ padding: "0" }}>
            <img
              src={imgLogIn}
              alt="Login"
              className="w-full h-full object-cover hidden md:block"
            />
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              padding: "40px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="w-full">
              <Title level={2} style={{ fontWeight: "bold" }}>
                Forgot Password
              </Title>
              <Text>Fill in your email to send OTP to your email.</Text>
              <Form
                name="forgotpassword"
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
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Easyset24@gmail.com" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="bg-[#07689f]"
                  >
                    Sent OTP
                  </Button>
                </Form.Item>

                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  Back to{" "}
                  <Text
                    className="text-[#07689f] cursor-pointer font-bold hover:text-blue-400"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Text>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  Or
                </div>
                <Row gutter={10} className="flex justify-center cursor-pointer">
                  <Col>
                    <img src="/login/facebook.png" />
                  </Col>
                  <Col>
                    <img src="/login/apple.png" />
                  </Col>
                  <Col>
                    <img src="/login/google.png" />
                  </Col>
                </Row>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Text>
                    Don’t have an account yet?{" "}
                    <Text
                      className="text-[#07689f] cursor-pointer font-bold hover:text-blue-400"
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </Text>
                  </Text>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
      <ToastContainer />
    </Layout>
  );
};

export default ForgotPasswordPage;
