import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: isActive ? "#e0f7fa" : "#ffffff",
    textDecoration: "none",
    padding: "10px",
    marginBottom: "8px",
    color: "#333",
    borderRadius: "8px",
  });

  return (
    <div className="text-center coontainer">
      <div
        className="list-group dashboard-menu"
        style={{ padding: "16px", borderRadius: "12px" }}
      >
        <h4 style={{ color: "#2563eb", marginBottom: "16px" }}>Admin Panel</h4>
        <NavLink to="/dashboard/admin/categorylist" style={linkStyle}>
          <span
            className="material-icons"
            style={{ marginRight: "8px", color: "#2196f3" }}
          >
            category
          </span>
          Category List
        </NavLink>

        <NavLink to="/dashboard/admin/createproduct" style={linkStyle}>
          <span
            className="material-icons"
            style={{ marginRight: "8px", color: "#4caf50" }}
          >
            add_box
          </span>
          Create Product
        </NavLink>

        <NavLink to="/dashboard/admin/product" style={linkStyle}>
          <span
            className="material-icons"
            style={{ marginRight: "8px", color: "#9c27b0" }}
          >
            inventory
          </span>
          Products
        </NavLink>

        <NavLink to="/dashboard/admin/adminorders" style={linkStyle}>
          <span
            className="material-icons"
            style={{ marginRight: "8px", color: "#ff9800" }}
          >
            shopping_cart
          </span>
          Orders
        </NavLink>

        <NavLink to="/dashboard/admin/user" style={linkStyle}>
          <span
            className="material-icons"
            style={{ marginRight: "8px", color: "#f44336" }}
          >
            group
          </span>
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
