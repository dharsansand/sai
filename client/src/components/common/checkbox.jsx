import { Field } from "formik";

const Checkinputbox = ({ name, label }) => (
  <div className="mb-3 form-check">
    <Field
      type="checkbox"
      name={name}
      className="form-check-input"
      id={name}
    />
    <label className="form-check-label" htmlFor={name}>
      {label}
    </label>
  </div>
);

export default Checkinputbox;
