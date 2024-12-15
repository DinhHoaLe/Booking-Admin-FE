import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Form, Image, DatePicker } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const ModalPromotion = ({
  setModal,
  selected,
  callApi,
  callRefreshToken,
  token,
  setToken,
  setCookie,
}) => {
  // const { callApi } = useAdminContext();
  const [form] = Form.useForm();
  const [newImage, setNewImage] = useState(selected.image);
  const [newUploadImage, setNewUploadImage] = useState();
  const [dataProducts, setDataProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(
    selected.applicableProducts || []
  );

  const handleCancel = () => {
    setModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result);
      };
      setNewUploadImage(file);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please log in again!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      callApiProducts();
    }
  }, [token]);

  const callApiProducts = async () => {
    try {
      const req = await fetch("http://localhost:8080/api/v1/products", {
        method: "GET",
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      });
      const res = await req.json();
      setDataProducts(res.data);
    } catch (error) {
      console.log("error", error);
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

  useEffect(() => {
    if (!dataProducts) {
      const toastId = toast.loading("Creating...");
      return toast.update(toastId, {
        render: "Loading successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }, []);

  const handleSelectChange = (value) => {
    if (value.includes("ALL")) {
      setSelectedProducts(dataProducts.map((item) => item.title));
    } else {
      setSelectedProducts(value);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Lấy tất cả giá trị từ form
      const formData = new FormData();
      formData.append("file", newUploadImage); // Thêm tệp vào FormData
      formData.append("status", values.status);
      formData.append("applicableProducts", values.applicableProducts);
      formData.append("description", values.description);
      formData.append("discountType", values.discountType);
      formData.append("discountValue", values.discountValue);
      formData.append("minimumOrderValue", values.minimumOrderValue);
      formData.append("maxDiscount", values.maxDiscount);
      formData.append(
        "startDate",
        values.startDate ? moment(selected.startDate) : null
      );
      formData.append(
        "endDate",
        values.endDate ? moment(selected.endDate) : null
      );
      const req1 = await fetch(
        `http://localhost:8080/api/v1/promotion/update-promotion/${selected._id}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (req1.status === 403) {
        console.log("check");
        const req2 = await callRefreshToken(token);
        setToken(req2);
        setCookie("token", req2, 7);
        if (!req2) throw new Error("Please Log in first!");
        const req3 = await fetch(
          `http://localhost:8080/api/v1/admin/update-profile/${selected._id}`,
          {
            method: "PATCH",
            authorization: `Bearer ${req2}`,
            body: formData,
          }
        );
        if (req3.status === 200) {
          console.log(req3);
          const res3 = await req3.json();
          toast.success(res3.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => setModal(false),
          });
          callApi();
        } else {
          const res3 = await req3.json();
          toast.warn(res3.message, {
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
      }
      if (req1.status === 200) {
        console.log(req1);
        const res3 = await req1.json();
        toast.success(res3.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => setModal(false),
        });
        callApi();
      } else {
        const res3 = await req1.json();
        toast.warn(res3.message, {
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

  const selectedDataPromotion = selectedProducts.map((item) => item.title);
  const selectedValuePromotion = selectedProducts.map((item) => item._id);
  console.log(selectedValuePromotion);
  console.log(selectedProducts);
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
        onFinish={handleOk}
        initialValues={{
          _id: selected._id,
          code: selected.code,
          image: selected.image,
          status: selected.status,
          endDate: selected.endDate ? moment(selected.endDate) : null,
          startDate: selected.startDate ? moment(selected.startDate) : null,
          description: selected.description,
          maxDiscount: selected.maxDiscount,
          discountType: selected.discountType,
          discountValue: selected.discountValue,
          minimumOrderValue: selected.minimumOrderValue,
          applicableProducts: selectedDataPromotion,
        }}
      >
        <Form.Item label="Promotion ID" name="_id">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Code" name="code">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>

        <Form.Item label="Discount Type" name="discountType">
          <Select>
            <Select.Option value="percentage">Percentage</Select.Option>
            <Select.Option value="fixed">Fixed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Start Date" name="startDate">
          <DatePicker
            style={{ width: "100%" }}
            // defaultValue={
            //   selected.startDate ? moment(selected.startDate) : null
            // }
            // onChange={(date, dateString) => setDateOfBirth(dateString)}
          />
        </Form.Item>

        <Form.Item label="End Date" name="endDate">
          <DatePicker
            style={{ width: "100%" }}
            // defaultValue={selected.endDate ? moment(selected.endDate) : null}
            // onChange={(date, dateString) => setDateOfBirth(dateString)}
          />
        </Form.Item>

        <Form.Item label="Discount Value" name="discountValue">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Minimum Order Value" name="minimumOrderValue">
          <Input />
        </Form.Item>

        <Form.Item label="Max Discount" name="maxDiscount">
          <Input />
        </Form.Item>

        <Form.Item label="Applicable Products" name="applicableProducts">
          <Select
            mode="multiple"
            placeholder="Select products"
            onChange={handleSelectChange}
            style={{ width: "100%" }}
            value={selectedProducts}
          >
            <Select.Option value="ALL">ALL</Select.Option>
            {dataProducts.map((item, index) => (
              <Select.Option key={index} value={item._id}>
                {item.title}
              </Select.Option>
            ))}
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
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {newImage && <Image src={newImage} alt="Image" width={100} />}
        </Form.Item>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

export default ModalPromotion;
