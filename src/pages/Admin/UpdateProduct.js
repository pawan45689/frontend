import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState("");

  // Fetch single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}/product/get-singleproduct/${params.slug}`
      );
      if (data?.success) {
        setId(data.product._id);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category?._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // Fetch categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/category/get-category`);
      if (data?.success) setCategories(data.category);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (image) productData.append("image", image);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${apiUrl}/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/product");

      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  // Delete product
  const handleDelete = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this product?")) return;
      const { data } = await axios.delete(`${apiUrl}/product/delete-product/${id}`);
      if (data?.success) {
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/product");

      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  return (
    <Layout title="Dashboard - Update Product">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow-sm rounded-3 p-4">
              <h2 className="text-center text-primary mb-4">Update Product</h2>

              <form onSubmit={handleUpdate}>
                {/* Category */}
                <div className="mb-3">
                  <label className="fw-semibold mb-2 d-block">Category</label>
                  <Select
                    className="w-100 shadow-sm rounded"
                    showSearch
                    placeholder="Choose category"
                    value={category}
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                  <label className="fw-semibold mb-2 d-block">Product Image</label>
                  <div
                    className="d-flex justify-content-center align-items-center border border-dashed rounded p-4 bg-light text-center cursor-pointer"
                    style={{ minHeight: "120px" }}
                    onClick={() => document.getElementById("product-image-input").click()}
                  >
                    {image ? image.name : "Click to Upload Image"}
                    <input
                      type="file"
                      id="product-image-input"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                {/* Image Preview */}
                {image || id ? (
                  <div className="mb-3 text-center">
                    <img
                      src={image ? URL.createObjectURL(image) : `${apiUrl}/product/get-image/${id}`}
                      alt="Preview"
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                ) : null}

                {/* Product Name & Price */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Product Name"
                      className="form-control shadow-sm rounded"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Price"
                      className="form-control shadow-sm rounded"
                      required
                    />
                  </div>
                </div>

                {/* Quantity & Shipping */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Quantity"
                      className="form-control shadow-sm rounded"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <Select
                      className="w-100 shadow-sm rounded"
                      placeholder="Select Shipping"
                      value={shipping}
                      onChange={(value) => setShipping(value)}
                    >
                      <Option value="0">Yes</Option>
                      <Option value="1">No</Option>
                    </Select>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product Description"
                    className="form-control shadow-sm rounded"
                    rows="3"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between gap-3">
                  <button type="submit" className="btn btn-gradient-primary w-50">
                    Update Product
                  </button>
                  <button type="button" onClick={handleDelete} className="btn btn-danger w-50">
                    Delete Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .border-dashed {
            border-style: dashed !important;
          }
          .cursor-pointer {
            cursor: pointer;
          }
          .btn-gradient-primary {
            background: linear-gradient(90deg, #4b6cb7, #182848);
            color: white;
            border: none;
          }
          .btn-gradient-primary:hover {
            opacity: 0.9;
          }
        `}
      </style>
    </Layout>
  );
};

export default UpdateProduct;
