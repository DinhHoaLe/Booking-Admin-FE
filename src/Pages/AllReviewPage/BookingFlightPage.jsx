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
      // filters: filtersID,
      fixed: "left",
      // width: 100,
      onFilter: (value, record) => record.id.toString().indexOf(value) === 0,
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => <div>{record._id}</div>,
    },
    // {
    //   title: "Name",
    //   dataIndex: "hotelName",
    //   key: "hotelName",
    //   fixed: "left",
    //   // filters: filtersName,
    //   onFilter: (value, record) => record.hotelName.indexOf(value) === 0,
    //   sorter: (a, b) => a.hotelName.localeCompare(b.hotelName),
    //   render: (text, record) => (
    //     <div style={{ width: 250 }}>{record.hotelName}</div>
    //   ),
    // },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    //   // filters: filtersCategory,
    //   onFilter: (value, record) => record.category.indexOf(value) === 0,
    //   sorter: (a, b) => a.category.localeCompare(b.category),
    //   render: (text, record) => (
    //     <div style={{ width: 100 }}>{record.category}</div>
    //   ),
    // },
    // {
    //   title: "Available Rooms",
    //   dataIndex: "availableRooms",
    //   key: "availableRooms",
    //   // filters: filtersCategory,
    //   onFilter: (value, record) => record.availableRooms.indexOf(value) === 0,
    //   sorter: (a, b) => a.availableRooms.localeCompare(b.availableRooms),
    //   render: (text, record) => (
    //     <div style={{ width: 100 }}>{record.availableRooms}</div>
    //   ),
    // },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (text, record) => (
    //     <div style={{ width: 100 }}>
    //       <img
    //         src={record.imgHotel}
    //         alt={record.title}
    //         style={{ width: "100px", height: "100px" }}
    //       />
    //     </div>
    //   ),
    // },
    // {
    //   title: "Price ( $ )",
    //   dataIndex: "price",
    //   key: "price",
    //   sorter: (a, b) => a.priceAveragePerNight - b.priceAveragePerNight,
    //   render: (text, record) => (
    //     <div style={{ width: 80 }}>{record.priceAveragePerNight}</div>
    //   ),
    // },
    // {
    //   title: "Discount",
    //   dataIndex: "discount",
    //   key: "discount",
    //   sorter: (a, b) => a.discount - b.discount,
    //   render: (text, record) => (
    //     <div style={{ width: 80 }}>{record.discount}</div>
    //   ),
    // },
    // {
    //   title: "City",
    //   dataIndex: "city",
    //   render: (text, record) => (
    //     <div style={{ width: 100 }}>{record.address.city}</div>
    //   ),
    // },
    // {
    //   title: "District",
    //   dataIndex: "district",
    //   render: (text, record) => (
    //     <div style={{ width: 100 }}>{record.address.district}</div>
    //   ),
    // },
    // {
    //   title: "Ward",
    //   dataIndex: "ward",
    //   render: (text, record) => (
    //     <div style={{ width: 100 }}>{record.address.ward}</div>
    //   ),
    // },
    // {
    //   title: "Street",
    //   dataIndex: "street",
    //   render: (text, record) => (
    //     <div style={{ width: 100 }}>{record.address.street}</div>
    //   ),
    // },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record) => (
    //     <div style={{ width: 200 }}>
    //       <p style={truncateStyle}>{record.detailHotel}</p>
    //       <a
    //         href="#"
    //         onClick={(e) => {
    //           e.preventDefault();
    //           alert(record.detailHotel);
    //         }}
    //       >
    //         Read more
    //       </a>
    //     </div>
    //   ),
    // },
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

export default BookingFlightPage;
