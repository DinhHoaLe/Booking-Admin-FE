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

      if (fileList) {
        fileList.forEach((file) => {
          formData.append("files", file.originFileObj);
        });
      }

      formData.append("avatar", avatar[0].originFileObj);
      formData.append("tourName", values.tourName);
      formData.append("tourCode", values.tourCode);
      formData.append("startDateBooking", values.startDateBooking);
      formData.append("endDateBooking", values.endDateBooking);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("capacity", values.capacity);
      formData.append("duration", values.duration);

      formData.append(
        "inforLocation[startDestination]",
        values.startDestination
      );
      formData.append("inforLocation[endDestination]", values.endDestination);
      values.destination.forEach((item) => {
        formData.append("inforLocation[destination][]", item);
      });

      values.transportationMethod.forEach((item) => {
        formData.append("transportationMethod[]", item);
      });

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await apiPostFormData("create-tour", formData);

      toast.update(toastId, {
        render: "Tour is created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        onClose : navigate("/admin-page/product")
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
      <h1 className="text-2xl font-bold mb-4">Add Tour</h1>
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
              label="Tour code"
              name="tourCode"
              rules={[
                { required: true, message: "Please input the tour code!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDateBooking"
              rules={[
                { required: true, message: "Please select the start date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End Date"
              name="endDateBooking"
              rules={[
                { required: true, message: "Please select the end date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
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
              <Select placeholder="Enter destinations">
                <Option value="Hà Nội">TP Hà Nội</Option>
                <Option value="SaPa">SaPa</Option>
                <Option value="Cà Mau">Cà Mau</Option>
                <Option value="Đà Lạt">Đà Lạt</Option>
                <Option value="TP Hồ Chí Minh">TP Hồ Chí Minh</Option>
                <Option value="TP Đà Nẵng">TP Đà Nẵng</Option>
                <Option value="Hạ Long">Hạ Long</Option>
                <Option value="Nha Trang">Nha Trang</Option>
                <Option value="Phan Thiết">Phan Thiết</Option>
              </Select>
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
              <Select placeholder="Enter destinations">
                <Option value="Hà Nội">TP Hà Nội</Option>
                <Option value="SaPa">SaPa</Option>
                <Option value="Cà Mau">Cà Mau</Option>
                <Option value="Đà Lạt">Đà Lạt</Option>
                <Option value="TP Hồ Chí Minh">TP Hồ Chí Minh</Option>
                <Option value="TP Đà Nẵng">TP Đà Nẵng</Option>
                <Option value="Hạ Long">Hạ Long</Option>
                <Option value="Nha Trang">Nha Trang</Option>
                <Option value="Phan Thiết">Phan Thiết</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Destination"
              name="destination"
              rules={[
                { required: true, message: "Please input the destinations!" },
              ]}
            >
              <Select mode="tags" placeholder="Enter destinations">
                <Option value="Hà Nội">TP Hà Nội</Option>
                <Option value="SaPa">SaPa</Option>
                <Option value="Cà Mau">Cà Mau</Option>
                <Option value="Đà Lạt">Đà Lạt</Option>
                <Option value="TP Hồ Chí Minh">TP Hồ Chí Minh</Option>
                <Option value="TP Đà Nẵng">TP Đà Nẵng</Option>
                <Option value="Hạ Long">Hạ Long</Option>
                <Option value="Nha Trang">Nha Trang</Option>
                <Option value="Phan Thiết">Phan Thiết</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Transportation Method"
              name="transportationMethod"
            >
              <Select mode="tags" placeholder="Enter transportation methods">
                <Option value="Airplane">Airplane</Option>
                <Option value="Bus">Bus</Option>
                <Option value="Motobike">Motobike</Option>
                <Option value="Train">Train</Option>
                <Option value="Hiking">Hiking</Option>
                <Option value="Fly">Fly</Option>
                <Option value="Walk">Walk</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Travel Schedule"
              name="travelSchedule"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input the travel schedule!",
              //   },
              // ]}
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
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
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
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#07689F]"
          >
            Save Tour
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddTourPage;
