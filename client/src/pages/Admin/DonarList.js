import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import moment from 'moment';
import API from '../../services/API';

const DonarList = () => {
  const [data, setData] = useState([]);
  const getDonors = async () => {
    try {
      const { data } = await API.get("/admin/donor-list");
      if (data?.success) {
        setData(data?.donorData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDonors();
  }, []);

  // Delete function

  const handleDelete=async(id)=>{
    try {
      let answer=window.prompt("Are you sure you want to delete this donor?", "Sure");
      if(!answer)
      return;
      const {data}=await API.delete(`/admin/delete-donor/${id}`);
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
              <td >{record.name || record.organisationName + "(ORG)"}</td>

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

export default DonarList;
