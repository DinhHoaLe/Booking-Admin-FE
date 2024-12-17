import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Form, InputNumber, Upload, Image } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { apiPatchFormData } from "../../API/APIService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const roomNameOptions = [
  "standard room",
  "executive room",
  "family room",
  "penthouse",
];

const roomTypeOptions = [
  "single",
  "double",
  "twin",
  "triple",
  "family",
  "doom",
  "suite",
];

const statusOptions = ["available", "occupied", "unavailable"];

const ModalRoomPage = ({ openModal, selected }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

  console.log(selected);
  // const [avatar, setAvatar] = useState(
  //   selected.imgRoom?.avatar
  //     ? [
  //         {
  //           uid: "-1",
  //           name: selected._id,
  //           status: "done",
  //           url: selected.imgRoom.avatar,
  //         },
  //       ]
  //     : []
  // );

  // const [imgList, setImgList] = useState(
  //   selected.imgRoom?.img
  //     ? selected.imgRoom.img.map((url, index) => ({
  //         uid: `-${index}`,
  //         name: `Image ${index + 1}`,
  //         status: "done",
  //         url,
  //       }))
  //     : []
  // );

  const handleCancel = () => {
    openModal(false);
  };

  // const handleAvatarChange = ({ fileList }) => {
  //   const updatedFileList = fileList.slice(-1);
  //   setIsChangeAvatar(true);
  //   // setAvatar(updatedFileList);
  // };

  // const handlePreviewImg = async (file) => {
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  // };

  // const handlePreviewAvatar = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(`<img src='${src}' style="max-width: 100%;"/>`);
  // };

  // const handleImgChange = ({ fileList }) => {
  //   setImgList(fileList);
  // };

  const handleOk = async () => {
    const toastId = toast.loading("Creating...");
    try {
      const values = await form.validateFields();

      const formData = new FormData();

      // if (isChangeAvatar) {
      //   if (avatar.length > 0 && avatar[0].originFileObj) {
      //     formData.append("imgRoom[avatar]", avatar[0].originFileObj);
      //   }
      // }

      // imgList.forEach((file, index) => {
      //   if (file.originFileObj) {
      //     formData.append(`imgRoom[img][${index}]`, file.originFileObj);
      //   }
      // });

      formData.append("roomName", values.roomName);
      formData.append("roomType", values.roomType);
      formData.append("pricePerNight", values.pricePerNight);
      formData.append("availableRoom", values.availableRoom);
      formData.append("description", values.description);
      formData.append("maxOccupancy", values.maxOccupancy);
      formData.append("dimensions", values.dimensions);
      formData.append("status", values.status);
      formData.append("children", values.children);
      values.amenities.forEach((amenity) => {
        formData.append("amenities[]", amenity);
      });

      await apiPatchFormData(`edit-room/${selected._id}`, formData);

      toast.update(toastId, {
        // Sử dụng toastId
        render: "Hotel is updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        // onClose: () => (navigate("/admin-page/product"), openModal(false)),
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
      title="Room Information"
      open={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          hotelName: selected.hotelId.hotelName,
          room: selected._id,
          roomName: selected.roomName,
          roomId: selected.roomName,
          roomType: selected.roomType,
          pricePerNight: selected.pricePerNight,
          availableRoom: selected.availableRoom,
          description: selected.description,
          maxOccupancy: selected.maxOccupancy,
          children: selected.children,
          dimensions: selected.dimensions,
          status: selected.status,
          amenities: selected.amenities,
        }}
      >
        <Form.Item label="Hotel" name="hotelName">
          <Input rows={4} disabled />
        </Form.Item>

        <Form.Item label="Room ID" name="room">
          <Input rows={4} disabled />
        </Form.Item>

        <Form.Item
          label="Room Name"
          name="roomName"
          rules={[{ required: true, message: "Please select a room name!" }]}
        >
          <Select placeholder="Select Room Name">
            {roomNameOptions.map((name) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Room Type"
          name="roomType"
          rules={[{ required: true, message: "Please select a room type!" }]}
        >
          <Select placeholder="Select Room Type">
            {roomTypeOptions.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price Per Night"
          name="pricePerNight"
          rules={[
            { required: true, message: "Please input the price per night!" },
          ]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

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
          <Select placeholder="Select Room Name">
            <Option value={true}>available</Option>
            <Option value={false}>unavailable</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Max Occupancy"
          name="maxOccupancy"
          rules={[
            { required: true, message: "Please input the max occupancy!" },
          ]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Children" name="children">
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Dimensions" name="dimensions">
          <Input placeholder="e.g., 10x12 ft" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select placeholder="Select Status">
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Amenities" name="amenities">
          <Select mode="tags" placeholder="Enter amenities">
            <Option value="Wi-Fi">Wi-Fi</Option>
            <Option value="Television">Television</Option>
            <Option value="Air Conditioning">Air Conditioning</Option>
            <Option value="Minibar">Minibar</Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
          label={
            <div>
              <span className="text-red-500">* </span> Avatar
            </div>
          }
          name="avatar"
        >
          <ImgCrop rotationSlider>
            <Upload
              listType="picture-card"
              fileList={avatar}
              maxCount={1}
              onPreview={handlePreviewAvatar}
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
        </Form.Item> */}

        {/* <Form.Item label="Additional Images" name="imgRoom">
          <Upload
            listType="picture-card"
            fileList={imgList}
            multiple
            onChange={handleImgChange}
            beforeUpload={() => false}
            onPreview={handlePreviewImg}
          >
            {imgList.length < 10 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default ModalRoomPage;
