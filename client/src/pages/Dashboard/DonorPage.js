import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/shared/Layout/Layout';

const DonorPage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container mt-4">
        <div className="d-flex flex-column align-items-center">
          <h1>
            Welcome <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Blood Donor</h3>
          <hr className="w-100" />
        </div>
      </div>
    </Layout>
  );
}

export default DonorPage;
