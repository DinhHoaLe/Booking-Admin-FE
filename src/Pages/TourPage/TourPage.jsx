import React, { useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space, Tabs } from "antd";
import ModalProduct from "./ModalTourPage";
import { DownOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchTour, setPagination } from "../../Redux/Slide/tourSlice";

const TourPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [dataTour, setDataTour] = useState([]);
  const dispatch = useDispatch();
  const { tours, statusTour, errorTour, page, pageSize, total } = useSelector(
    (state) => state.tours
  );

  useEffect(() => {
    if (statusTour === "idle") {
      dispatch(fetchTour({ page, pageSize }));
    } else if (statusTour === "succeeded") {
      setDataTour(tours.data);
    }
  }, [dispatch, statusTour, page, pageSize]);

  console.log(dataTour);

  const handleTableChange = (pagination) => {
    const newPage = pagination.page;
    const newPageSize = pagination.pageSize;

    dispatch(setPagination({ page: newPage, pageSize: newPageSize }));
    dispatch(fetchTour({ page: newPage, pageSize: newPageSize }));
  };

  if (statusTour === "loading") return <p>Loading...</p>;
  if (statusTour === "failed") return <p>Error: {errorTour}</p>;

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const filtersID = dataTour.map((item) => ({
    text: item._id.toString(),
    value: item._id.toString(),
  }));

  const filtersName = dataTour.map((item) => ({
    text: item.tourName.toString(),
    value: item.tourName.toString(),
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

  // const truncateStyle = {
  //   display: "-webkit-box",
  //   WebkitLineClamp: 3,
  //   WebkitBoxOrient: "vertical",
  //   overflow: "hidden",
  //   textOverflow: "ellipsis",
  //   maxHeight: "calc(1.2em * 3)",
  //   lineHeight: "1.2em",
  // };

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
      dataIndex: "tourName",
      key: "tourName",
      fixed: "left",
      filters: filtersName,
      onFilter: (value, record) => record.tourName.indexOf(value) === 0,
      sorter: (a, b) => a.tourName.localeCompare(b.tourName),
      render: (text, record) => (
        <div style={{ width: 250 }}>{record.tourName}</div>
      ),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      onFilter: (value, record) => record.capacity.indexOf(value) === 0,
      sorter: (a, b) => a.capacity.localeCompare(b.capacity),
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.capacity}</div>
      ),
    },
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
    {
      title: "Price ( $ )",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => <div style={{ width: 80 }}>{record.price}</div>,
    },
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
        dataSource={dataTour}
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
        pagination={{
          pageSize: pageSize,
          current: page,
          total: total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />

      {isModalOpen && <ModalProduct openModal={setIsModalOpen} />}
      <ToastContainer />
    </div>
  );
};

export default TourPage;
