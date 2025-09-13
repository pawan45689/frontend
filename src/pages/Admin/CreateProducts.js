import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
const { Option } = Select;

const CreateProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState();

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${apiUrl}/product/create-product`,
        productData
      );
      if (data?.error) {
        toast.error(data.message);
      } else {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating product");
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-5 shadow-lg rounded-3xl bg-white">
              <h2 className="text-center text-primary mb-5 text-uppercase fw-bold">
                Add New Product
              </h2>

              <form onSubmit={handleCreate}>
                {/* Category */}
                <div className="form-group mb-4">
                  <label className="fw-semibold mb-2">Category</label>
                  <Select
                    className="w-100 shadow-sm rounded"
                    showSearch
                    placeholder="Choose category"
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Name + Price */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="fw-semibold mb-2">Product Name</label>
                    <input
                      type="text"
                      className="form-control shadow-sm rounded"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-2">Price (₹)</label>
                    <input
                      type="number"
                      className="form-control shadow-sm rounded"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                </div>

                {/* Quantity + Shipping */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="fw-semibold mb-2">Quantity</label>
                    <input
                      type="number"
                      className="form-control shadow-sm rounded"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-2">Shipping</label>
                    <Select
                      className="w-100 shadow-sm rounded"
                      placeholder="Select shipping option"
                      onChange={(value) => setShipping(value)}
                      value={shipping}
                    >
                      <Option value="">-- Select Shipping --</Option>
                      <Option value="0">Yes</Option>
                      <Option value="1">No</Option>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="form-group mb-4">
                  <label className="fw-semibold mb-2">Description</label>
                  <textarea
                    className="form-control shadow-sm rounded"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div className="form-group mb-4">
                  <label className="fw-semibold mb-2 d-block">
                    Product Image
                  </label>
                  <div
                    className="d-flex justify-content-center align-items-center border border-dashed rounded p-4 bg-light text-center w-100 cursor-pointer hover-shadow"
                    style={{
                      minHeight: "120px",
                      position: "relative",
                      transition: "0.3s",
                    }}
                    onClick={() =>
                      document.getElementById("product-image-input").click()
                    }
                  >
                    {image ? image.name : "Click to Upload Product Image"}
                    <input
                      id="product-image-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                {/* Image Preview */}
                {image && (
                  <div className="form-group mb-4 text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-gradient-primary w-100 btn-lg shadow-sm"
                  style={{
                    background: "linear-gradient(to right, #4f46e5, #3b82f6)",
                    color: "#fff",
                    transition: "0.3s",
                  }}
                >
                  Create Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProducts;
