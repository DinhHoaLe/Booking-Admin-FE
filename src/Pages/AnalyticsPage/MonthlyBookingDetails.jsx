import React, { useState } from "react";
import { Table, Tag, Typography, Button, Modal } from "antd";

const { Title } = Typography;

const MonthlyBookingDetails = ({ openModal, selected }) => {
  const handleCloseModal = () => {
    openModal(false);
  };

  console.log(selected.bookings);

  // Cột cho bảng chi tiết booking trong Modal
  const bookingColumns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Start Date",
      dataIndex: "bookingStartDate",
      key: "bookingStartDate",
      render: (text) => new Date(text).toLocaleString().slice(0, 9),
    },
    {
      title: "End Date",
      dataIndex: "bookingEndDate",
      key: "bookingEndDate",
      render: (text) => new Date(text).toLocaleString().slice(0, 9),
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => `$${text}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "completed" ? "green" : "orange"}>{text}</Tag>
      ),
    },
  ];

  return (
    <div>
      {/* Modal hiển thị chi tiết booking */}
      <Modal
        title="Booking Details"
        visible
        onCancel={handleCloseModal}
        footer={null}
        width={700}
      >
        <Table
          columns={bookingColumns}
          dataSource={selected.bookings}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </div>
  );
};

export default MonthlyBookingDetails;
