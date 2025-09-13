import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import CategoryForm from "../../components/form/categoryForm";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) setCategories(data.category);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`);
      if (data.success) {
        toast.success("Category deleted");
        getAllCategories();
      }
    } catch {
      toast.error("Error deleting category");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, {
        name: updatedName,
      });
      if (data.success) {
        toast.success("Category updated");
        setVisible(false);
        getAllCategories();
      }
    } catch {
      toast.error("Error updating category");
    }
  };

  return (
    <Layout title="Category List">
      <div className="container mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center p-3 mb-3 rounded shadow-sm bg-light">
              <h2 className="m-0 text-primary fw-bold">📂 Category List</h2>
              <button
                className="btn btn-success px-4 fw-semibold shadow-sm"
                onClick={() => navigate("/dashboard/admin/createcategory")}
              >
                + Create Category
              </button>
            </div>

            {/* Table Card */}
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                <table className="table table-hover table-striped m-0">
                  <thead className="table-primary">
                    <tr>
                      <th className="py-3 ps-4">Category Name</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((c) => (
                      <tr key={c._id}>
                        <td className="ps-4 align-middle">{c.name}</td>
                        <td className="align-middle">
                          <button
                            className="btn btn-sm btn-outline-info me-2 rounded-pill px-3"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill px-3"
                            onClick={() => handleDelete(c._id)}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Update Modal */}
        <Modal
          onCancel={() => setVisible(false)}
          footer={null}
          open={visible}
          centered
        >
          <h4 className="text-center text-primary mb-3">Update Category</h4>
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CategoryList;
