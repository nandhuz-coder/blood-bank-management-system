/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import API from '../../services/API';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import moment from 'moment';


const OrganisationPage = () => {
    const [data, setData] = useState([]);
    const {user}=useSelector(state=>state.auth)
    const getORG = async () => {
      try {
        if(user?.role==="donor"){
        const { data } = await API.get("/inventory/get-organisation");
        if (data?.success) {
          setData(data?.organisations);
        }
        }
        if(user?.role==="hospital"){
          const { data } = await API.get("/inventory/get-organisation-for-hospital");
          if (data?.success) {
            setData(data?.organisations);
          }
          }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getORG();
    }, [user]);
    return (
     
      <Layout>
        <div className='container mt-4'>
        <table className="table ">
          <thead>
            <tr>
              <th scope="col">Organisation Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.organisationName}</td>
  
                <td>{record.email}</td>
                <td>{record.address}</td>
                <td>{record.phone}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
         </div>
      </Layout>
  
    
);
};

export default OrganisationPage;
