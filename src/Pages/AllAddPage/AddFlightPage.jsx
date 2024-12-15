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
import { apiPostFormData } from "../../API/APIService";

const { Option } = Select;

const AddFlightPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const toastId = toast.loading("Creating...");
    try {
      const formData = new FormData();
      formData.append("userId", values.userId);
      formData.append("tourId", values.tourId);
      formData.append("airlineName", values.airlineName);
      formData.append("availableSeats", values.availableSeats);
      formData.append("departureAirport", values.departureAirport);
      formData.append("destinationAirport", values.destinationAirport);
      formData.append("departureDate", values.departureDate);
      formData.append("destinationDate", values.destinationDate);
      formData.append("price", values.price);
      formData.append("status", values.status);

      const response = await apiPostFormData("create-flight", formData);

      if (response.ok) {
        toast.update(toastId, {
          render: "Flight created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate("/flights");
      } else {
        toast.update(toastId, {
          render: "Failed to create flight.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: "An error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
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
              label="User ID"
              name="userId"
              rules={[{ required: true, message: "Please input the user ID!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tour ID"
              name="tourId"
              rules={[{ required: true, message: "Please input the tour ID!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Airline Name"
              name="airlineName"
              rules={[
                { required: true, message: "Please input the airline name!" },
              ]}
            >
              <Input />
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
              <Input />
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
              <Input />
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
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select the status!" }]}
            >
              <Select>
                <Option value="scheduled">Scheduled</Option>
                <Option value="cancelled">Cancelled</Option>
                <Option value="completed">Completed</Option>
              </Select>
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
