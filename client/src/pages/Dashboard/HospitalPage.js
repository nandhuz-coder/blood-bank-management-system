import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HospitalPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: "",
    units: "1",
  });
  const [donors, setDonors] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [filterBloodGroup, setFilterBloodGroup] = useState("");

  useEffect(() => {
    API.get("/inventory/donor-list")
      .then((response) => {
        setDonors(response.data.userData);
        setPendingRequests(response.data.requestData);
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while fetching donors");
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/inventory/requests/create-request", {
      ...formData,
      hospitalId: user?._id,
    })
      .then((data) => {
        toast.success("Request submitted successfully");
        setPendingRequests(data.data.data)
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while submitting the request");
      });
    setShowModal(false);
  };

  const handleDeleteRequest = (requestId) => {
    API.delete(`/inventory/requests/delete-request/${requestId}`)
      .then(() => {
        toast.success("Request deleted successfully");
        setPendingRequests(pendingRequests.filter((request) => request._id !== requestId));
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while deleting the request");
      });
  };

  const filteredDonors = donors.filter((donor) =>
    filterBloodGroup ? donor.bloodGroup === filterBloodGroup : true
  );

  return (
    <Layout>
      <style>
        {`
        /* Reduce table width and center it */
        .table-container1 {
            display: flex;
            justify-content: center;
            width: 100%;
        }

        /* Adjust table width */
        .table1 {
            width: 75%;
            text-align: center;
            margin: 0 auto;
        }

        /* Center text in table cells */
        .table th, 
        .table td {
            text-align: center;
            vertical-align: middle;
        }
        `}
      </style>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Welcome, <span className="text-success">{user?.hospitalName}</span></h1>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>Request Blood</button>
        </div>
        <h3 className="mt-3">Blood Consumer Dashboard</h3>
        <hr />
        <h4 className="mt-4 text-center">Pending Requests</h4>
        <div className="table-container1">
          {pendingRequests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            <table className="table1 table-bordered table-sm mt-3">
              <thead className="table1-dark">
                <tr>
                  <th>Blood Group</th>
                  <th>Units</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.bloodGroup}</td>
                    <td>{request.units}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRequest(request._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Donors Table */}
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

      {/* Blood Request Modal */}
      {
        showModal && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Request Blood</h5>
                  <button type="button" className="close btn btn-danger" onClick={() => setShowModal(false)}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Blood Group</label>
                      <select className="form-control" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} required>
                        <option value="">Select Blood Group</option>
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
                    <div className="form-group">
                      <label>Units</label>
                      <input type="number" className="form-control" name="units" value={formData.units} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit Request</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </Layout >
  );
};

export default HospitalPage;
