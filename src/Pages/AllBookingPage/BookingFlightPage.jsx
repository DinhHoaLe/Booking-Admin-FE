import React, { useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  setPagination,
  resetState,
  fetchBooking,
} from "../../Redux/Slide/bookingSlice";
import { apiDelete } from "../../API/APIService";
import ModelBookingFlightPage from "./ModelBookingFlightPage";

const BookingFlightPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  const { booking, status, error, page, pageSize, total } = useSelector(
    (state) => state.booking.flight
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooking({ page, pageSize, objectType: "flight" }));
    }
  }, [dispatch, status, page, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(resetState({ objectType: "flight" }));
    };
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const handleTableChange = (pagination) => {
    const newPage = pagination.current;
    const newPageSize = pagination.pageSize;

    dispatch(
      setPagination({
        page: newPage,
        pageSize: newPageSize,
      })
    );
    dispatch(
      fetchBooking({
        page: newPage,
        pageSize: newPageSize,
        objectType: "flight",
      })
    );
  };

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelected(product);
  };

  const openModalDetail = (record) => {
    const url = `/detail-flight-booking/${record._id}`;
    window.open(url, "_blank");
  };

  // const filtersID = bookingHotels.map((item) => ({
  //   text: item._id.toString(),
  //   value: item._id.toString(),
  // }));

  // const filtersName = bookingHotels.map((item) => ({
  //   text: item.hotelName.toString(),
  //   value: item.hotelName.toString(),
  // }));

  // const filtersCategory = [
  //   { text: "Hotel", value: "hotel" },
  //   { text: "Resort", value: "resort" },
  //   { text: "Homestay", value: "homestay" },
  // ];

  const truncateStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "calc(1.2em * 3)",
    lineHeight: "1.2em",
  };

  const delHotel = async (xxx) => {
    try {
      // toast.success(response, {
      //   position: "top-center",
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <button onClick={() => openModal(record)}>Edit</button>
      </Menu.Item>
      <Menu.Item key="1">
        <button onClick={() => openModalDetail(record)}>View</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <button onClick={() => delHotel(record)}>Delete</button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // filters: filtersID,
      fixed: "left",
      // width: 100,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div>{record._id}</div>,
    },
    {
      title: "Name",
      dataIndex: "hotelName",
      key: "hotelName",
      fixed: "left",
      // filters: filtersName,
      onFilter: (value, record) => record.hotelName.indexOf(value) === 0,
      sorter: (a, b) => a.hotelName.localeCompare(b.hotelName),
      render: (text, record) => <div>{record.objectId.airlineName}</div>,
    },
    {
      title: "Flight Number",
      dataIndex: "flightNumber",
      key: "flightNumber",
      // filters: filtersCategory,
      onFilter: (value, record) => record.flightNumber.indexOf(value) === 0,
      sorter: (a, b) => a.flightNumber.localeCompare(b.flightNumber),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.objectId.flightNumber}</div>
      ),
    },
    {
      title: "Departure Airport",
      dataIndex: "departureAirport",
      key: "departureAirport",
      // filters: filtersCategory,
      onFilter: (value, record) => record.departureAirport.indexOf(value) === 0,
      sorter: (a, b) => a.departureAirport.localeCompare(b.departureAirport),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.objectId.departureAirport}</div>
      ),
    },
    {
      title: "Departure Date",
      dataIndex: "departureDate",
      key: "departureDate",
      // filters: filtersCategory,
      onFilter: (value, record) => record.departureDate.indexOf(value) === 0,
      sorter: (a, b) => a.departureDate.localeCompare(b.departureDate),
      render: (text, record) => (
        <div style={{ width: 100 }}>
          {record.objectId.departureDate.slice(0, 10)}
        </div>
      ),
    },
    {
      title: "Destination Airport",
      dataIndex: "destinationAirport",
      key: "destinationAirport",
      // filters: filtersCategory,
      onFilter: (value, record) =>
        record.destinationAirport.indexOf(value) === 0,
      sorter: (a, b) =>
        a.destinationAirport.localeCompare(b.destinationAirport),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.objectId.destinationAirport}</div>
      ),
    },
    {
      title: "Destination Date",
      dataIndex: "destinationDate",
      key: "destinationDate",
      // filters: filtersCategory,
      onFilter: (value, record) => record.destinationDate.indexOf(value) === 0,
      sorter: (a, b) => a.destinationDate.localeCompare(b.destinationDate),
      render: (text, record) => (
        <div style={{ width: 100 }}>
          {record.objectId.destinationDate.slice(0, 10)}
        </div>
      ),
    },
    {
      title: "Price ( $ )",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => (
        <div style={{ width: 80 }}>{record.objectId.price}</div>
      ),
    },
    {
      title: "Contact Info",
      dataIndex: "contactInfo",
      key: "contactInfo",
      sorter: (a, b) => a.contactInfo - b.contactInfo,
      render: (text, record) => (
        <div>
          <div style={{ width: 200 }}>
            {" "}
            <span className="font-bold">Email : </span>{" "}
            {record.contactInfo.email}
          </div>
          <div style={{ width: 200 }}>
            {" "}
            <span className="font-bold">Name : </span> {record.contactInfo.name}
          </div>
          <div style={{ width: 200 }}>
            {" "}
            <span className="font-bold">Phone : </span>{" "}
            {record.contactInfo.phone}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
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
        dataSource={booking}
        rowKey="id"
        // scroll={{ x: true, y: 950 }}
        // style={{ maxWidth: 1080 }}
        scroll={{ x: true }}
        sticky={{ offsetHeader: 35 }}
        rowClassName={(record) => {
          switch (record.status) {
            case "active":
              return;
            case "inactive":
              return "bg-red-100";
            case "pending":
              return "bg-yellow-100";
            default:
              return "";
          }
        }}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
      {isModalOpen && (
        <ModelBookingFlightPage
          openModal={setIsModalOpen}
          selected={selected}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default BookingFlightPage;
