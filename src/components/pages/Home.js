import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import { Checkbox, Radio } from "antd";
import { useCart } from "../../context/cart";
import axios from "axios";
import banner from "../image/banner.webp";
import toast from "react-hot-toast";
import price from "../price/Price.js";
import Layout from "../layouts/Layout";
const apiUrl = process.env.REACT_APP_API_URL;
const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch categories & total products
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/category/get-category`);
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more products
  useEffect(() => {
    if (page !== 1) loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/product/product-list/${page}`);
      setLoading(false);
      setProducts((prev) => [...prev, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filters
  const handleFilter = (value, id) => {
    setChecked((prev) =>
      value ? [...prev, id] : prev.filter((c) => c !== id)
    );
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProduct();
  }, [checked, radio]);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${apiUrl}/product/product-filter`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"E-Commerce Home Page"}>
      {/* Banner */}
      <div className="container-fluid mt-3">
        <img
          src={banner}
          alt="Banner"
          className="w-100 rounded-4 shadow"
          style={{ maxHeight: "350px", objectFit: "cover" }}
        />
      </div>

      {/* Main Section */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Sidebar - Filters */}
          <div className="col-lg-3 col-md-4">
            <div className="bg-white p-4 rounded-4 shadow-sm sticky-top" style={{ top: "90px" }}>
              <h5 className="text-primary fw-bold mb-3">Filter by Category</h5>
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  className="d-block mb-2 text-secondary"
                >
                  {c.name}
                </Checkbox>
              ))}

              <h5 className="text-primary fw-bold mt-4 mb-3">Filter by Price</h5>
              <Radio.Group onChange={(e) => setRadio(e.target.value)} className="d-flex flex-column">
                {price.map((p) => (
                  <Radio key={p._id} value={p.array} className="mb-2 text-secondary">
                    {p.name}
                  </Radio>
                ))}
              </Radio.Group>

              <button
                className="btn btn-outline-danger w-100 mt-4 rounded-pill fw-semibold"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="col-lg-9 col-md-8">
            <h2 className="text-center fw-bold text-success mb-4">All Products</h2>
            <div className="row g-4">
              {products.map((p) => (
                <div className="col-lg-4 col-md-6" key={p._id}>
                  <div className="card border-0 shadow-sm rounded-4 h-100 product-card">
                    <img
                      src={`${apiUrl}/product/get-image/${p._id}`}
                      alt={p.name}
                      className="card-img-top rounded-top-4"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column text-center bg-light">
                      <h6 className="fw-bold text-dark">{p.name}</h6>
                      <p className="text-primary fw-semibold mb-2">
                        {p.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                      <div className="mt-auto d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm rounded-pill px-3"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-danger btn-sm rounded-pill px-3"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success("Item Added to Cart");
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center my-5">
              {products.length < total && (
                <button
                  className="btn btn-outline-danger px-5 py-2 rounded-pill fw-semibold"
                  onClick={() => setPage(page + 1)}
                >
                  {loading ? (
                    "Loading..."
                  ) : (
                    <>
                      <AiOutlineReload className="me-2" />
                      Load More
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Extra Styling */}
      <style>{`
        .product-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
      `}</style>
    </Layout>
  );
};

export default Home;
