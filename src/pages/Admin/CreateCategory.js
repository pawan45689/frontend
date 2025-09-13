import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import CategoryForm from "../../components/form/categoryForm";
import axios from "axios";
import toast from "react-hot-toast";
const apiUrl = process.env.REACT_APP_API_URL;
const CreateCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Category name cannot be empty");

    try {
      const { data } = await axios.post(`${apiUrl}/category/create-category`, { name });
      if (data.success) {
        toast.success(`${name} created successfully`);
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error creating category");
    }
  };

  return (
    <Layout title="Create Category">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3"><AdminMenu /></div>
          <div className="col-md-9">
            <h2 className="text-center text-primary mb-4">Create New Category</h2>
            <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
