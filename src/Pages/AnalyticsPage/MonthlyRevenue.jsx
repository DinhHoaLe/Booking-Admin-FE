import React, { useEffect, useState } from "react";
import { Table, Tag, Typography, Collapse, Button } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { downloadExcel } from "react-export-table-to-excel";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import MonthlyBookingDetails from "./MonthlyBookingDetails";

const { Title } = Typography;
const { Panel } = Collapse;

const MonthlyRevenue = () => {
  const location = useLocation();
  const monthlyRevenue = location.state?.monthlyRevenue;
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(false);

  const formattedData = monthlyRevenue.map((item, index) => ({
    key: index,
    monthYear: `${item._id.month}/${item._id.year}`,
    month: item._id.month,
    year: item._id.year,
    totalRevenue: item.totalRevenue,
    bookingCount: item.bookings.length,
    bookings: item.bookings,
  }));

  const handleViewDetails = (record) => {
    console.log("check");
    setSelected(record); // Lưu record đã chọn
    setModal(true); // Mở modal một lần
  };

  const columns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      sorter: (a, b) => a.month - b.month,
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Total Revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      sorter: (a, b) => a.totalRevenue - b.totalRevenue,
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Booking Details",
      dataIndex: "bookings",
      key: "bookings",
      align: "center",
      render: (bookings, record) => (
        <div style={{ textAlign: "center" }}>
          {/* Hiển thị tổng số booking */}
          <p>
            <b>Total Bookings:</b> {bookings.length}
          </p>

          {/* Nút xem chi tiết */}
          <Button
            type="primary"
            onClick={() => handleViewDetails(record)}
            style={{ marginTop: "8px" }}
          >
            View Details
          </Button>
        </div>
      ),
    },
  ];

  const exelMonthlyRevenue = (data) => {
    // const header = [
    //   "Month",
    //   "Year",
    //   "Total Revenue",
    //   "Booking ID",
    //   "User ID",
    //   "User Name",
    //   "Email",
    //   "Phone",
    //   "Room ID",
    //   "Start Date",
    //   "End Date",
    //   "Total Amount",
    //   "Status",
    //   "Special Requests",
    // ];

    const mapDataToHeader = (item) => {
      return item.bookings.map((booking) => ({
        Month: item.month,
        Year: item.year,
        "Total Revenue": item.totalRevenue,
        "Booking ID": booking._id,
        "User ID": booking.userId,
        "User Name": booking.contactInfo?.name || "N/A",
        Email: booking.contactInfo?.email || "N/A",
        Phone: booking.contactInfo?.phone || "N/A",
        "Room ID": booking.bookedRoomId || "N/A",
        "Start Date": booking.bookingStartDate
          ? new Date(booking.bookingStartDate).toLocaleString()
          : "N/A",
        "End Date": booking.bookingEndDate
          ? new Date(booking.bookingEndDate).toLocaleString()
          : "N/A",
        "Total Amount": booking.totalAmount || 0,
        Status: booking.status || "N/A",
        "Special Requests": booking.specialRequests || "None",
      }));
    };

    const sortedData = data.flatMap(mapDataToHeader);

    // Tạo workbook và worksheet
    const ws = XLSX.utils.json_to_sheet(sortedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BookingReport");

    // Xuất file Excel
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    const fileName = `Monthly_Booking_Report_${formattedDate}.xlsx`;

    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <Title level={2} className="text-center">
        Monthly Booking Report
      </Title>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button
          onClick={() => exelMonthlyRevenue(formattedData)}
          type="primary"
        >
          Export Excel
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={formattedData}
        pagination={{ pageSize: 5 }}
        bordered
        rowKey="key"
        summary={(pageData) => {
          const totalRevenue = pageData.reduce(
            (sum, record) => sum + record.totalRevenue,
            0
          );
          const totalBookings = pageData.reduce(
            (sum, record) => sum + record.bookingCount,
            0
          );
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}>
                  <b>Total</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <b>${totalRevenue.toFixed(2)}</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="center">
                  <b>Total Bookings: {totalBookings}</b>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
      {modal && selected && (
        <MonthlyBookingDetails selected={selected} openModal={setModal} />
      )}
    </div>
  );
};

export default MonthlyRevenue;
