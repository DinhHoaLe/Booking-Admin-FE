import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  InputNumber,
  DatePicker,
} from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiPost, apiPostFormData } from "../../API/APIService";

const { Option } = Select;

const airPlaneName = [
  "Vietnam Airlines",
  "VietJet",
  "Jetstar Pacific",
  "Bamboo Airways",
];

const airDepartureAirport = [
  "Da Nang International Airport",
  "Cam Ranh International Airport",
  "Tan Son Nhat International Airport",
  "Can Tho International Airport",
  "Phu Bai International Airport",
  "Noi Bai International Airport",
];

const AddFlightPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const toastId = toast.loading("Creating...");
    try {
      // const formData = new FormData();

      console.log(values);
      const response = await apiPost("create-flight", values);

      toast.update(toastId, {
        render: "Flight created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
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
      <h1 className="text-2xl font-bold mb-4">Add Flight</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Airline Name"
              name="airlineName"
              rules={[
                { required: true, message: "Please input the airline name!" },
              ]}
            >
              <Select placeholder="Select Flight">
                {airPlaneName.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Flight Number"
              name="flightNumber"
              rules={[
                { required: true, message: "Please input the flightNumber!" },
              ]}
            >
              <Input placeholder="In put flightNumber" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Departure Airport"
              name="departureAirport"
              rules={[
                {
                  required: true,
                  message: "Please input the departure airport!",
                },
              ]}
            >
              <Select placeholder="Select Flight">
                {airDepartureAirport.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Destination Airport"
              name="destinationAirport"
              rules={[
                {
                  required: true,
                  message: "Please input the destination airport!",
                },
              ]}
            >
              <Select placeholder="Select Flight">
                {airDepartureAirport.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Departure Date"
              name="departureDate"
              rules={[
                {
                  required: true,
                  message: "Please select the departure date!",
                },
              ]}
            >
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Destination Date"
              name="destinationDate"
              rules={[
                {
                  required: true,
                  message: "Please select the destination date!",
                },
              ]}
            >
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Available Seats"
              name="availableSeats"
              rules={[
                {
                  required: true,
                  message: "Please input the available seats!",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#07689F]"
          >
            Save Flight
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddFlightPage;
