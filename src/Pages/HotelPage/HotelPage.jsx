import React, { useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space } from "antd";
import ModalProduct from "./ModalHotelPage";
import { DownOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setPagination, fetchHotel } from "../../Redux/Slide/hotelSlice";
import { apiDelete } from "../../API/APIService";

const HotelPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { hotels, statusHotels, errorHotels, total } = useSelector(
    (state) => state.hotels
  );

  useEffect(() => {
    // Gọi fetchHotel khi `pagination` thay đổi
    dispatch(
      fetchHotel({ page: pagination.current, pageSize: pagination.pageSize })
    );
  }, [dispatch, pagination]);

  if (statusHotels === "loading") return <p>Loading...</p>;
  if (statusHotels === "failed") return <p>Error: {errorHotels}</p>;

  const handleTableChange = (newPagination) => {
    const newPage = newPagination.current;
    const newPageSize = newPagination.pageSize;
    setPagination({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
    dispatch(fetchHotel({ page: newPage, pageSize: newPageSize }));
  };

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelected(product);
  };

  const filtersID = hotels.map((item) => ({
    text: item._id.toString(),
    value: item._id.toString(),
  }));

  const filtersName = hotels.map((item) => ({
    text: item.hotelName.toString(),
    value: item.hotelName.toString(),
  }));

  const filtersCategory = [
    { text: "Hotel", value: "hotel" },
    { text: "Resort", value: "resort" },
    { text: "Homestay", value: "homestay" },
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
      title: "Name",
      dataIndex: "hotelName",
      key: "hotelName",
      fixed: "left",
      filters: filtersName,
      onFilter: (value, record) => record.hotelName.indexOf(value) === 0,
      sorter: (a, b) => a.hotelName.localeCompare(b.hotelName),
      render: (text, record) => (
        <div style={{ width: 250 }}>{record.hotelName}</div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: filtersCategory,
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.category}</div>
      ),
    },
    {
      title: "Rooms",
      dataIndex: "availableRooms",
      key: "availableRooms",
      onFilter: (value, record) => record.availableRooms.indexOf(value) === 0,
      sorter: (a, b) => a.availableRooms.localeCompare(b.availableRooms),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.availableRooms}</div>
      ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          <img
            src={record.imgHotel.avatar}
            alt={record.title}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ),
    },
    {
      title: "Price ( $ )",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.priceAveragePerNight - b.priceAveragePerNight,
      render: (text, record) => (
        <div style={{ width: 80 }}>{record.priceAveragePerNight}</div>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      sorter: (a, b) => a.discount - b.discount,
      render: (text, record) => (
        <div style={{ width: 80 }}>{record.discount}</div>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.address.country}</div>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.address.city}</div>
      ),
    },
    {
      title: "District",
      dataIndex: "district",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.address.district}</div>
      ),
    },
    {
      title: "Ward",
      dataIndex: "ward",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.address.ward}</div>
      ),
    },
    {
      title: "Street",
      dataIndex: "street",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.address.street}</div>
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
        dataSource={hotels}
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
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
      {isModalOpen && (
        <ModalProduct openModal={setIsModalOpen} selected={selected} />
      )}
      <ToastContainer />
    </div>
  );
};

export default HotelPage;
