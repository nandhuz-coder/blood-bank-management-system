import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authServices";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [address, setAddress] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "login") return handleLogin(e, email, password,role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              organisationName,
              hospitalName,
              address,
              website,
              phone
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />

        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donorRadio"
              value={"donor"}
              onChange={(r) => {
                setRole(r.target.value);
              }}
              defaultChecked
            ></input>
            <label htmlFor="donorRadio" className="form-check-label">
              Donor
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(r) => {
                setRole(r.target.value);
              }}
            ></input>
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(r) => {
                setRole(r.target.value);
              }}
            ></input>
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(r) => {
                setRole(r.target.value);
              }}
            ></input>
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
        </div>
        {/* Switch Statement */}

        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelfor={"forEmail"}
                    labelText={"Email"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <InputType
                    labelfor={"forPassword"}
                    labelText={"Password"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(p) => {
                      setPassword(p.target.value);
                    }}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donor") && (
                    <InputType
                      labelfor={"forName"}
                      labelText={"Name"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(n) => {
                        setName(n.target.value);
                      }}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelfor={"forOrganisationName"}
                      labelText={"Organisation Name"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(o) => {
                        setOrganisationName(o.target.value);
                      }}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelfor={"forHospitalName"}
                      labelText={"Hospital Name"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(h) => {
                        setHospitalName(h.target.value);
                      }}
                    />
                  )}
                  <InputType
                    labelfor={"forEmail"}
                    labelText={"Email"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <InputType
                    labelfor={"forPassword"}
                    labelText={"Password"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(p) => {
                      setPassword(p.target.value);
                    }}
                  />
                  <InputType
                    labelfor={"forAddress"}
                    labelText={"Address"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(a) => {
                      setAddress(a.target.value);
                    }}
                  />
                  <InputType
                    labelfor={"forPhone"}
                    labelText={"Phone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(p) => {
                      setPhone(p.target.value);
                    }}
                  />

                  <InputType
                    labelfor={"forWebsite"}
                    labelText={"Website"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(w) => {
                      setWebsite(w.target.value);
                    }}
                  />
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not Registered yet? Register
              <Link to={"/register"}> Here!</Link>
            </p>
          ) : (
            <p>
              Already user ?<Link to={"/login"}> Login Please!</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
