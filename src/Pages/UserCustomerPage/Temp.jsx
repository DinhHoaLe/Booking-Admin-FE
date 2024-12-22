import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Form, DatePicker, Upload, Image } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import moment from "moment";
import { apiPatchFormData, apiPost } from "../../API/APIService";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddress } from "../../Redux/Slide/addressSlice";

const { Option } = Select;
const listCountries = ["Việt Nam", "Nhật", "Anh", "Mỹ"];

const ModalCustomer = ({ setModal, selected }) => {
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
    setModal(false);
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
        `edit-profile-user/${selected._id}`, formData
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
      title="Customer Information"
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      <Form
        layout="vertical"
        form={form}
        // onFinish={handleOk}
        initialValues={{
          _id: selected._id,
          email: selected.email,
          firstName: selected.firstName,
          lastName: selected.lastName,
          DOB: selected.DOB ? moment(selected.DOB) : null,
          gender: selected.gender,
          phone: selected.phone,
          nationality: selected.nationality,
          country: selected.address.country ? selected.address.country : "",
          city: selected.address.city ? selected.address.city : "",
          district: selected.address.district ? selected.address.district : "",
          ward: selected.address.ward ? selected.address.ward : "",
          street: selected.address.street ? selected.address.street : "",
          status: selected.status,
          avatar: selected.avatar,
        }}
      >
        <Form.Item label="User ID" name="_id">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <PhoneInput
            inputStyle={{ width: "100%" }}
            country={"vn"}
            onChange={(value) => setPhone(value)}
          />
        </Form.Item>

        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName">
          <Input />
        </Form.Item>

        <Form.Item label="Date Of Birth" name="DOB">
          <DatePicker
            style={{ width: "100%" }}
            // defaultValue={selected.DOB ? moment(selected.DOB) : null}
            // onChange={(date, dateString) => setDateOfBirth(dateString)}
          />
        </Form.Item>

        <Form.Item
          label="Nationality"
          name="nationality"
          rules={[{ required: true, message: "Please input the Nationality!" }]}
        >
          <Select placeholder="Select nationality">
            {listCountries.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
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

        <Form.Item label="Street" name="street">
          <Input />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select>
            <Select.Option value={false}>Male</Select.Option>
            <Select.Option value={true}>Female</Select.Option>
          </Select>
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

        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="deleted">Deleted</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="suspended">Suspended</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

export default ModalCustomer;
