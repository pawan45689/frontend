import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../layouts/Layout";
import { useCart } from "../../context/cart";  // ✅ Cart context import
const apiUrl = process.env.REACT_APP_API_URL;

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [cart, setCart] = useCart(); // ✅ Cart state

  // Fetch single product
  const detailProduct = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/product/get-singleproduct/${slug}`);
      if (data.success) setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    detailProduct();
  }, [slug]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  // ✅ Add to cart handler
  const handleAddToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item Added to Cart");
    navigate("/cart");
  };

  return (
    <Layout title={product.name}>
      <div className="container my-5">
        <div className="row g-5 align-items-center">
          {/* Left: Product Image */}
          <div className="col-lg-6 text-center">
            <div className="border rounded-4 p-4 shadow-lg bg-white">
              <img
                src={`${apiUrl}/api/v1/product/get-image/${product._id}`}
                alt={product.name}
                className="img-fluid rounded-3"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="col-lg-6">
            <div className="border rounded-4 p-5 shadow-lg bg-light">
              <h2 className="fw-bold text-center text-primary mb-3">{product.name}</h2>
              <h3 className="text-success fw-bold mb-3">
                {product.price.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </h3>
              <p className="text-muted mb-4" style={{ lineHeight: "1.6" }}>
                {product.description}
              </p>
              <p className="mb-4">
                <span className="fw-bold text-dark">Category:</span>{" "}
                <span className="badge bg-secondary">{product.category?.name}</span>
              </p>
              <div className="d-flex gap-3 justify-content-center mt-4">
                <button
                  className="btn btn-outline-secondary px-4 py-2 rounded-pill"
                  onClick={() => navigate("/")}
                >
                  Back to Shop
                </button>
                <button
                  className="btn btn-danger px-4 py-2 rounded-pill"
                  onClick={handleAddToCart}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
