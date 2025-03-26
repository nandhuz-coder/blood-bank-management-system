import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/shared/Layout/Layout';
import API from '../../services/API';
import { useNavigate } from 'react-router-dom';

const DonorPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [donationHistory, setDonationHistory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    API.get('/inventory/donation-history')
      .then(response => {
        console.log(response.data);
        if (response.data.data) setDonationHistory(response.data.data);
        else setDonationHistory([])
      })
      .catch(error => {
        console.error('There was an error fetching the donation history!', error);
      });
  }, []);

  const downloadCertificate = () => {
    alert('Certificate downloaded!');
  };

  const quotes = [
    "The blood you donate gives someone another chance at life.",
    "A single pint can save three lives, a single gesture can create a million smiles.",
    "Donate blood and be the reason for someone's heartbeat."
  ];

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
                  <th>Name</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {donationHistory.map((record, index) => (
                  <tr key={index}>
                    <td>{record.name}</td>
                    <td>{record.address}</td>
                    <td>{record.date}</td>
                    <td>{record.location}</td>
                    <td>
                      <button className="btn btn-primary" onClick={downloadCertificate}>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="mt-4">
            <ul>
              {quotes.map((quote, index) => (
                <li key={index}>{quote}</li>
              ))}
            </ul>
            <p>
              Happy donating <button onClick={() => navigate('/donation')} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, color: 'red' }}>Blood!</button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DonorPage;
