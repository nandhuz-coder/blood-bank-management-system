import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({}); // Store validation errors

  const { user } = useSelector((state) => state.auth);

  const validateForm = () => {
    let newErrors = {};

    if (!bloodGroup) newErrors.bloodGroup = "Please select a blood group.";

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!quantity || quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleModalSubmit = async () => {
    if (!validateForm()) return; // Prevent API call if validation fails

    try {
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity: parseInt(quantity),
      });

      if (data?.success) {
        toast.success("New Record Created");
        setBloodGroup("");
        setQuantity("");
        setEmail("");
        document.getElementById("modal-close-btn").click(); // Close modal
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="modal-close-btn"
              />
            </div>
            <div className="modal-body">
              {/* Inventory Type Selection */}
              <div className="d-flex mb-3">
                <label className="me-2">Blood Type:</label>
                {["in", "out"].map((type) => (
                  <div className="form-check ms-3" key={type}>
                    <input
                      type="radio"
                      name="inventoryType"
                      checked={inventoryType === type}
                      value={type}
                      onChange={(e) => setInventoryType(e.target.value)}
                      className="form-check-input"
                      id={`${type}-radio`}
                    />
                    <label htmlFor={`${type}-radio`} className="form-check-label">
                      {type.toUpperCase()}
                    </label>
                  </div>
                ))}
              </div>

              {/* Blood Group Selection */}
              <select
                className={`form-select ${errors.bloodGroup ? "is-invalid" : ""}`}
                value={bloodGroup}
                onChange={(e) => {
                  setBloodGroup(e.target.value);
                  setErrors((prev) => ({ ...prev, bloodGroup: "" })); // Clear error when user selects
                }}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                {["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && <p className="text-danger">{errors.bloodGroup}</p>}

              {/* Email Input */}
              <InputType
                labelText={inventoryType === "in" ? "Donor Email" : "Hospital Email"}
                labelFor="donorEmail"
                inputType="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" })); // Clear error
                }}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}

              {/* Quantity Input */}
              <InputType
                labelText="Quantity (ML)"
                labelFor="quantity"
                inputType="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setErrors((prev) => ({ ...prev, quantity: "" })); // Clear error
                }}
              />
              {errors.quantity && <p className="text-danger">{errors.quantity}</p>}
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
