import React from "react";
import { Input } from "antd";
import { ErrorMessage } from "formik";

const PasswordInput = ({ text, name, formik, required = false }) => {
  return (
    <div className="mb-3">
      <label>
        {text}
        {required && <span className="text-danger"> *</span>}
      </label>

      <Input.Password
        className={`form-control Form-password ${
          formik.touched[name] && formik.errors[name]
            ? "is-invalid"
            : ""
        }`}
        {...formik.getFieldProps(name)}
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-danger"
      />
    </div>
  );
};

export default PasswordInput;
