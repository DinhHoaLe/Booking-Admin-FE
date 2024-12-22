import React, { useState } from "react";
import { Modal, Input, Select, Form, InputNumber, DatePicker } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { apiPatch } from "../../API/APIService";
import { useNavigate } from "react-router-dom";

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

const ModalFlightPage = ({ openModal, selected }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleCancel = () => {
    openModal(false);
  };

  const handleOk = async () => {
    const toastId = toast.loading("Creating...");
    try {
      const values = await form.validateFields();

      const update = await apiPatch(`edit-flight/${selected._id}`, values);

      toast.update(toastId, {
        // Sử dụng toastId
        render: "Flight is updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        onClose: () => (navigate("/admin-page/product"), openModal(false)),
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.update(toastId, {
        render: "Something went wrong, please try again.",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return (
    <Modal
      title="Product Information"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }} // Kiểm soát chiều cao và cuộn dọc
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          airlineName: selected.airlineName,
          flightNumber: selected.flightNumber,
          price: selected.price,
          departureAirport: selected.departureAirport,
          destinationAirport: selected.destinationAirport,
          departureDate: moment(selected.departureDate),
          destinationDate: moment(selected.destinationDate),
          status: selected.status,
          availableSeats: selected.availableSeats,
        }}
      >
        <Form.Item label="Product ID">
          <Input value={selected._id} disabled />
        </Form.Item>

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

        <Form.Item
          label="Flight Number"
          name="flightNumber"
          rules={[
            { required: true, message: "Please input the flightNumber!" },
          ]}
        >
          <Input placeholder="In put flightNumber" />
        </Form.Item>

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
          <Select placeholder="Select airport">
            {airDepartureAirport.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

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
          <Select placeholder="Select airport">
            {airDepartureAirport.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

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

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

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

        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="scheduled">Scheduled</Select.Option>
            <Select.Option value="cancelled">Cancelled</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="delayed">Delayed</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      {/* <ToastContainer /> */}
    </Modal>
  );
};

export default ModalFlightPage;
