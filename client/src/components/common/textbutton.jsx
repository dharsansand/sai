import React from "react";
import { Field, ErrorMessage } from "formik";

const Text = ({ text, name, placeholder ,required=false,type="text" }) => {
  return (
    <>
      <label>{text}{required && <span className="text-danger"> *</span>}</label>

      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="form-control"
      />
      <div className="text-danger">
        <ErrorMessage name={name} />
      </div>
    </>
  );
};

export default Text;
