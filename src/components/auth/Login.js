import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import "../css/login.css";
import Layout from "../layouts/Layout";

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, { email, password });
      if (res.data.user && res.data.token) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <>
    <Layout title="Login- Ecommer App">
    <div className="login-page">
      {/* Left Side */}
      <div className="login-left">
        <div className="welcome-text">
          <h1>Welcome Back 👋</h1>
          <p>We are happy to see you again! Please login to continue.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="login-card">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modern-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modern-input"
            />
            <button type="submit" className="btn-gradient">
              Login
            </button>
            <div className="forgot-link-container">
              <a href="/forgotpassword" className="forgot-link">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    </Layout>
    </>
  );
};

export default Login;
