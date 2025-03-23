import React, { useEffect } from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  // Show toast when there's an error
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  }, [error]);

  return (
    <>
      {/* Toast Container (Required for displaying toasts) */}
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="row g-0">
            {/* Left Side - Image */}
            <div className="col-md-8 form-banner">
              <img src="/assets/images/banner1.jpg" alt="Login Banner" />
            </div>

            {/* Right Side - Form */}
            <div className="col-md-4 form-container">
              <Form formTitle={"Login Page"} submitBtn={"Login"} formType={"login"} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
