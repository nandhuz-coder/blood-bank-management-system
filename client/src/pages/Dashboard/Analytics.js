import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";


const Analytics = () => {
  const [data, setData] = useState([]);
  const colors = ["#A0BFE0", "#7895CB", "#F2EAD3", "#A2CDB0", "#FF8551", "#FFDEDE", "#A2FF86", "#E1ECC8"];
  const [inventoryData, setInventoryData] = useState([]);
  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lifrecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record, i) => (
          <div className="card m-4 p-1"
            key={i}
            style={{ width: "20rem", backgroundColor: `${colors[i]}` }}>
            <div className="card-body">
              <h1 className="card-title bg-light text-dark text-center">{record.bloodGroup}</h1>
              <p className="card-text">
                Total In: <b>{record.totalIn}</b> (ML)
              </p>
              <p className="card-text">
                Total Out: <b>{record.totalOut}</b> (ML)
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Total available:<b>{record.availableBlood}</b> (ML)
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-3">
        <h1 className="my-3">Recent Blood Transactions</h1>
        <table className="table  ">
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
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} (ML)</td>
                <td>{record.email}</td>
                <td>
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
