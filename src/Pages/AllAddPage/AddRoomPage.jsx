import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  InputNumber,
  Upload,
  Image,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import ImgCrop from "antd-img-crop";
import { apiPostFormData } from "../../API/APIService";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllHotel } from "../../Redux/Slide/allHotelSlice";

const { Option } = Select;

const listRoomName = [
  "standard room",
  "executive room",
  "family room",
  "penthouse",
];

const listRoomType = [
  "single",
  "double",
  "twin",
  "triple",
  "family",
  "doom",
  "suite",
];

const AddRoomPage = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [avatar, setAvatar] = useState([]);
  const dispatch = useDispatch();
  const { allHotels, statusAllHotels, errorAllHotels } = useSelector(
    (state) => state.allHotels
  );

  useEffect(() => {
    if (statusAllHotels === "idle") {
      dispatch(fetchAllHotel());
    }
  }, [statusAllHotels, dispatch]);

  if (statusAllHotels === "loading") return <p>Loading...</p>;
  if (statusAllHotels === "error") return <p>{errorAllHotels.message}</p>;

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src='${src}' style="max-width: 100%;"/>`);
  };

  const onFinish = async (values) => {
    const toastId = toast.loading("Creating...");
    try {
      console.log(values);
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
      formData.append("avatar", avatar[0].originFileObj || avatar[0]);
      formData.append("roomName", values.roomName);
      formData.append("roomType", values.roomType);
      formData.append("availableRoom", values.availableRoom);
      formData.append("maxOccupancy", values.maxOccupancy);
      formData.append("pricePerNight", values.pricePerNight);
      formData.append("description", values.description);
      formData.append("amenities", values.amenities);
      formData.append("dimensions", values.dimensions);
      formData.append("hotelId", values.hotelId);

      const response = await apiPostFormData("create-room", formData);

      toast.update(toastId, {
        // Sử dụng toastId
        render: "Room created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: "An error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Add Room</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Hotel Name"
              name="hotelId"
              rules={[
                { required: true, message: "Please select the hotel Name!" },
              ]}
            >
              <Select placeholder="Select Hotel">
                {allHotels.map((item, index) => (
                  <Option key={index} value={item._id}>
                    {item.hotelName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Room Name"
              name="roomName"
              rules={[
                { required: true, message: "Please input the room name!" },
              ]}
            >
              <Select placeholder="Select Room Name">
                {listRoomName.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Room Type"
              name="roomType"
              rules={[
                { required: true, message: "Please select the room type!" },
              ]}
            >
              <Select placeholder="Select Room Name">
                {listRoomType.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price Per Night"
              name="pricePerNight"
              rules={[
                {
                  required: true,
                  message: "Please input the price per night!",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Available Rooms"
              name="availableRoom"
              rules={[
                {
                  required: true,
                  message: "Please input the number of available rooms!",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Max Occupancy"
              name="maxOccupancy"
              rules={[
                {
                  required: true,
                  message: "Please input the maximum occupancy!",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Dimensions" name="dimensions">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Amenities" name="amenities">
              <Select mode="tags" placeholder="Enter amenities">
                <Option value="Wifi">Wi-Fi</Option>
                <Option value="Shower">Shower</Option>
                <Option value="Balcony">Balcony</Option>
                <Option value="Television">Television</Option>
                <Option value="Air Conditioning">Air Conditioning</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={4}>
            <Form.Item
              label={
                <div>
                  <span className="text-red-500">* </span>
                  <span>Avatar</span>
                </div>
              }
              name="avatar"
              rules={[
                {
                  validator: (_, value) => {
                    // Kiểm tra nếu danh sách file (avatar) trống
                    if (avatar.length === 0) {
                      return Promise.reject(
                        new Error("Please upload an avatar!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <ImgCrop
                rotationSlider
                modalWidth={1000}
                aspect={1}
                grid
                zoom={true} // Cho phép người dùng phóng to/thu nhỏ ảnh
                cropperProps={{
                  style: {
                    width: "1000px", // Tăng kích thước vùng crop
                    height: "500px",
                  },
                }}
              >
                <Upload
                  listType="picture-card"
                  fileList={avatar} // Sử dụng state avatar
                  maxCount={1} // Chỉ cho phép tải lên 1 ảnh
                  onPreview={onPreview}
                  onChange={({ fileList }) => setAvatar(fileList)} // Cập nhật fileList
                  beforeUpload={() => false} // Ngăn chặn tải lên ngay lập tức
                >
                  {avatar.length === 0 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </ImgCrop>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Picture" name="picture">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={({ fileList: newFileList }) =>
                  setFileList(newFileList)
                }
                beforeUpload={(file) => {
                  setFileList([...fileList, file]);
                  return false;
                }}
              >
                {fileList.length >= 10 ? null : uploadButton}
              </Upload>
            </Form.Item>

            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#07689F]"
          >
            Save Room
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddRoomPage;
