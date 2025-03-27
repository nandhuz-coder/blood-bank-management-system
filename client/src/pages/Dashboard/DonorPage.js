import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import { useNavigate } from "react-router-dom";
import CertificateGenerator from "../../components/shared/download/generate"; // Import the Certificate Generator

const DonorPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [donationHistory, setDonationHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/inventory/donation-history")
      .then((response) => {
        if (response.data.success && response.data.data) {
          setDonationHistory(response.data.data);
        } else {
          setDonationHistory([]);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the donation history!",
          error
        );
      });
  }, []);

  const handleDownload = (donationDate, hospitalName) => {
    CertificateGenerator({
      user: user.name,
      donationDate,
      hospital: hospitalName,
    });
  };


  return (
    <Layout>
      <div className="container mt-4">
        <div className="d-flex flex-column align-items-center">
          <h1>
            Welcome <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Blood Donor</h3>
          <hr className="w-100" />
          <h4>Donation History</h4>
          {donationHistory.length === 0 ? (
            <p>No records available</p>
          ) : (
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Hospital Name</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {donationHistory.map((record, index) => (
                  <tr key={index}>
                    <td>{record.hospitalName || "N/A"}</td>
                    <td>{record.address || "N/A"}</td>
                    <td>
                      {record.donatedDate
                        ? new Date(record.donatedDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          handleDownload(record.donatedDate, record.hospitalName)
                        }
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="mt-4">
            Happy donating{" "}
            <button
              onClick={() => navigate("/donation")}
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
                color: "red",
              }}
            >
              Blood!
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DonorPage;
