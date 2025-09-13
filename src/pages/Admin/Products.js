import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
const Product = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/product/get-product`);
      if (data?.success) setProducts(data.products);
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Products">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center text-primary text-uppercase mb-4 fw-bold">
              Product List
            </h2>

            {products.length > 0 ? (
              <div className="row g-4">
                {products.map((product) => (
                  <div className="col-md-4" key={product._id}>
                    <Link
                      to={`/dashboard/admin/product/${product.slug}`}
                      className="text-decoration-none"
                    >
                      <div className="card h-100 shadow-sm rounded-3 hover-shadow transition">
                        <img
                          src={`${apiUrl}/product/get-image/${product._id}`}
                          alt={product.name}
                          className="card-img-top rounded-top"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body text-center">
                          <h5 className="fw-bold text-primary mb-2">
                            {product.name}
                          </h5>
                          <p className="text-muted mb-1">
                            Quantity:{" "}
                            <span className="fw-semibold">
                              {product.quantity}
                            </span>
                          </p>
                          <p className="text-muted mb-1">
                            Price:{" "}
                            <span className="fw-semibold">
                              ₹{product.price}
                            </span>
                          </p>
                          <p className="text-muted mb-1">
                            Shipping:{" "}
                            <span className="fw-semibold">
                              {product.shipping ? "Yes" : "No"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted fw-semibold">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          .hover-shadow:hover {
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            transform: translateY(-5px);
            transition: all 0.3s ease-in-out;
          }
          .transition {
            transition: all 0.3s ease-in-out;
          }
        `}
      </style>
    </Layout>
  );
};

export default Product;
