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
import '../css/home.css';

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
    getAllProduct();
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
      const { data } = await axios.get(
        `${apiUrl}/product/product-list/${page}`
      );
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
    else filterProduct();
  }, [checked, radio]);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${apiUrl}/product/product-list/${page}`
      );
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

  return (
    <Layout title={"E-Commerce Home Page"}>
      {/* Banner */}
      <div className="relative">
        <img
          src={banner}
          alt="Banner"
          className="w-100 rounded-4 shadow-lg"
          style={{ maxHeight: "380px", objectFit: "cover" }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="fw-bold display-4 shadow-text">Shop the Best Deals</h1>
          <p className="lead">Find premium products at unbeatable prices</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Sidebar - Filters */}
          <div className="col-lg-3 col-md-4">
            <div
              className="bg-white bg-opacity-75 backdrop-blur p-4 rounded-4 shadow sticky-top filter-section"
              style={{ top: "90px" }}
            >
              <h5 className="text-dark fw-bold mb-3">Filter by Category</h5>
              <div className="filter-scroll d-flex flex-lg-column flex-row gap-2">
                {categories.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    className="text-secondary"
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>

              <h5 className="text-dark fw-bold mt-4 mb-3">Filter by Price</h5>
              <div className="filter-scroll d-flex flex-lg-column flex-row gap-3">
                <Radio.Group
                  onChange={(e) => setRadio(e.target.value)}
                  className="d-flex flex-lg-column flex-row gap-3"
                >
                  {price.map((p) => (
                    <Radio
                      key={p._id}
                      value={p.array}
                      className="text-secondary"
                    >
                      {p.name}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>

              <button
                className="btn btn-gradient w-100 mt-4 rounded-pill fw-semibold"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="col-lg-9 col-md-8">
            <h2 className="text-center fw-bold text-dark mb-4">
              ✨ Featured Products ✨
            </h2>
            <div className="row g-4">
              {products.map((p) => (
                <div className="col-6 col-md-4 col-lg-4" key={p._id}>
                  <div className="card border-0 shadow-sm rounded-4 h-100 product-card overflow-hidden">
                    <img
                      src={`${apiUrl}/product/get-image/${p._id}`}
                      alt={p.name}
                      className="card-img-top product-img"
                    />
                    <div className="card-body d-flex flex-column text-center">
                      <h6 className="fw-bold text-dark">{p.name}</h6>
                      <p className="text-success fw-semibold mb-2">
                        {p.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </p>
                      <div className="mt-auto d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-outline-dark btn-sm rounded-pill px-3"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          View Details
                        </button>
                        <button
                          className="btn btn-dark btn-sm rounded-pill px-3"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to Cart");
                          }}
                        >
                          🛒 Add
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
                  className="btn btn-gradient px-5 py-2 rounded-pill fw-semibold"
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

    </Layout>
  );
};

export default Home;
