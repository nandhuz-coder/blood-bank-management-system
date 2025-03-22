import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../services/API";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // ✅ Wrap `getDonors` in `useCallback` to prevent re-creation
  const getDonors = useCallback(async () => {
    if (!user?._id) return; // Prevent API call if user is null/undefined
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: { inventoryType: "in", donor: user._id }, // ✅ Access `user._id` safely
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user?._id]); // ✅ Fixed dependency array

  useEffect(() => {
    getDonors();
  }, [getDonors]); // ✅ Now it follows React Hook rules

  return (
    <Layout>
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Email</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donation;
