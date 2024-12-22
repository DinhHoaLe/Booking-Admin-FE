import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Select,
  Form,
  DatePicker,
  Upload,
  Row,
  Col,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import moment from "moment";
import { apiPatchFormData, apiPost } from "../../API/APIService";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddress } from "../../Redux/Slide/addressSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;
const { Title } = Typography;
const listCountries = ["Việt Nam", "Nhật", "Anh", "Mỹ"];

const ModalViewProfileAdmin = ({ setModalView, selected }) => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(
    selected?.avatar
      ? [
          {
            uid: "-1",
            name: selected._id,
            status: "done",
            url: selected.avatar,
          },
        ]
      : []
  );
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedWard, setSelectedWard] = useState([]);

  const handleCancel = () => {
    setModalView(false);
  };

  const dispatch = useDispatch();
  const { address, statusAddress, errorAddress } = useSelector(
    (state) => state.address
  );

  console.log(address);

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

  const handleOk = async () => {
    const toastId = toast.loading("Creating...");
    try {
      const formData = new FormData();
      const values = await form.validateFields();
      console.log(values);

      if (isChangeAvatar) {
        if (avatar.length > 0 && avatar[0].originFileObj) {
          formData.append("file", avatar[0].originFileObj);
        } else {
          toast.error("Please upload an avatar!");
          return;
        }
      }
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);
      formData.append("DOB", values.DOB);
      formData.append("nationality", values.nationality);
      formData.append("address[country]", values.country);
      formData.append("address[city]", values.city);
      formData.append("address[ward]", values.ward);
      formData.append("address[district]", values.district);
      formData.append("address[street]", values.street);
      formData.append("status", values.status);

      const response = await apiPatchFormData(
        `edit-profile-user/${selected._id}`,
        formData
      );

      toast.update(toastId, {
        // Sử dụng toastId
        render: "Hotel is updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        // onClose: () => (navigate("/admin-page/product"), openModal(false)),
      });
    } catch (error) {
      console.error("Error : ", error);
      toast.error("Something went wrong, please try again.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleAvatarChange = ({ fileList }) => {
    const updatedFileList = fileList.slice(-1);
    setIsChangeAvatar(true);
    setAvatar(updatedFileList);
  };

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

  return (
    <Modal
      title="User Profile"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          _id: selected._id,
          email: selected.email,
          firstName: selected.firstName,
          lastName: selected.lastName,
          DOB: selected.DOB ? moment(selected.DOB) : null,
          gender: selected.gender,
          phone: selected.phone,
          nationality: selected.nationality,
          country: selected.address.country || "",
          city: selected.address.city || "",
          district: selected.address.district || "",
          ward: selected.address.ward || "",
          street: selected.address.street || "",
          status: selected.status,
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Avatar Section */}
          <Col span={6} style={{ textAlign: "center" }}>
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                fileList={avatar}
                maxCount={1}
                onPreview={onPreview}
                onChange={handleAvatarChange}
                beforeUpload={() => false}
              >
                {avatar.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </ImgCrop>
          </Col>

          {/* User Information Section */}
          <Col span={18}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone" name="phone">
                  <PhoneInput inputStyle={{ width: "100%" }} country="vn" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="First Name" name="firstName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lastName">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Date of Birth" name="DOB">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Gender" name="gender">
                  <Select>
                    <Option value={false}>Male</Option>
                    <Option value={true}>Female</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Address Section */}
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col span={12}>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[
                {
                  required: true,
                  message: "Please input the Nationality!",
                },
              ]}
            >
              <Select placeholder="Select nationality">
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
          <Col span={12}>
            <Form.Item label="Street" name="street">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col span={24}>
            <Form.Item label="Status" name="status">
              <Select>
                <Option value="active">Active</Option>
                <Option value="deleted">Deleted</Option>
                <Option value="pending">Pending</Option>
                <Option value="suspended">Suspended</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalViewProfileAdmin;
