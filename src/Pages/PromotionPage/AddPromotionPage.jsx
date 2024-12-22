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
import ImgCrop from "antd-img-crop";
import { apiPostFormData } from "../../API/APIService";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllHotel } from "../../Redux/Slide/allHotelSlice";

const { Option } = Select;

const AddPromotionPage = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [avatar, setAvatar] = useState([]);
  const dispatch = useDispatch();

  const { allHotels, statusAllHotels, errorAllHotels } = useSelector(
    (state) => state.allHotels
  );

  console.log(allHotels);
  useEffect(() => {
    if (statusAllHotels === "idle") {
      dispatch(fetchAllHotel());
    }
  }, [dispatch, statusAllHotels]);

  if (statusAllHotels === "loading") return <p>Loading...</p>;
  if (statusAllHotels === "failed") return <p>Error: {errorAllHotels}</p>;

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
      if (values.objectId) {
        formData.append("objectId", values.objectId);
      }

      // fileList.forEach((file) => {
      //   formData.append("files", file.originFileObj);
      // });

      console.log(values);

      formData.append("file", avatar[0].originFileObj || avatar[0]);
      formData.append("code", values.code);
      formData.append("objectType", values.objectType);
      formData.append("discountType", values.discountType);
      formData.append("description", values.description);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("discountValue", values.discountValue);
      formData.append("minimumValue", values.minimumValue || 0);
      formData.append("maxDiscount", values.maxDiscount || 0);
      formData.append(
        "applicableCategories",
        values.applicableCategories || []
      );

      // Gửi dữ liệu tới BE
      const response = await apiPostFormData("create-promotion", formData);

      toast.update(toastId, {
        // Sử dụng toastId
        render: "Promotion created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: error.message || "Failed to create promotion.",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Add Promotion</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Code"
              name="code"
              rules={[{ required: true, message: "Please input the code!" }]}
            >
              <Input placeholder="Input Code" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Object Type"
              name="objectType"
              rules={[
                { required: true, message: "Please select the object type!" },
              ]}
            >
              <Select>
                <Select.Option value="hotel">Hotel</Select.Option>
                <Select.Option value="tour">Tour</Select.Option>
                <Select.Option value="flight">Flight</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Object Name" name="objectId">
              <Select placeholder="Select object name">
                {allHotels?.map((item, index) => (
                  <Option key={index} value={item._id}>
                    {item.hotelName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Discount Type"
              name="discountType"
              rules={[
                { required: true, message: "Please select the discount type!" },
              ]}
            >
              <Select>
                <Select.Option value="percentage">Percentage</Select.Option>
                <Select.Option value="fixed">Fixed</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Please input the start date!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End Date"
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Please input the end date!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Discount Value"
              name="discountValue"
              rules={[
                {
                  required: true,
                  message: "Please input the Discount Value!",
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Input Discount Value"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Minimum Value" name="minimumValue">
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Input Minimum Value"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Max Discount" name="maxDiscount">
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Input Max Discount"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Minimum Value" name="applicableCategories">
              <Select
                mode="multiple"
                placeholder="Select categories"
                style={{ width: "100%" }}
              >
                <Select.Option value="ALL">ALL</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please select the description!" },
              ]}
            >
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
            Save Hotel
          </Button>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddPromotionPage;
