// src/components/FormikDatePicker/FormikDatePicker.jsx

import React from "react";
import { useField, useFormikContext } from "formik";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";

const FormikDatePicker = ({ name }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <CustomDatePicker
      selectedDate={field.value}
      onChange={(date) => setFieldValue(name, date)}
    />
  );
};

export default FormikDatePicker;
