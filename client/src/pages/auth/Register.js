import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { loading, error } = useSelector(state => state.auth);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      {loading ? (<Spinner />) : (<div className="row g-0">
        <div className="col-md-8 form-banner">
          <img src="./assets/images/banner2.jpg" alt="register" ></img>
        </div>
        <div className="col-md-4 form-container">
          <Form formTitle={"Register"} submitBtn={"Register"} formType={"register"} />
        </div>
      </div>)}
    </>
  );
};

export default Register;