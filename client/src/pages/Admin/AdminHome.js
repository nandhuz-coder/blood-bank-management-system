import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          {/* ✅ Fixes typo in "d-flex" */}
          <h1>
            Welcome <i className="text-success">{user?.name || "Admin"}</i>
          </h1>
          {/* ✅ Fallback text in case `user?.name` is undefined */}
          <h3>Manage Blood Management System</h3>
          <hr />
          <p>
            This is the admin dashboard where you can manage the entire blood
            donation and management system. Use the navigation menu to add, 
            update, and monitor blood availability, donor information, and system analytics.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
