import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import API from '../../services/API';
import moment from 'moment';

const OrgList = () => {
  const [data, setData] = useState([]);
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      if (data?.success) {
        setData(data?.organisationsData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHospitals();
  }, []);

  // Delete function

  const handleDelete=async(id)=>{
    try {
      let answer=window.prompt("Are you sure you want to delete this Organisation?", "Sure");
      if(!answer)
      return;
      const {data}=await API.delete(`/admin/delete-org/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Layout>
     
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className>
          {data?.map((record) => (
            <tr key={record._id}>
              <td >{ record.organisationName }</td>

              <td>{record.email}</td>

              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td >
              <button className='btn btn-danger mb-2' onClick={()=>handleDelete(record._id)}><i className="fa-solid fa-trash-can"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>

   </>
  );
}

export default OrgList;
