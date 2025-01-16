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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ImgCrop from "antd-img-crop";
import { apiPostFormData } from "../../API/APIService";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddress } from "../../Redux/Slide/addressSlice";
import { fetchHotel } from "../../Redux/Slide/hotelSlice";

const { Option } = Select;

const listCountries = ["Việt Nam", "Nhật", "Anh", "Mỹ"];

const AddHotelPage = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [avatar, setAvatar] = useState([]);
  const dispatch = useDispatch();

  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [slectedStreet, setSelectedStreet] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);

  const { address, statusAddress, errorAddress } = useSelector(
    (state) => state.address
  );

  useEffect(() => {
    if (statusAddress === "idle") {
      dispatch(fetchAddress());
    } else if (statusAddress === "succeeded") {
      setCity(address);
    }
  }, [dispatch, statusAddress]);

  if (statusAddress === "loading") return <p>Loading...</p>;
  if (statusAddress === "failed") return <p>Error: {errorAddress}</p>;

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedDistrict("");
    setWard([]);
    if (value) {
      const getDisctrict = city.find((item) => {
        return item.Name === value;
      });
      setDistrict(getDisctrict.Districts);
    }
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    if (value) {
      const getWard = district.find((item) => {
        return item.Name === value;
      });
      setWard(getWard.Wards);
    }
  };

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
      formData.append("avatar", avatar[0].originFileObj || avatar[0]);
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
      formData.append("amenities", values.amenities);

      // Gửi dữ liệu tới BE
      const response = await apiPostFormData("create-hotel", formData);

      toast.update(toastId, {
        // Sử dụng toastId
        render: "Room created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        onClose: () => (
          dispatch(
            fetchHotel({
              page: 1,
              pageSize: 10,
            })
          ),
          navigate("/admin-page/product")
        ),
      });
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: error.message || "Failed to create hotel.",
        type: "error",
        isLoading: false,
        autoClose: 1000,
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
              label="Hotel Name"
              name="hotelName"
              rules={[
                { required: true, message: "Please input the hotel name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input the phone number!" },
              ]}
            >
              <PhoneInput inputStyle={{ width: "100%" }} country={"vn"} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Please input the country!" }]}
            >
              <Select placeholder="Select Country">
                {listCountries.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input the city!" }]}
            >
              <Select
                placeholder="Select City"
                value={selectedCity}
                onChange={handleCityChange}
              >
                {address.map((item, index) => (
                  <Option key={index} value={item.Name}>
                    {item.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="District"
              name="district"
              rules={[
                { required: true, message: "Please input the district!" },
              ]}
            >
              <Select
                placeholder="Select District"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                {district.map((item, index) => (
                  <Option key={index} value={item.Name}>
                    {item.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ward"
              name="ward"
              rules={[{ required: true, message: "Please input the ward!" }]}
            >
              <Select
                placeholder="Select Ward"
                value={selectedWard}
                onChange={(value) => setSelectedWard(value)}
              >
                {ward.map((item, index) => (
                  <Option key={index} value={item.Name}>
                    {item.Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: true, message: "Please input the Street!" }]}
            >
              <Input
                onChange={(value) => setSelectedStreet(value.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select the category!",
                },
              ]}
            >
              <Select>
                <Option value="hotel">Hotel</Option>
                <Option value="homestay">Homestay</Option>
                <Option value="resort">Resort</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Rooms"
              name="availableRooms"
              rules={[
                {
                  required: true,
                  message: "Please input the available rooms!",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price Average Per Night"
              name="priceAveragePerNight"
              rules={[
                {
                  required: true,
                  message: "Please input the price average per night!",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Star" name="star">
              <Select>
                <Option value="">Select Star</Option>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Amenities" name="amenities">
              <Select mode="tags" placeholder="Enter amenities">
                <Option value="Wifi">Wi-Fi</Option>
                <Option value="Television">Television</Option>
                <Option value="Balcony">Balcony</Option>
                <Option value="Parking">Parking</Option>
                <Option value="Bar">Bar</Option>
                <Option value="Restaurant">Restaurant</Option>
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

export default AddHotelPage;
