import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { apiGet, apiGetAll } from "../../API/APIService";
import { Card, Avatar, Row, Col, Typography, Table, Tag, Select } from "antd";
import { Image } from "antd";
import {
  UserOutlined,
  ShopOutlined,
  EnvironmentOutlined,
  CustomerServiceOutlined,
  GiftOutlined,
  CalendarOutlined,
  RiseOutlined,
  FallOutlined,
  LineOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

function DashBoardPage() {
  const navigate = useNavigate();
  const [dataAll, setDataAll] = useState([]);
  const cardStyle = {
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    cursor: "pointer",
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

  const calApi = async () => {
    try {
      const getData = await apiGetAll("dashboard");
      if (getData) {
        setDataAll(getData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    calApi();
  }, []);

  return (
    <div className="p-3 bg-gray-50 flex-grow overflow-auto">
      {/* Dashboard Title */}
      <div className="mb-6">
        <Title level={2} style={{ margin: 0 }}>
          Dashboard
        </Title>
      </div>
      <Row gutter={[16, 16]}>
        {/* Total Users */}
        <Col
          xs={24}
          sm={12}
          md={8}
          onClick={() => navigate("/admin-page/user")}
        >
          <Card style={cardStyle}>
            <Row justify="space-between" align="middle">
              <div>
                <Text type="secondary" style={{ fontWeight: 700 }}>
                  Total Users
                </Text>
                <Title level={3}>{dataAll.totalCustomer}</Title>
                <div>
                  <RiseOutlined style={{ color: "green", marginRight: 4 }} />
                  <Text style={{ color: "green", fontWeight: 700 }}>8.5% </Text>
                  <Text style={{ fontWeight: 500 }}>Up from yesterday</Text>
                </div>
              </div>
              <Avatar
                style={{ backgroundColor: "#EDEAFF", color: "#6B47DC" }}
                size={64}
                icon={<UserOutlined style={{ fontSize: "32px" }} />}
              />
            </Row>
          </Card>
        </Col>

        {/* Total Bookings */}
        <Col
          xs={24}
          sm={12}
          md={8}
          onClick={() => navigate("/admin-page/booking")}
        >
          <Card style={cardStyle}>
            <Row justify="space-between" align="middle">
              <div>
                <Text type="secondary" style={{ fontWeight: 700 }}>
                  Total Booking
                </Text>
                <Title level={3}>{dataAll.totalBooking}</Title>
                <div>
                  <FallOutlined style={{ color: "red", marginRight: 4 }} />
                  <Text style={{ color: "red", fontWeight: 700 }}>15% </Text>
                  <Text style={{ fontWeight: 500 }}>Down from yesterday</Text>
                </div>
              </div>
              <Avatar
                style={{ backgroundColor: "#FFF7E6", color: "#FA8C16" }}
                size={64}
                icon={<CalendarOutlined style={{ fontSize: "32px" }} />}
              />
            </Row>
          </Card>
        </Col>

        {/* Total Support */}
        <Col
          xs={24}
          sm={12}
          md={8}
          onClick={() => navigate("/admin-page/support")}
        >
          <Card style={cardStyle}>
            <Row justify="space-between" align="middle">
              <div>
                <Text type="secondary" style={{ fontWeight: 700 }}>
                  Total Support
                </Text>
                <Title level={3}>{dataAll.totalSupport}</Title>
                <div>
                  <LineOutlined style={{ color: "blue", marginRight: 4 }} />
                  <Text style={{ color: "blue", fontWeight: 700 }}>0% </Text>
                  <Text style={{ fontWeight: 500 }}>Stable from yesterday</Text>
                </div>
              </div>
              <Avatar
                style={{ backgroundColor: "#FFF1F0", color: "#FF4D4F" }}
                size={64}
                icon={<CustomerServiceOutlined style={{ fontSize: "32px" }} />}
              />
            </Row>
          </Card>
        </Col>

        {/* Total Hotels */}
        <Col
          xs={24}
          sm={12}
          md={8}
          onClick={() => navigate("/admin-page/product")}
        >
          <Card style={cardStyle}>
            <Row justify="space-between" align="middle">
              <div>
                <Text type="secondary" style={{ fontWeight: 700 }}>
                  Total Hotels
                </Text>
                <Title level={3}>{dataAll.totalHotel}</Title>
                <div>
                  <LineOutlined style={{ color: "blue", marginRight: 4 }} />
                  <Text style={{ color: "blue", fontWeight: 700 }}>0% </Text>
                  <Text style={{ fontWeight: 500 }}>Stable from yesterday</Text>
                </div>
              </div>
              <Avatar
                style={{ backgroundColor: "#E6F7FF", color: "#1890FF" }}
                size={64}
                icon={<ShopOutlined style={{ fontSize: "32px" }} />}
              />
            </Row>
          </Card>
        </Col>

        {/* Total Tours */}
        <Col
          xs={24}
          sm={12}
          md={8}
          onClick={() => navigate("/admin-page/product")}
        >
          <Card style={cardStyle}>
            <Row justify="space-between" align="middle">
              <div>
                <Text type="secondary" style={{ fontWeight: 700 }}>
                  Total Tours
                </Text>
                <Title level={3}>{dataAll.totalTour}</Title>
                <div>
                  <LineOutlined style={{ color: "blue", marginRight: 4 }} />
                  <Text style={{ color: "blue", fontWeight: 700 }}>0% </Text>
                  <Text style={{ fontWeight: 500 }}>Stable from yesterday</Text>
                </div>
              </div>
              <Avatar
                style={{ backgroundColor: "#F6FFED", color: "#52C41A" }}
                size={64}
                icon={<EnvironmentOutlined style={{ fontSize: "32px" }} />}
              />
            </Row>
          </Card>
        </Col>

        {/* Total Promotions */}
        <Col
          xs={24}
          sm={12}
          md={8}
          onClick={() => navigate("/admin-page/promotion")}
        >
          <Card style={cardStyle}>
            <Row justify="space-between" align="middle">
              <div>
                <Text type="secondary" style={{ fontWeight: 700 }}>
                  Total Promotions
                </Text>
                <Title level={3}>{dataAll.totalPromotion}</Title>
                <div>
                  <LineOutlined style={{ color: "blue", marginRight: 4 }} />
                  <Text style={{ color: "blue", fontWeight: 700 }}>0% </Text>
                  <Text style={{ fontWeight: 500 }}>Stable from yesterday</Text>
                </div>
              </div>
              <Avatar
                style={{ backgroundColor: "#FFF0F6", color: "#EB2F96" }}
                size={64}
                icon={<GiftOutlined style={{ fontSize: "32px" }} />}
              />
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-5">
              Booking details today
            </h2>
            <Table
              columns={columns}
              dataSource={dataAll.bookingsToday}
              pagination={false}
              bordered
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DashBoardPage;
