import React from "react";
import { Field, ErrorMessage } from "formik";

const Select = ({ text, name, options, required = false, placeholder = "Select an option" }) => {
  return (
    <div className="mb-3">
      <label>{text}{required && <span className="text-danger"> *</span>}</label>
      
      <Field
        as="select"
        name={name}
        className="form-control"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>

      <div className="text-danger">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Select;