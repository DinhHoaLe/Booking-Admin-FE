import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Dropdown,
  Menu,
  Space,
  Form,
  Select,
  Popconfirm,
} from "antd";
import ModalRoomPage from "./ModalRoomPage";
import { DownOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllHotel } from "../../Redux/Slide/allHotelSlice";
import { apiDelete, apiGet } from "../../API/APIService";

const { Option } = Select;

const RoomPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [filterRooms, setFilterRooms] = useState([]);
  const dispatch = useDispatch();

  const { allHotels, statusAllHotels, errorAllHotels } = useSelector(
    (state) => state.allHotels
  );

  useEffect(() => {
    if (statusAllHotels === "idle") {
      dispatch(fetchAllHotel());
    }
  }, [dispatch, statusAllHotels]);

  if (statusAllHotels === "loading") return <p>Loading...</p>;
  if (statusAllHotels === "failed") return <p>Error: {errorAllHotels}</p>;

  // const handleTableChange = (pagination) => {
  // const newPage = pagination.current;
  // const newPageSize = pagination.pageSize;
  // dispatch(setPagination({ page: newPage, pageSize: newPageSize }));
  // dispatch(fetchHotel({ page: newPage, pageSize: newPageSize }));
  // };

  const handleRooms = async (value) => {
    try {
      const response = await apiGet("get-room-by-hotelId", { hotelId: value });

      if (Array.isArray(response.data)) {
        setFilterRooms(response.data);
      } else {
        setFilterRooms([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelected(product);
  };

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
      const response = await apiDelete(`delete-room/${xxx._id}`);
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
        <button onClick={() => openModal(record)}>View</button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <Popconfirm
          title="Delete the room"
          description="Are you sure to delete this room?"
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
      // filters: filtersID,
      fixed: "left",
      // width: 100,
      onFilter: (value, record) => record._id.toString().indexOf(value) === 0,
      sorter: (a, b) => a._id - b._id,
      render: (text, record) => <div>{record._id}</div>,
    },
    {
      title: "Name",
      dataIndex: "roomName",
      key: "roomName",
      fixed: "left",
      onFilter: (value, record) => record.roomName.indexOf(value) === 0,
      sorter: (a, b) => a.roomName.localeCompare(b.roomName),
      render: (text, record) => (
        <div style={{ width: 250 }}>{record.roomName}</div>
      ),
    },
    {
      title: "Type",
      dataIndex: "roomType",
      key: "roomType",
      onFilter: (value, record) => record.roomType.indexOf(value) === 0,
      sorter: (a, b) => a.roomType.localeCompare(b.roomType),
      render: (text, record) => (
        <div style={{ width: 250 }}>{record.roomType}</div>
      ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record) => (
        <div style={{ width: 100 }}>
          <img
            src={record.imgRoom.avatar}
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
      sorter: (a, b) => a.pricePerNight - b.pricePerNight,
      render: (text, record) => (
        <div style={{ width: 80 }}>{record.pricePerNight}</div>
      ),
    },
    {
      title: "Available Room",
      dataIndex: "availableRoom",
      key: "availableRoom",
      sorter: (a, b) => a.availableRoom - b.availableRoom,
      render: (text, record) => (
        <div style={{ width: 80 }}>
          {record.availableRoom ? "available" : "fix"}
        </div>
      ),
    },
    {
      title: "Max Occupancy",
      dataIndex: "maxOccupancy",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.maxOccupancy}</div>
      ),
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      render: (text, record) => {
        return record.amenities.map((item, index) => (
          <div key={index} style={{ width: "150px" }}>
            - {item}
          </div>
        ));
      },
    },
    {
      title: "Dimensions",
      dataIndex: "dimensions",
      render: (text, record) => (
        <div style={{ width: 100 }}>{record.dimensions}</div>
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
      <Form layout="vertical" className="sticky top-11 z-50">
        <Form.Item>
          <Select onChange={handleRooms} placeholder="Select Hotel">
            <Option value="">Select Room</Option>
            {allHotels.map((item, index) => (
              <Option key={index} value={item._id}>
                {item.hotelName} - {item._id}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={filterRooms}
        scroll={{ x: true }}
        // scroll={{ x: true, y: 950 }}
        // style={{ maxWidth: 1080 }}
        sticky={{ offsetHeader: 80 }} // Kích hoạt sticky cho Table Header
        rowClassName={(record) => {
          switch (record.status) {
            case "available":
              return;
            case "unavailable":
              return "bg-red-100";
            case "occupied":
              return "bg-yellow-100";
            default:
              return "";
          }
        }}
        // pagination={{
        //   current: page,
        //   pageSize: pageSize,
        //   total: total,
        //   showSizeChanger: true,
        // }}
        // onChange={handleTableChange}
      />
      {isModalOpen && (
        <ModalRoomPage openModal={setIsModalOpen} selected={selected} />
      )}
      <ToastContainer />
    </div>
  );
};

export default RoomPage;
