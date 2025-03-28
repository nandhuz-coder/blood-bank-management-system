import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../services/API";
import { toast } from "react-toastify";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // ✅ Wrap `getDonors` in `useCallback` to prevent re-creation
  const getDonors = useCallback(async () => {
    if (!user?._id) return; // Prevent API call if user is null/undefined
    try {
      const { data } = await API.get("/inventory/user/get-requests");
      if (data?.data) {
        setData(data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user?._id]);


  const postIntrested = async (data) => {
    await API.post("/inventory/user/intrested", {
      id: data
    }).then((res) => {
      if (res?.data?.success) {
        toast.success("Shown intrest in donating...");
        getDonors()
      }
    })
  }

  useEffect(() => {
    getDonors();
  }, [getDonors]); // ✅ Now it follows React Hook rules

  return (
    <Layout>
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Quantity</th>
              <th scope="col">Hospital Name</th>
              <th scope="col">Location</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Last donated</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.units}</td>
                <td>{record.hospitalId.hospitalName}</td>
                <td>{record.hospitalId.address}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                <td>{record.last ? moment(record.last).format("DD/MM/YYYY") : "Not donated yet"}</td>
                <td>
                  {record.last && moment(record.last).isAfter(moment().add(3, "months")) ? <>
                    {record.intrested === false ?
                      <button className="btn btn-primary btn-sm" onClick={() => postIntrested(record._id)}>
                        Interested
                      </button> : record.status === "Rejected" ?
                        <button className="btn btn-danger disabled btn-sm">
                          rejected
                        </button>
                        : <button className="btn btn-secondary disabled btn-sm">
                          requested
                        </button>
                    }
                  </> : <>
                    <span className="text-muted">
                      You can donate only after {moment(record.last).add(3, "months").format("DD/MM/YYYY")}
                    </span>
                  </>}
                  {/**
                  {record.intrested === false ?
                    <button className="btn btn-primary btn-sm" onClick={() => postIntrested(record._id)}>
                      Interested
                    </button> : record.status === "Rejected" ?
                      <button className="btn btn-danger disabled btn-sm">
                        rejected
                      </button>
                      : <button className="btn btn-secondary disabled btn-sm">
                        requested
                      </button>
                  }
                  */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donation;
