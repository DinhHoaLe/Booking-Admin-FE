import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Select,
  Form,
  Image,
  DatePicker,
  InputNumber,
  Upload,
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { fetchAllHotel } from "../../Redux/Slide/allHotelSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiPatchFormData } from "../../API/APIService";

const ModalPromotion = ({ setModal, selected }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(
    selected?.imgPromotion
      ? [
          {
            uid: "-1",
            name: selected._id,
            status: "done",
            url: selected.imgPromotion,
          },
        ]
      : []
  );
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

  const { allHotels, statusAllHotels, errorAllHotels } = useSelector(
    (state) => state.allHotels
  );

  useEffect(() => {
    if (statusAllHotels === "idle") {
      dispatch(fetchAllHotel());
    }
  }, [dispatch, statusAllHotels]);

  if (statusAllHotels === "loading") return <p>Loading...</p>;
  if (statusAllHotels === "failed") return <p>Error: {errorAllHotels}</p>;

  const handleCancel = () => {
    setModal(false);
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

  const handleOk = async () => {
    const toastId = toast.loading("Creating...");
    try {
      const values = await form.validateFields(); // Lấy tất cả giá trị từ form
      const formData = new FormData();
      if (isChangeAvatar) {
        if (avatar.length > 0 && avatar[0].originFileObj) {
          formData.append("file", avatar[0].originFileObj);
        } else {
          toast.error("Please upload an avatar!");
          return;
        }
      }
      if (values.objectId) {
        formData.append("objectId", values.objectId);
      }
      formData.append("code", values.code);
      formData.append("status", values.status);
      formData.append("applicableCategories", values.applicableCategories);
      formData.append("description", values.description);
      formData.append("discountType", values.discountType);
      formData.append("discountValue", values.discountValue);
      formData.append("minimumValue", values.minimumValue);
      formData.append("maxDiscount", values.maxDiscount);
      formData.append("objectType", values.objectType);

      formData.append(
        "startDate",
        values.startDate ? moment(selected.startDate) : null
      );
      formData.append(
        "endDate",
        values.endDate ? moment(selected.endDate) : null
      );

      const response = await apiPatchFormData(
        `edit-promotion/${selected._id}`,
        formData
      );

      toast.update(toastId, {
        // Sử dụng toastId
        render: response.message,
        type: "success",
        isLoading: false,
        autoClose: 1000,
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

  return (
    <Modal
      title="Promotion Information"
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleOk}
        initialValues={{
          _id: selected._id,
          code: selected.code,
          image: selected.image,
          status: selected.status,
          endDate: selected.endDate ? moment(selected.endDate) : null,
          startDate: selected.startDate ? moment(selected.startDate) : null,
          objectId: selected.objectId,
          objectType: selected.objectType,
          description: selected.description,
          maxDiscount: selected.maxDiscount,
          discountType: selected.discountType,
          minimumValue: selected.minimumValue,
          discountValue: selected.discountValue,
        }}
      >
        <Form.Item label="Promotion ID" name="_id">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Code" name="code">
          <Input placeholder="Input Code" />
        </Form.Item>

        <Form.Item label="Object Type" name="objectType">
          <Select>
            <Select.Option value="hotel">Hotel</Select.Option>
            <Select.Option value="tour">Tour</Select.Option>
            <Select.Option value="flight">Flight</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Object Name" name="objectId">
          <Select placeholder="Select object" style={{ width: "100%" }}>
            <Select.Option value="ALL">ALL</Select.Option>
            {allHotels.map((item, index) => (
              <Select.Option key={index} value={item._id}>
                {item.hotelName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Discount Type" name="discountType">
          <Select>
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="fixed">Fixed</Select.Option>
          </Select>
        </Form.Item>

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

        <Form.Item label="Minimum Value" name="minimumValue">
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Input Minimum Value"
          />
        </Form.Item>

        <Form.Item label="Max Discount" name="maxDiscount">
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Input Max Discount"
          />
        </Form.Item>

        <Form.Item label="Applicable Categories" name="applicableCategories">
          <Select
            mode="multiple"
            placeholder="Select categories"
            style={{ width: "100%" }}
          >
            <Select.Option value="ALL">ALL</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
            <Select.Option value="expired">Expired</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Image">
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
        </Form.Item>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

export default ModalPromotion;
