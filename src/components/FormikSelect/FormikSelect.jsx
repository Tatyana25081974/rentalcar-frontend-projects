// src/components/FormikSelect/FormikSelect.jsx
import React from "react";
import { useField, useFormikContext } from "formik";
import Select from "react-select";

import styles from "./FormikSelect.module.css";

const FormikSelect = ({ name, options, placeholder }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);

  const selectedValue =
    options.find((option) => option.value === values[name]) || null;

  const handleChange = (selectedOption) => {
    setFieldValue(name, selectedOption ? selectedOption.value : "");
  };

  return (
    <div className={styles.reactSelectContainer}>
      <Select
        classNamePrefix="select"
        className={styles.select}
        options={options}
        value={selectedValue}
        onChange={handleChange}
        placeholder={placeholder}
        isClearable
        name={field.name}
      />
      {meta.touched && meta.error && (
        <div className={styles.error}>{meta.error}</div>
      )}
    </div>
  );
};

export default FormikSelect;
