import React, { useEffect, useState } from "react";
import { Table, Modal, Dropdown, Menu, Space, Tabs, Popconfirm } from "antd";
import ModalTourPage from "./ModalTourPage";
import { DownOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchTour, setPagination } from "../../Redux/Slide/tourSlice";
import { apiDelete } from "../../API/APIService";
import ModalReviewTourPage from "./ModalReviewTourPage";

const TourPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [selected, setSelected] = useState();
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
    setSelected(product);
  };

  const openModalReview = (product) => {
    setIsModalReviewOpen(true);
    setSelected(product);
  };

  const filtersID = dataTour.map((item) => ({
    text: item._id.toString(),
    value: item._id.toString(),
  }));

  const filtersName = dataTour.map((item) => ({
    text: item.tourName.toString(),
    value: item.tourName.toString(),
  }));

  console.log(tours);

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

  const confirm = async (xxx) => {
    try {
      const response = await apiDelete(`delete-tour/${xxx._id}`);
      toast.success(response.message, {
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
        <button onClick={() => openModalReview(record)}>Review</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Popconfirm
          title="Delete the tour"
          description="Are you sure to delete this tour?"
          onConfirm={() => confirm(record)}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <button className="text-red-500">Delete</button>
        </Popconfirm>
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
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          <img
            src={record.imgTour.avatar}
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
      sorter: (a, b) => a.price - b.price,
      render: (text, record) => <div style={{ width: 80 }}>{record.price}</div>,
    },
    {
      title: "Start Date",
      dataIndex: "startDateBooking",
      key: "startDateBooking",
      sorter: (a, b) => a.startDateBooking - b.startDateBooking,
      render: (text, record) => (
        <div style={{ width: 80 }}>{record.startDateBooking.slice(0, 10)}</div>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDateBooking",
      key: "endDateBooking",
      sorter: (a, b) => a.endDateBooking - b.endDateBooking,
      render: (text, record) => (
        <div style={{ width: 80 }}>{record.endDateBooking.slice(0, 10)}</div>
      ),
    },
    {
      title: "Location",
      dataIndex: "inforLocation",
      render: (text, record) => {
        return record.inforLocation.destination.map((item, index) => (
          <div key={index} style={{ width: 100 }}>
            {index + 1} - {item}
          </div>
        ));
      },
    },
    {
      title: "Start Destination",
      dataIndex: "startDestination",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          {record.inforLocation.startDestination}
        </div>
      ),
    },
    {
      title: "End Destination",
      dataIndex: "endDestination",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.inforLocation.endDestination}</div>
      ),
    },
    {
      title: "Transportation Method",
      dataIndex: "transportationMethod",
      render: (text, record) =>
        record.transportationMethod.map((item, index) => (
          <div key={index} style={{ width: 100 }}>
            {index + 1} - {item}
          </div>
        )),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.duration}</div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <div style={{ width: 200 }}>
          <p style={truncateStyle}>{record.detailHotel}</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert(record.detailHotel);
            }}
          >
            Read more
          </a>
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (text, record) => {
        const { totalRating, count } = record.reviewId.reduce(
          (acc, item) => {
            acc.totalRating += parseInt(item.rating, 10) || 0;
            acc.count += 1;
            return acc;
          },
          { totalRating: 0, count: 0 }
        );

        const averageRating = count > 0 ? (totalRating / count).toFixed(2) : 0;

        return <div style={{ width: 150 }}>{averageRating}</div>;
      },
    },
    {
      title: "Review",
      dataIndex: "Review",
      render: (text, record) => (
        <div style={{ width: 150 }}>{record.reviewId.length}</div>
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
        dataSource={dataTour}
        rowKey="id"
        scroll={{ x: true }}
        // scroll={{ x: true, y: 950 }}
        // style={{ maxWidth: 1080 }}
        sticky={{ offsetHeader: 35 }} // Kích hoạt sticky cho Table Header
        rowClassName={(record) => {
          switch (record.status) {
            case "available":
              return;
            case "cancelled":
              return "bg-red-100";
            case "pending":
              return "bg-yellow-100";
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

      {isModalOpen && (
        <ModalTourPage openModal={setIsModalOpen} selected={selected} />
      )}
      {isModalReviewOpen && (
        <ModalReviewTourPage openModal={setIsModalReviewOpen} selected={selected} />
      )}
      <ToastContainer />
    </div>
  );
};

export default TourPage;
