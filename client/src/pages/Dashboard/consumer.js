import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";

const Consumer = () => {
  const [data, setData] = useState([]);
  const [filterBloodGroup, setFilterBloodGroup] = useState("");

  const getDonors = async () => {
    try {
      const { data } = await API.get("/inventory/get-donors");
      if (data?.success) {
        setData(data?.donors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonors();
  }, []);

  const filteredDonors = data.filter((donor) =>
    filterBloodGroup ? donor.bloodGroup === filterBloodGroup : true
  );

  return (
    <Layout>
      <div className="container mt-4">
        <h4 className="mt-4">Available Donors</h4>
        <div className="form-group mb-3">
          <label htmlFor="filterBloodGroup"><strong>Filter by Blood Group:</strong></label>
          <select
            className="form-control w-25"
            id="filterBloodGroup"
            value={filterBloodGroup}
            onChange={(e) => setFilterBloodGroup(e.target.value)}
          >
            <option value="">All</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {filteredDonors.length === 0 ? (
          <p>No donors found</p>
        ) : (
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map((donor) => (
                <tr key={donor._id}>
                  <td>{donor.name}</td>
                  <td>{donor.bloodGroup}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Consumer;
