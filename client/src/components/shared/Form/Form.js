import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import useAuthService from "../../../services/authServices"; // ✅ Import the hook

const Form = ({ formType, submitBtn, formTitle }) => {
  const navigate = useNavigate();
  const { handleLogin, handleRegister } = useAuthService(); // ✅ Get functions from hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [address, setAddress] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "login") {
      return handleLogin(e, email, password, role, navigate);
    } else if (formType === "register") {
      return handleRegister(
        e,
        { name, role, email, password, organisationName, hospitalName, address, website, phone },
        navigate
      );
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
                onChange={(e) => setRole(e.target.value)}
                checked={role === option}
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
            <InputType
              labelfor="forEmail"
              labelText="Email"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelfor="forPassword"
              labelText="Password"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        ) : (
          <>
            {(role === "admin" || role === "donor") && (
              <InputType
                labelfor="forName"
                labelText="Name"
                inputType="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {role === "organisation" && (
              <InputType
                labelfor="forOrganisationName"
                labelText="Organisation Name"
                inputType="text"
                name="organisationName"
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              />
            )}
            {role === "hospital" && (
              <InputType
                labelfor="forHospitalName"
                labelText="Hospital Name"
                inputType="text"
                name="hospitalName"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            )}
            <InputType
              labelfor="forEmail"
              labelText="Email"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelfor="forPassword"
              labelText="Password"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputType
              labelfor="forAddress"
              labelText="Address"
              inputType="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputType
              labelfor="forPhone"
              labelText="Phone"
              inputType="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <InputType
              labelfor="forWebsite"
              labelText="Website"
              inputType="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
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
