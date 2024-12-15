import React, { useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import ModalProduct from "./ModalHotelPage";
import { DownOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchHotel } from "../../Redux/Slide/hotelSlice";
import { fetchAddress } from "../../Redux/Slide/addressSlice";
import { fetchFlight } from "../../Redux/Slide/flightSlice";

const FlightPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [dataFlight, setDataFlight] = useState([]);
  const dispatch = useDispatch();
  const { flights, statusFlights, errorFlights } = useSelector(
    (state) => state.flights
  );

  useEffect(() => {
    if (statusFlights === "idle") {
      dispatch(fetchFlight());
    } else if (statusFlights === "succeeded") {
      setDataFlight(flights.data);
    }
  }, [dispatch, statusFlights]);

  if (statusFlights === "loading") return <p>Loading...</p>;
  if (statusFlights === "failed") return <p>Error: {errorFlights}</p>;

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelected(product);
  };

  const filtersID = dataFlight.map((item) => ({
    text: item._id.toString(),
    value: item._id.toString(),
  }));

  const filtersName = dataFlight.map((item) => ({
    text: item.airlineName.toString(),
    value: item.airlineName.toString(),
  }));

  // const filtersCategory = [
  //   { text: "Hotel", value: "hotel" },
  //   { text: "Resort", value: "resort" },
  //   { text: "Homestay", value: "homestay" },
  // ];

  const filtersStatus = [
    { text: "Available", value: "available" },
    { text: "Out of stock", value: "out_of_stock" },
    { text: "Discontinued", value: "discontinued" },
    { text: "Pre order", value: "pre_order" },
  ];

  const truncateStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "calc(1.2em * 3)",
    lineHeight: "1.2em",
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        {/* <button onClick={() => delProduct(record)}>Delete</button> */}
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      filters: filtersID,
      fixed: "left",
      // width: 100,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div>{record._id}</div>,
    },
    {
      title: "Name",
      dataIndex: "airlineName",
      key: "airlineName",
      fixed: "left",
      filters: filtersName,
      onFilter: (value, record) => record.airlineName.indexOf(value) === 0,
      sorter: (a, b) => a.airlineName.localeCompare(b.airlineName),
      render: (text, record) => (
        <div style={{ width: 250 }}>{record.airlineName}</div>
      ),
    },
    {
      title: "Departure Airport",
      dataIndex: "departureAirport",
      key: "departureAirport",
      onFilter: (value, record) => record.departureAirport.indexOf(value) === 0,
      sorter: (a, b) => a.departureAirport.localeCompare(b.departureAirport),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.departureAirport}</div>
      ),
    },
    {
      title: "Departure Date",
      dataIndex: "departureDate",
      key: "departureDate",
      onFilter: (value, record) => record.departureDate.indexOf(value) === 0,
      sorter: (a, b) => a.departureDate.localeCompare(b.departureDate),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.departureDate.slice(0, 10)}</div>
      ),
    },
    {
      title: "Destination Airport ",
      dataIndex: "destinationAirport",
      key: "destinationAirport",
      onFilter: (value, record) =>
        record.destinationAirport.indexOf(value) === 0,
      sorter: (a, b) =>
        a.destinationAirport.localeCompare(b.destinationAirport),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.destinationAirport}</div>
      ),
    },
    {
      title: "Destination Date",
      dataIndex: "destinationDate",
      key: "destinationDate",
      onFilter: (value, record) => record.destinationDate.indexOf(value) === 0,
      sorter: (a, b) => a.destinationDate.localeCompare(b.destinationDate),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.destinationDate.slice(0, 10)}</div>
      ),
    },
    {
      title: "Price ( $ )",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => <div style={{ width: 80 }}>{record.price}</div>,
    },
    {
      title: "Seat",
      dataIndex: "availableSeats",
      key: "availableSeats",
      sorter: (a, b) => a.availableSeats - b.availableSeats,
      render: (text, record) => (
        <div style={{ width: 80 }}>{record.availableSeats}</div>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filters: filtersStatus,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.status}</div>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <a href="#">
            <Space>
              Action
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataFlight}
        rowKey="id"
        scroll={{ x: true, y: 950 }}
        // style={{ maxWidth: 1080 }}
        sticky
        rowClassName={(record) => {
          switch (record.status) {
            case "available":
              return;
            case "out_of_stock":
              return "bg-red-100";
            case "discontinued":
              return "bg-yellow-100";
            case "pre_order":
              return "bg-gray-100";
            default:
              return "";
          }
        }}
      />
      {isModalOpen && <ModalProduct openModal={setIsModalOpen} />}
      <ToastContainer />
    </div>
  );
};

export default FlightPage;
