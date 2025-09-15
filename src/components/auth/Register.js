import React, { useState } from "react";
import axios from "axios";
import signuppic from "../image/singup.jpg";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import toast from "react-hot-toast";
import "../css/register.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, {
        username,
        email,
        phone,
        password,
        address,
        answer,
      });
      if (res) {
        toast.success(res.data?.message);
        navigate("/login");
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="container mt-5 mb-5">
        <div className="row w-100 shadow-lg rounded bg-white overflow-hidden register-row">
          {/* Image Section */}
          <div className="col-md-6 register-image d-flex flex-column justify-content-center align-items-center text-white p-5">
            <h2>Welcome to Ecommer!</h2>
            <p>Create your account and enjoy seamless shopping experience.</p>
            <img
              src={signuppic}
              alt="Signup"
              className="img-fluid mt-3 rounded shadow-sm"
            />
          </div>
          {/* Form Section */}
          <div className="col-md-6 p-5 register-form">
            <h1 className="text-center mb-4">Create an Account</h1>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="2"
                    required
                  ></textarea>
                </div>
                <div className="col-12 mb-4">
                  <textarea
                    className="form-control"
                    placeholder="Security Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows="2"
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary w-100">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
