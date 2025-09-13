import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Admin Dashboard">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Sidebar */}
            <div className="bg-white p-6 shadow-lg rounded-2xl sticky top-6">
              <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="col-span-3 space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 shadow-xl rounded-2xl text-white">
                <h2 className="text-3xl font-bold mb-4">
                  Welcome,{" "}
                  <span className="text-yellow-300">
                    {auth?.user?.username || "Admin"}
                  </span>
                </h2>
                <hr className="border-yellow-200 mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Admin Name */}
                  <div className="bg-white text-gray-800 p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <h5 className="text-gray-500 text-sm font-medium">Admin Name</h5>
                    <p className="text-lg font-semibold mt-1">
                      {auth?.user?.username || "N/A"}
                    </p>
                  </div>

                  {/* Admin Email */}
                  <div className="bg-white text-gray-800 p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <h5 className="text-gray-500 text-sm font-medium">Admin Email</h5>
                    <p className="text-lg font-semibold mt-1">
                      {auth?.user?.email || "N/A"}
                    </p>
                  </div>

                  {/* Admin Phone */}
                  <div className="bg-white text-gray-800 p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <h5 className="text-gray-500 text-sm font-medium">Admin Phone</h5>
                    <p className="text-lg font-semibold mt-1">
                      {auth?.user?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Future Cards / Stats can go here */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
