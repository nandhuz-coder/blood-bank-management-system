import React from "react";

const InputType = ({
  labelFor,
  labelText,
  value = "",
  onChange,
  name,
  inputType = "text",
  placeholder = "",
  required = false,
  min,
  max
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={labelFor} className="form-label">
        {labelText}
      </label>
      <input
        className="form-control"
        id={labelFor}  
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
      />
    </div>
  );
};

export default InputType;
