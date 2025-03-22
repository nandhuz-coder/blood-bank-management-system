import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import useAuthService from "../../../services/authServices"; // ✅ Import the hook

const Form = ({ formType, submitBtn, formTitle }) => {
  const navigate = useNavigate();
  const { handleLogin, handleRegister } = useAuthService();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "donor",
    name: "",
    organisationName: "",
    hospitalName: "",
    address: "",
    phone: "",
    website: "",
  });

  const [errors, setErrors] = useState({}); // ✅ Store validation errors

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (formType === "register") {
      if (formData.role === "admin" || formData.role === "donor") {
        if (!formData.name) newErrors.name = "Name is required.";
      }

      if (formData.role === "organisation" && !formData.organisationName) {
        newErrors.organisationName = "Organisation Name is required.";
      }

      if (formData.role === "hospital" && !formData.hospitalName) {
        newErrors.hospitalName = "Hospital Name is required.";
      }

      if (!formData.address) newErrors.address = "Address is required.";

      if (!formData.phone) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits.";
      }

      if (!formData.website) {
        newErrors.website = "Website is required.";
      } else if (!/^https?:\/\/[\w.-]+\.[a-z]{2,}.*$/i.test(formData.website)) {
        newErrors.website = "Invalid website URL (e.g., https://example.com).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ Returns `true` if no errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear validation error when user types
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (formType === "login") {
      handleLogin(e, formData.email, formData.password, formData.role, navigate);
    } else {
      handleRegister(e, formData, navigate);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">{formTitle}</h1>
        <hr />

        {/* Role Selection */}
        <div className="d-flex mb-3">
          {["donor", "admin", "organisation", "hospital"].map((option) => (
            <div key={option} className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id={`${option}Radio`}
                value={option}
                onChange={handleChange}
                checked={formData.role === option}
              />
              <label htmlFor={`${option}Radio`} className="form-check-label">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            </div>
          ))}
        </div>

        {/* Form Inputs */}
        {formType === "login" ? (
          <>
            <InputType labelFor="email" labelText="Email" inputType="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" />
            {errors.email && <p className="text-danger">{errors.email}</p>}

            <InputType labelFor="password" labelText="Password" inputType="password" name="password" value={formData.password} onChange={handleChange} autoComplete="current-password" />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </>
        ) : (
          <>
            {(formData.role === "admin" || formData.role === "donor") && (
              <>
                <InputType labelFor="name" labelText="Name" inputType="text" name="name" value={formData.name} onChange={handleChange} autoComplete="name" />
                {errors.name && <p className="text-danger">{errors.name}</p>}
              </>
            )}

            {formData.role === "organisation" && (
              <>
                <InputType labelFor="organisationName" labelText="Organisation Name" inputType="text" name="organisationName" value={formData.organisationName} onChange={handleChange} />
                {errors.organisationName && <p className="text-danger">{errors.organisationName}</p>}
              </>
            )}

            {formData.role === "hospital" && (
              <>
                <InputType labelFor="hospitalName" labelText="Hospital Name" inputType="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} />
                {errors.hospitalName && <p className="text-danger">{errors.hospitalName}</p>}
              </>
            )}

            <InputType labelFor="email" labelText="Email" inputType="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" />
            {errors.email && <p className="text-danger">{errors.email}</p>}

            <InputType labelFor="password" labelText="Password" inputType="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" />
            {errors.password && <p className="text-danger">{errors.password}</p>}

            <InputType labelFor="address" labelText="Address" inputType="text" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <p className="text-danger">{errors.address}</p>}

            <InputType labelFor="phone" labelText="Phone" inputType="tel" name="phone" value={formData.phone} onChange={handleChange} pattern="[0-9]{10}" placeholder="10-digit number" />
            {errors.phone && <p className="text-danger">{errors.phone}</p>}

            <InputType labelFor="website" labelText="Website" inputType="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://example.com" />
            {errors.website && <p className="text-danger">{errors.website}</p>}
          </>
        )}

        {/* Footer */}
        <div className="d-flex flex-row justify-content-between">
          <p>
            {formType === "login" ? (
              <>
                Not registered yet? <Link to="/register">Register Here!</Link>
              </>
            ) : (
              <>
                Already a user? <Link to="/login">Login Here!</Link>
              </>
            )}
          </p>
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
