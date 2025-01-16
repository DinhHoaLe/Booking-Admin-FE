import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Select,
  Form,
  InputNumber,
  Upload,
  Image,
  Button,
} from "antd";
import "react-toastify/dist/ReactToastify.css";
import { PlusOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ImgCrop from "antd-img-crop";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddress } from "../../Redux/Slide/addressSlice";
import { fetchHotel } from "../../Redux/Slide/hotelSlice";
import { apiPatchFormData } from "../../API/APIService";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const listCountries = ["Việt Nam", "Nhật", "Anh", "Mỹ"];

const EditProduct = ({ openModal, selected }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [avatar, setAvatar] = useState(
    selected.imgHotel?.avatar
      ? [
          {
            uid: "-1",
            name: selected._id,
            status: "done",
            url: selected.imgHotel.avatar,
          },
        ]
      : []
  );
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

  const dispatch = useDispatch();
  const { address, statusAddress, errorAddress } = useSelector(
    (state) => state.address
  );

  useEffect(() => {
    if (statusAddress === "idle") {
      dispatch(fetchAddress());
    }
  }, [dispatch, statusAddress]);

  if (statusAddress === "loading") return <p>Loading...</p>;
  if (statusAddress === "error") return <p>{errorAddress.message}</p>;

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedDistrict("");
    setWard([]);
    const getDisctrict = address.find((item) => item.Name === value);
    setDistrict(getDisctrict.Districts);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setWard([]);
    const getWard = district.find((item) => item.Name === value);
    setWard(getWard.Wards);
  };

  const handleCancel = () => {
    openModal(false);
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

  const handleAvatarChange = ({ fileList }) => {
    const updatedFileList = fileList.slice(-1);
    setIsChangeAvatar(true);
    setAvatar(updatedFileList);
  };

  const handleOk = async () => {
    const toastId = toast.loading("Creating...");
    try {
      const values = await form.validateFields();

      const formData = new FormData();

      if (isChangeAvatar) {
        if (avatar.length > 0 && avatar[0].originFileObj) {
          formData.append("avatar", avatar[0].originFileObj);
        } else {
          toast.error("Please upload an avatar!");
          return;
        }
      }

      formData.append("hotelName", values.hotelName);
      formData.append("category", values.category);
      formData.append("priceAveragePerNight", values.priceAveragePerNight);
      formData.append("phone", values.phone);
      formData.append("address[country]", values.country);
      formData.append("address[city]", values.city);
      formData.append("address[district]", values.district);
      formData.append("address[ward]", values.ward);
      formData.append("address[street]", values.street);
      formData.append("description", values.description);
      formData.append("status", values.status);
      formData.append("star", values.star);
      formData.append("availableRooms", values.availableRooms);
      values.amenities.forEach((amenity) => {
        formData.append("amenities[]", amenity);
      });

      const reponse = await apiPatchFormData(
        `edit-hotel/${selected._id}`,
        formData
      );

      toast.update(toastId, {
        // Sử dụng toastId
        render: "Hotel is updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        onClose: () => (
          navigate("/admin-page/product"),
          openModal(false),
          dispatch(
            fetchHotel({
              page: 1,
              pageSize: 10,
            })
          )
        ),
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.update(toastId, {
        render: "Something went wrong, please try again.",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  return (
    <Modal
      title="Hotel Information"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }} // Kiểm soát chiều cao và cuộn dọc
      okButtonProps={{ style: { backgroundColor: "#07689F" } }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          hotelName: selected.hotelName,
          avatar: selected.avatar,
          phone: selected.phone,
          country: selected.address.country,
          city: selected.address.city,
          district: selected.address.district,
          ward: selected.address.ward,
          street: selected.address.street,
          category: selected.category,
          availableRooms: selected.availableRooms,
          priceAveragePerNight: selected.priceAveragePerNight,
          star: selected.star,
          amenities: selected.amenities,
          description: selected.description,
          status: selected.status,
        }}
      >
        <Form.Item label="Hotel ID">
          <Input value={selected._id} disabled />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please select the status!",
            },
          ]}
        >
          <Select>
            <Option value="active">Active</Option>
            <Option value="pending">Pending</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Hotel Name"
          name="hotelName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <PhoneInput inputStyle={{ width: "100%" }} country={"vn"} />
        </Form.Item>

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

        <Form.Item
          label="District"
          name="district"
          rules={[{ required: true, message: "Please input the district!" }]}
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

        <Form.Item
          label="Street"
          name="street"
          rules={[{ required: true, message: "Please input the Street!" }]}
        >
          <Input placeholder="In put Street" />
        </Form.Item>

        <Form.Item
          label="Available Rooms"
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

        <Form.Item label="Star" name="star">
          <Select>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Form.Item>

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

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

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
                  return Promise.reject(new Error("Please upload an avatar!"));
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
              onChange={handleAvatarChange} // Cập nhật danh sách avatar
              beforeUpload={() => false} // Ngăn chặn tải lên ngay lập tức
            >
              {avatar.length < 1 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item label="Picture" name="picture">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
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
      </Form>
      {/* <ToastContainer /> */}
    </Modal>
  );
};

export default EditProduct;
