import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/shared/Form/Form";
import useAuthService from "../../services/authServices"; // ✅ Import the custom hook

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuthService(); // ✅ Get function from hook

  // ✅ Wrapper function to pass `navigate`
  const onRegisterSubmit = (e, formData) => {
    handleRegister(e, formData, navigate);
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {/* ✅ Pass onRegisterSubmit instead of handleRegister */}
      <Form formTitle="Register Page" submitBtn="Register" formType="register" onSubmit={onRegisterSubmit} />
    </div>
  );
};

export default Register;
