import React from "react";
import logo from "../image/logo.jpg";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { Badge } from "antd";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark py-3"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <div className="container-fluid px-4">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="logo"
            style={{
              width: "65px",
              height: "65px",
              objectFit: "contain",
              borderRadius: "50%",
              boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            }}
          />
          <span className="ms-2 fw-bold fs-4 text-white">MyShop</span>
        </Link>

        {/* Toggle Button (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto align-items-center gap-3 me-2">
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-semibold" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-semibold" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white fw-semibold"
                to="/contact"
              >
                Contact
              </NavLink>
            </li>

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white fw-semibold"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white fw-semibold"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link d-flex align-items-center text-white fw-semibold"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    <CgProfile size={22} className="me-1" />
                    {auth?.user?.name || "Profile"}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-light ms-2 rounded-pill px-3 py-1 d-flex align-items-center gap-1"
                    onClick={handleLogout}
                  >
                    <FiLogOut size={18} /> Logout
                  </button>
                </li>
              </>
            )}

            {/* Cart */}
            <li className="nav-item ms-2">
              <Badge count={cart?.length || 0} offset={[5, -2]} showZero>
                <NavLink
                  className="nav-link text-white d-flex align-items-center fw-semibold"
                  to="/cart"
                >
                  <FaShoppingCart size={20} className="me-1" />
                  Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
