import React, { useState } from "react";
import { Modal, Input, Select, Form, Upload, Image, DatePicker } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import { apiPatch, apiPatchFormData } from "../../API/APIService";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const EditProduct = ({ openModal, selected }) => {
  const [form] = Form.useForm(); // Sử dụng Form.useForm() để quản lý form
  const navigate = useNavigate();
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [avatar, setAvatar] = useState(
    selected.imgTour?.avatar
      ? [
          {
            uid: "-1",
            name: selected._id,
            status: "done",
            url: selected.imgTour.avatar,
          },
        ]
      : []
  );
  const handleCancel = () => {
    openModal(false);
  };

  const handleOk = async () => {
    const toastId = toast.loading("Creating...");
    try {
      const values = await form.validateFields(); // Lấy tất cả giá trị từ form

      const formData = new FormData();
      if (isChangeAvatar) {
        if (avatar.length > 0 && avatar[0].originFileObj) {
          formData.append("avatar", avatar[0].originFileObj);
        } else {
          toast.error("Please upload an avatar!");
          return;
        }
      }
      formData.append("tourName", values.tourName);
      formData.append("capacity", values.capacity);
      formData.append("price", values.price);
      formData.append("startDateBooking", values.startDateBooking);
      formData.append("endDateBooking", values.endDateBooking);
      formData.append("duration", values.duration);
      formData.append("description", values.description);
      formData.append("status", values.status);
      formData.append(
        "inforLocation[startDestination]",
        values.startDestination
      );
      formData.append("inforLocation[endDestination]", values.endDestination);

      values.transportationMethod.forEach((item) =>
        formData.append("transportationMethod[]", item)
      );

      values.inforLocation.forEach((item) =>
        formData.append("inforLocation[destination][]", item)
      );

      const update = await apiPatchFormData(
        `edit-tour/${selected._id}`,
        formData
      );

      toast.update(toastId, {
        // Sử dụng toastId
        render: "Tour is updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        onClose: () => (navigate("/admin-page/product"), openModal(false)),
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

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleAvatarChange = ({ fileList }) => {
    const updatedFileList = fileList.slice(-1);
    setIsChangeAvatar(true);
    setAvatar(updatedFileList);
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

  return (
    <Modal
      title="Tour Information"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }} // Kiểm soát chiều cao và cuộn dọc
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          id: selected._id,
          tourName: selected.tourName,
          capacity: selected.capacity,
          price: selected.price,
          startDateBooking: moment(selected.startDateBooking),
          endDateBooking: moment(selected.endDateBooking),
          duration: selected.duration,
          description: selected.description,
          status: selected.status,
          inforLocation: selected.inforLocation?.destination || [],
          transportationMethod: selected.transportationMethod || [],
          startDestination: selected.inforLocation.startDestination,
          endDestination: selected.inforLocation.endDestination,
        }}
      >
        <Form.Item label="Tour ID">
          <Input value={selected._id} disabled />
        </Form.Item>

        <Form.Item
          label="Tour Name"
          name="tourName"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter Tour Name" />
        </Form.Item>

        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[{ required: true, message: "Please input the capacity!" }]}
        >
          <Input type="number" min={1} placeholder="Number of People" />
        </Form.Item>

        <Form.Item
          label="Price ( $ )"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input type="number" min={0} placeholder="Enter Price" />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDateBooking"
          rules={[{ required: true, message: "Please input the start date!" }]}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDateBooking"
          rules={[{ required: true, message: "Please input the end date!" }]}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Duration"
          name="duration"
          rules={[{ required: true, message: "Please input the duration!" }]}
        >
          <Input placeholder="e.g., 3 days 2 nights" />
        </Form.Item>

        <Form.Item label="Location" name="inforLocation">
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

        <Form.Item label="Start Destination" name="startDestination">
          <Select placeholder="Enter startDestination">
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

        <Form.Item label="End Destination" name="endDestination">
          <Select placeholder="Enter end destination">
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

        <Form.Item label="Transportation Method" name="transportationMethod">
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

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select placeholder="Select Status">
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="occupied">Occupied</Select.Option>
            <Select.Option value="unavailable">Unavailable</Select.Option>
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
      <ToastContainer />
    </Modal>
  );
};

export default EditProduct;
