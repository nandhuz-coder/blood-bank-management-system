import React from "react";

const InputType = ({
  labelfor,
  labelText,
  value,
  onChange,
  name,
  inputType,
}) => {
  return (
    <>
      <div className="mb-1">
        <label htmlFor={labelfor} className="form-label">
          {labelText}
        </label>
        <input
          className="form-control"
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputType;
