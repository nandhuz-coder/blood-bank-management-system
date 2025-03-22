import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "../../components/shared/Form/Form";
import Spinner from "../../components/shared/Spinner";
import useAuthService from "../../services/authServices"; // ✅ Import the custom hook

const Login = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(state => state.auth);
  const errorRef = useRef(null);
  const { handleLogin } = useAuthService(); // ✅ Get function from hook

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error && typeof error === "string" && error !== errorRef.current) {
      toast.error(error);
      errorRef.current = error;
    }
  }, [error]);

  // ✅ Wrapper function to pass `navigate`
  const onLoginSubmit = (e, email, password, role) => {
    handleLogin(e, email, password, role, navigate);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="/assets/images/banner1.jpg" alt="login" />
          </div>
          <div className="col-md-4 form-container">
            {/* ✅ Pass onLoginSubmit instead of handleLogin */}
            <Form formTitle="Login Page" submitBtn="Login" formType="login" onSubmit={onLoginSubmit} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
