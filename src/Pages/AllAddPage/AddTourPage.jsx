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
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ImgCrop from "antd-img-crop";
import { apiPostFormData } from "../../API/APIService";

const { Option } = Select;

const AddTourPage = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [avatar, setAvatar] = useState([]);

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
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
      formData.append("avatar", avatar);
      formData.append("hotelName", values.hotelName);
      formData.append("address[street]", values.street);
      formData.append("address[ward]", values.ward);
      formData.append("address[district]", values.district);
      formData.append("address[city]", values.city);
      formData.append("address[country]", values.country);
      formData.append("phone", values.phone);
      formData.append("availableRooms", values.availableRooms);
      formData.append("priceAveragePerNight", values.priceAveragePerNight);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("star", values.star);
      formData.append("status", values.status);

      // Gửi dữ liệu tới BE
      const response = await apiPostFormData("create-hotel", formData);

      if (response.ok) {
        toast.update(toastId, {
          render: "Hotel created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "Failed to create hotel.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: "An error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Add Hotel</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tour Name"
              name="tourName"
              rules={[
                { required: true, message: "Please input the tour name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Start Date Booking"
              name="startDateBooking"
              rules={[
                { required: true, message: "Please select the start date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="End Date Booking"
              name="endDateBooking"
              rules={[
                { required: true, message: "Please select the end date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[
                { required: true, message: "Please input the capacity!" },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Duration"
              name="duration"
              rules={[
                { required: true, message: "Please input the duration!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Destination"
              name="startDestination"
              rules={[
                {
                  required: true,
                  message: "Please input the start destination!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End Destination"
              name="endDestination"
              rules={[
                {
                  required: true,
                  message: "Please input the end destination!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Destination"
              name="destination"
              rules={[
                { required: true, message: "Please input the destinations!" },
              ]}
            >
              <Select mode="tags" placeholder="Enter destinations">
                <Option value="destination1">Destination 1</Option>
                <Option value="destination2">Destination 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Travel Schedule"
              name="travelSchedule"
              rules={[
                {
                  required: true,
                  message: "Please input the travel schedule!",
                },
              ]}
            >
              <Select mode="tags" placeholder="Enter travel schedule">
                <Option value="schedule1">Schedule 1</Option>
                <Option value="schedule2">Schedule 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tour Restrictions" name="tourRestrictions">
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Transportation Method"
              name="transportationMethod"
            >
              <Select mode="tags" placeholder="Enter transportation methods">
                <Option value="bus">Bus</Option>
                <Option value="train">Train</Option>
                <Option value="flight">Flight</Option>
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
          <Col span={24}>
            <Form.Item label="Tour Images" name="listImg">
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={onPreview}
                  onChange={({ fileList: newFileList }) =>
                    setFileList(newFileList)
                  }
                  beforeUpload={() => false}
                >
                  {fileList.length < 10 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </ImgCrop>
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
            <Form.Item label="Avatar" name="avatar">
              <ImgCrop rotationSlider>
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
          <Button type="primary" htmlType="submit">
            Save Hotel
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddTourPage;
