import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import { apiGet } from "../../API/APIService";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const AnalyticsPage = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [bookingMonthlyData, setBookingMonthlyData] = useState([]);
  const [productRevenueData, setProductRevenueData] = useState([]);
  const navigate = useNavigate();

  const [monthlyDataDetail, setMonthlyDataDetail] = useState([]);
  // const [dailyData, setDailyData] = useState([]);
  // const [bookingMonthlyData, setBookingMonthlyData] = useState([]);
  // const [productRevenueData, setProductRevenueData] = useState([]);

  console.log(monthlyData);
  const configMonthly = {
    data: monthlyData,
    xField: "month",
    yField: "totalRevenue",
    point: { size: 5, shape: "circle" },
    tooltip: {
      formatter: (datum) => ({
        name: "Revenue",
        value: `$${datum.totalRevenue}`,
      }),
    },
    smooth: true,
    area: { style: { fillOpacity: 0.1 } },
  };

  const configMonthlyBooking = {
    data: bookingMonthlyData,
    xField: "id", // Sử dụng id làm trục X
    yField: "totalBookings", // Tổng số bookings là trục Y
    point: { size: 5, shape: "circle" },
    tooltip: {
      formatter: (datum) => ({
        name: "Bookings",
        value: `${datum.totalBookings} bookings`,
      }),
    },
    smooth: true,
    area: { style: { fillOpacity: 0.1 } },
    yAxis: { title: { text: "Total Bookings" } },
    xAxis: { title: { text: "ID" } },
  };

  const configDaily = {
    data: dailyData,
    xField: "day", // Trục X: Ngày
    yField: "totalRevenue", // Trục Y: Doanh thu
    point: { size: 5, shape: "circle" },
    tooltip: {
      formatter: (datum) => ({
        name: "Revenue",
        value: `$${datum.totalRevenue.toFixed(2)}`,
      }),
    },
    smooth: true, // Làm mịn đường
    area: { style: { fillOpacity: 0.1 } },
    yAxis: { title: { text: "Total Revenue" } },
    xAxis: { title: { text: "Date" } },
  };

  const configProductRevenue = {
    data: productRevenueData,
    xField: "id", // Trục X: ID sản phẩm
    yField: "productRevenue", // Trục Y: Doanh thu sản phẩm
    point: { size: 5, shape: "circle" },
    tooltip: {
      formatter: (datum) => ({
        name: "Revenue",
        value: `$${datum.productRevenue}`,
      }),
    },
    smooth: true, // Làm mịn đường
    area: { style: { fillOpacity: 0.1 } },
    yAxis: { title: { text: "Product Revenue" } },
    xAxis: { title: { text: "Product ID" } },
  };

  const fetchMonthlyData = async () => {
    try {
      const monthly = await apiGet("revenue/monthly");
      setMonthlyDataDetail(monthly);
      const transformedData = monthly.map((item) => ({
        month: `${new Date(item._id.year, item._id.month - 1).toLocaleString(
          "en-US",
          {
            month: "short",
          }
        )} ${item._id.year}`,
        totalRevenue: item.totalRevenue,
      }));
      setMonthlyData(transformedData);
    } catch (error) {
      console.error("Error fetching monthly data:", error);
    }
  };

  const fetchDailyData = async () => {
    try {
      const response = await apiGet("revenue/daily");
      setDailyData(response);
    } catch (error) {
      console.error("Error fetching daily revenue data:", error);
    }
  };

  const fetchBookingMonthlyData = async () => {
    try {
      const response = await apiGet("revenue/booking-product-monthly");
      const transformedData = response.map((item) => ({
        id: item._id.slice(-4), // Lấy 4 ký tự cuối cùng của _id
        totalBookings: item.totalBookings || 0,
        productRevenue: item.productRevenue || 0,
      }));
      setBookingMonthlyData(transformedData);
      setProductRevenueData(transformedData);
    } catch (error) {
      console.error("Error fetching booking monthly data:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyData();
    fetchDailyData();
    fetchBookingMonthlyData();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Monthly Revenue */}
        <div className="p-4 bg-white rounded-md shadow-md">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
            <Button
              onClick={() =>
                navigate("monthly-revenue", {
                  state: { monthlyRevenue: monthlyDataDetail },
                })
              }
            >
              Detail
            </Button>
          </div>
          <Line {...configMonthly} />
        </div>

        {/* Daily Revenue */}
        <div className="p-4 bg-white rounded-md shadow-md">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Daily Revenue</h2>
            <Button onClick={() => navigate("daily-revenue")}>Detail</Button>
          </div>
          <Line {...configDaily} />
        </div>

        {/* Monthly Booking */}
        <div className="p-4 bg-white rounded-md shadow-md">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Monthly Booking</h2>
            <Button onClick={() => navigate("monthly-booking")}>Detail</Button>
          </div>
          <Line {...configMonthlyBooking} />
        </div>

        {/* Product Revenue */}
        <div className="p-4 bg-white rounded-md shadow-md">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Product Revenue</h2>
            <Button onClick={() => navigate("product-revenue")}>Detail</Button>
          </div>
          <Line {...configProductRevenue} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
