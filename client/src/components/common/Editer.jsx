import React, { useMemo } from "react";
import JoditEditor from "jodit-react";
import { useField, ErrorMessage } from "formik";

const Editor = ({ text, name, required = false }) => {
  const [field, meta, helpers] = useField(name);

  // Configuration for Jodit
  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start typing...',
    height: 300
  }), []);

  return (
    <div className="mb-3">
      <label>{text}{required && <span className="text-danger"> *</span>}</label>
      
      <JoditEditor
        value={field.value || ""} // Formik value
        config={config}
        onBlur={(newContent) => helpers.setValue(newContent)} // Sync with Formik on blur
        onChange={(newContent) => {}} // Use onBlur for better performance
      />

      <div className="text-danger">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Editor;