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
  const [pendingRequests, setPendingRequests] = useState([]);
  const [filterBloodGroup, setFilterBloodGroup] = useState("");

  useEffect(() => {
    fetchDonorRequests();
  }, []);

  const fetchDonorRequests = async () => {
    try {
      const response = await API.get("/inventory/donor-list");
      setPendingRequests(response.data?.requestData || []);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching donor requests");
      setPendingRequests([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/inventory/requests/create-request", {
        ...formData,
        hospitalId: user?._id,
      });
      toast.success("Request submitted successfully");
      setPendingRequests(response.data.data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the request");
    }
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      await API.delete(`/inventory/requests/delete-request/${requestId}`);
      toast.success("Request deleted successfully");
      setPendingRequests(pendingRequests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the request");
    }
  };

  const handleAcceptDonor = async (donorId, requestId) => {
    try {
      const res = await API.post("/inventory/accept-donor", {
        requestId, // ✅ Ensure this matches request `_id`
        donorId, // ✅ Ensure this matches donor's user `_id`
        action: "waiting"
      });

      if (res.data.success) {
        toast.success("Donor accepted successfully");
        fetchDonorRequests();
      } else {
        toast.info("Can't accept donor");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while accepting the donor");
    }
  };

  const handleRejectDonor = async (donorId, requestId) => {
    try {
      const res = await API.post("/inventory/accept-donor", {
        requestId, // ✅ Ensure this matches request `_id`
        donorId, // ✅ Ensure this matches donor's user `_id`
        action: "rejected"
      });

      if (res.data.success) {
        toast.warn("Donor Rejected successfully");
        fetchDonorRequests();
      } else {
        toast.info("Can't accept donor");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while accepting the donor");
    }
  };


  const approvedonor = async (donorId, requestId) => {
    try {
      const res = await API.post("/inventory/accept-donor", {
        requestId, // ✅ Ensure this matches request `_id`
        donorId, // ✅ Ensure this matches donor's user `_id`
        action: "accepted"
      });

      if (res.data.success) {
        toast.warn("certificate generated successfully");
        fetchDonorRequests();
      } else {
        toast.info("Can't generate");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while accepting the donor");
    }
  };


  return (
    <Layout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Welcome, <span className="text-success">{user?.hospitalName}</span></h1>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>Request Blood</button>
        </div>
        <h3 className="mt-3">Blood Consumer Dashboard</h3>
        <hr />

        {/* Pending Requests */}
        <h4 className="mt-4 text-center">Pending Requests</h4>
        <div className="table-responsive">
          {pendingRequests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            <table className="table table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Blood Group</th>
                  <th>Units</th>
                  <th>Interested Donors</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((request) => (
                  <tr key={request._id}>
                    <td>{request.bloodGroup}</td>
                    <td>{request.units}</td>
                    <td>{request.donors?.length || 0}</td>
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

        {/* Interested Donors Table */}
        <h4 className="mt-4">Interested Donors</h4>
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

        {pendingRequests.some(request => request.donors && request.donors.length > 0) ? (
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests
                .flatMap(req => req.donors || [])
                .filter(donor => filterBloodGroup === "" || donor.bloodGroup === filterBloodGroup)
                .map((donor, index) => (
                  <tr key={index}>
                    <td>{donor.name}</td>
                    <td>{donor.bloodGroup}</td>
                    <td>{donor.phone}</td>
                    <td>
                      {donor.action === "pending" ? (
                        <>
                          <button className="btn btn-success btn-sm" onClick={() => handleAcceptDonor(donor.id, donor.requestId)}>
                            Accept
                          </button>
                          <button className="btn btn-danger btn-sm ml-2" onClick={() => handleRejectDonor(donor.id, donor.requestId)}>
                            Reject
                          </button>
                        </>
                      ) : donor.action === "waiting" ? (
                        <button className="btn btn-info btn-sm" onClick={() => approvedonor(donor.id, donor.requestId)} >
                          approve Certificate
                        </button>
                      ) : donor.action === "rejected" ? (
                        <button className="btn btn-danger disabled btn-sm">
                          Rejected
                        </button>
                      ) : (
                        <button className="btn btn-secondary disabled btn-sm">
                          Donated
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No donors found</p>
        )}
      </div>

      {/* Blood Request Modal */}
      {showModal && (
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
                    <input
                      type="number"
                      className="form-control"
                      name="units"
                      value={formData.units}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Submit Request</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HospitalPage;
