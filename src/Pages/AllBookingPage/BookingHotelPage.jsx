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

const BookingHotelPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();

  const { booking, status, error, page, pageSize, total } = useSelector(
    (state) => state.booking.hotel
  );

  console.log(booking);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooking({ page, pageSize, objectType: "hotel" }));
    }
  }, [dispatch, status, page, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(resetState({ objectType: "hotel" }));
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
        objectType: "hotel",
      })
    );
  };

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelected(product);
  };

  const filtersID = booking.map((item) => ({
    text: item._id.toString(),
    value: item._id.toString(),
  }));

  const filtersName = booking.map((item) => ({
    text: item.objectId.hotelName.toString(),
    value: item.objectId.hotelName.toString(),
  }));

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
      const response = await apiDelete(`delete-hotel/${xxx._id}`);
      toast.success(response, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
        <button onClick={() => openModal(record)}>View</button>
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
      filters: filtersID,
      fixed: "left",
      // width: 100,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div>{record._id}</div>,
    },
    {
      title: "Hotel Info",
      dataIndex: "hotelName",
      key: "hotelName",
      filters: filtersName,
      onFilter: (value, record) =>
        record.objectId.hotelName.indexOf(value) === 0,
      sorter: (a, b) =>
        a.objectId.hotelName.localeCompare(b.objectId.hotelName),
      render: (text, record) => (
        <div style={{ width: 250 }}>
          <div>
            <span className="font-bold">Name : </span>
            {record.objectId.hotelName}
          </div>

          <div>
            <span className="font-bold">Address : </span>
            {record.objectId.address.street} Street,{" "}
            {record.objectId.address.ward} Ward,{" "}
            {record.objectId.address.district} District,{" "}
            {record.objectId.address.city} City
          </div>
          <div>
            <span className="font-bold">Phone : </span>
            {record.objectId.phone}
          </div>
          <div>
            <span className="font-bold">Category : </span>
            {record.objectId.category}
          </div>
        </div>
      ),
    },
    {
      title: "Room Info ",
      dataIndex: "roomName",
      key: "roomName",
      filters: filtersName,
      onFilter: (value, record) =>
        record.objectId.hotelName.indexOf(value) === 0,
      sorter: (a, b) =>
        a.objectId.hotelName.localeCompare(b.objectId.hotelName),
      render: (_, record) => {
        return record.bookedRoomId.map((item2, index) => (
          <div key={index} className="w-48">
            <div>
              <span className="font-bold">Name : </span>
              {item2.roomName}
            </div>
            <div>
              <span className="font-bold">Type : </span>
              {item2.roomType}
            </div>
            <div>
              <span className="font-bold">Price ($) : </span>
              {item2.pricePerNight}
            </div>
            <div>
              <span className="font-bold">Max Occupancy : </span>
              {item2.maxOccupancy}
            </div>
          </div>
        ));
      },
    },
    // {
    //   title: "Contact Info",
    //   dataIndex: "roomName",
    //   key: "roomName",
    //   filters: filtersName,
    //   onFilter: (value, record) =>
    //     record.objectId.hotelName.indexOf(value) === 0,
    //   sorter: (a, b) =>
    //     a.objectId.hotelName.localeCompare(b.objectId.hotelName),
    //   render: (_, record) => {
    //     return (
    //       <div>
    //         <div>
    //           <span className="font-bold">Email : </span>
    //           {record.contactInfo.email}
    //         </div>
    //         <div>
    //           <span className="font-bold">Name : </span>
    //           {record.contactInfo.name}
    //         </div>
    //         <div>
    //           <span className="font-bold">Phone : </span>
    //           {record.contactInfo.phone}
    //         </div>
    //       </div>
    //     );
    //   },
    // },
    {
      title: "User Info",
      dataIndex: "roomName",
      key: "roomName",
      filters: filtersName,
      onFilter: (value, record) =>
        record.objectId.hotelName.indexOf(value) === 0,
      sorter: (a, b) =>
        a.objectId.hotelName.localeCompare(b.objectId.hotelName),
      render: (_, record) => {
        return (
          <div>
            <div>
              <span className="font-bold">Email : </span>
              {record.userId.email}
            </div>
            <div>
              <span className="font-bold">Name : </span>
              {record.userId.firstName} {record.userId.lastName}
            </div>
            <div>
              <span className="font-bold">Phone : </span>
              {record.userId.phone}
            </div>
          </div>
        );
      },
    },
    {
      title: "Booking Info",
      dataIndex: "roomName",
      key: "roomName",
      filters: filtersName,
      onFilter: (value, record) =>
        record.objectId.hotelName.indexOf(value) === 0,
      sorter: (a, b) =>
        a.objectId.hotelName.localeCompare(b.objectId.hotelName),
      render: (_, record) => {
        return (
          <div className="w-60">
            <div>
              <span className="font-bold">Persons : </span>
              {record.totalPersons}
            </div>
            <div>
              <span className="font-bold">Check In : </span>
              {record.bookingStartDate.slice(0, 10)}
            </div>
            <div>
              <span className="font-bold">Check Out : </span>
              {record.bookingEndDate.slice(0, 10)}
            </div>
          </div>
        );
      },
    },
    {
      title: "Payment Info",
      dataIndex: "roomName",
      key: "roomName",
      filters: filtersName,
      onFilter: (value, record) =>
        record.objectId.hotelName.indexOf(value) === 0,
      sorter: (a, b) =>
        a.objectId.hotelName.localeCompare(b.objectId.hotelName),
      render: (_, record) => {
        return (
          <div className="w-52">
            <div>
              <span className="font-bold"> Payment Method : </span>
              {record.paymentId.paymentMethod}
            </div>
            <div>
              <span className="font-bold">Price : </span>
              {record.paymentId.amount}
            </div>
            <div>
              <span className="font-bold">Status : </span>
              {record.paymentId.status}
            </div>
          </div>
        );
      },
    },
    {
      title: "Total Amount ( $ )",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (text, record) => (
        <div style={{ width: 150, fontWeight: 700 }}>{record.totalAmount}</div>
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
        scroll={{ x: true, y: 950 }}
        // style={{ maxWidth: 1080 }}
        sticky
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
      {/* {isModalOpen && (
        <ModalProduct openModal={setIsModalOpen} selected={selected} />
      )} */}
      <ToastContainer />
    </div>
  );
};

export default BookingHotelPage;
