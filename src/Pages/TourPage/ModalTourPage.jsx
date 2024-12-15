import React, { useState } from "react";
import { Modal, Input, Select, Form } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const EditProduct = ({
  openModal,
  selectedProduct,
  callApi,
  callRefreshToken,
  token,
  setToken,
}) => {
  const [form] = Form.useForm(); // Sử dụng Form.useForm() để quản lý form
  const [newImage, setNewImage] = useState(selectedProduct.image);
  const [newUploadImage, setNewUploadImage] = useState(null);

  const handleCancel = () => {
    openModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage(reader.result);
        setNewUploadImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const handleOk = async () => {
    const toastId = toast.loading("Creating...");
    try {
      const values = await form.validateFields(); // Lấy tất cả giá trị từ form

      const formData = new FormData();
      formData.append("file", newUploadImage); // Thêm tệp vào FormData
      formData.append("productId", selectedProduct._id);
      formData.append("category", values.category);
      formData.append("price", values.price);
      formData.append("color", values.color);
      formData.append("brand", values.brand);
      formData.append("quantity", values.quantity);
      formData.append("description", values.description);
      formData.append("status", values.status);
      formData.append("discount", values.discount);
      formData.append("slug", values.slug);
      formData.append("sku", values.sku);
      const req2 = await fetch(
        `http://localhost:8080/api/v1/products/update-product/${selectedProduct._id}`,
        {
          method: "PATCH",
          headers: {
            // "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      // const res2 = await req2.json();
      if (req2.status === 403) {
        const getToken = await callRefreshToken(token);
        if (!getToken) throw new Error("Please log in first!");
        setToken(getToken);
        setCookie("token", getToken, 7);
        const req3 = await fetch(
          `http://localhost:8080/api/v1/products/update-product/${selectedProduct._id}`,
          {
            method: "PATCH",
            headers: {
              // "Content-Type": "application/json",
              authorization: `Bearer ${getToken}`,
            },
            body: formData,
          }
        );
        if (req3.status === 200) {
          toast.update(toastId, {
            render: "Updated successful!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            onClose: () => openModal(false),
          });
          callApi();
        } else {
          const res3 = await req3.json();
          toast.update(toastId, {
            render: res3.message,
            type: "warning",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
      if (req2.status === 200) {
        toast.update(toastId, {
          render: "Updated successful!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          onClose: () => openModal(false),
        });
        callApi();
      } else {
        const res3 = await req2.json();
        toast.update(toastId, {
          render: res3.message,
          type: "warning",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.update(toastId, {
        render: "Something went wrong, please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const colors = [
    "yellow-500",
    "orange-500",
    "white",
    "blue-500",
    "black",
    "red-500",
    "gray-500",
    "sky-500",
    "rose-500",
    "cyan-500",
    "violet-500",
  ];

  return (
    <Modal
      title="Product Information"
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
          title: selectedProduct.title,
          category: selectedProduct.category,
          price: selectedProduct.price,
          color: selectedProduct.color,
          brand: selectedProduct.brand,
          quantity: selectedProduct.quantity,
          description: selectedProduct.description,
          status: selectedProduct.status,
          discount: selectedProduct.discount,
          slug: selectedProduct.slug,
          sku: selectedProduct.sku,
        }}
      >
        <Form.Item label="Product ID">
          <Input value={selectedProduct._id} disabled />
        </Form.Item>

        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Sku" name="sku" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="men's clothing">men's clothing</Select.Option>
            <Select.Option value="women's clothing">
              women's clothing
            </Select.Option>
            <Select.Option value="electronics">electronics</Select.Option>
            <Select.Option value="jewelery">jewelery</Select.Option>
            <Select.Option value="toy">Toy</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item label="Discount" name="discount">
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item label="Color" name="color">
          <Select>
            {colors.map((item, index) => (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true }]}
        >
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="out_of_stock">Out of stock</Select.Option>
            <Select.Option value="discontinued">Discontinued</Select.Option>
            <Select.Option value="pre_order">Pre-order</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Image">
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {newImage && <img src={newImage} alt="Product" width={100} />}
        </Form.Item>
      </Form>
      {/* <ToastContainer /> */}
    </Modal>
  );
};

export default EditProduct;
