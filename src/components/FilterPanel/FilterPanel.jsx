import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import Select from "react-select";

import { setFilters } from "../../redux/cars/slice";
import { fetchBrands } from "../../redux/brands/slice";
import { selectBrandsList } from "../../redux/brands/selectors";

import styles from "./FilterPanel.module.css";

const FormikSelect = ({ name, options, placeholder }) => {
  const { setFieldValue, values } = useFormikContext();

  const handleChange = (selectedOption) => {
    setFieldValue(name, selectedOption ? selectedOption.value : "");
  };

  const selectedValue =
    options.find((option) => option.value === values[name]) || null;

  return (
    <Select
      className={styles.reactSelectContainer}
      options={options}
      value={selectedValue}
      onChange={handleChange}
      placeholder={placeholder}
      isClearable
    />
  );
};

const FilterSchema = Yup.object().shape({
  brand: Yup.string(),
  rentalPrice: Yup.string(),
  minMileage: Yup.number().nullable().min(0, "Пробіг не може бути від’ємним"),
  maxMileage: Yup.number()
    .nullable()
    .min(
      Yup.ref("minMileage"),
      "'Максимальний пробіг' має бути більшим за 'мінімальний'"
    ),
});

const FilterPanelFormik = ({ onReset }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrandsList);

  useEffect(() => {
    if (brands.length === 0) {
      dispatch(fetchBrands());
    }
  }, [brands.length, dispatch]);

  const brandOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const priceOptions = [
    { value: "30", label: "$30" },
    { value: "40", label: "$40" },
    { value: "50", label: "$50" },
    { value: "60", label: "$60" },
    { value: "70", label: "$70" },
    { value: "80", label: "$80" },
  ];

  return (
    <Formik
      initialValues={{
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      }}
      validationSchema={FilterSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(setFilters(values));
        resetForm(); // Очищаємо форму після сабміту
        if (onReset) {
          onReset(); // Викликаємо скидання локальних стейтів в батьку
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.filterForm}>
          <label className={styles.filterLabel}>
            <span>Brand</span>
            <FormikSelect
              name="brand"
              options={brandOptions}
              placeholder="Choose a brand"
            />
            <ErrorMessage
              name="brand"
              component="div"
              className={styles.error}
            />
          </label>

          <label className={styles.filterLabel}>
            <span>Price/ 1 hour</span>
            <FormikSelect
              name="rentalPrice"
              options={priceOptions}
              placeholder="Choose a price"
            />
            <ErrorMessage
              name="rentalPrice"
              component="div"
              className={styles.error}
            />
          </label>

          <label className={styles.filterLabel}>
            <span>Сar mileage / km</span>
            <Field
              type="number"
              name="minMileage"
              placeholder="From"
              className={styles.inputField}
            />
            <ErrorMessage
              name="minMileage"
              component="div"
              className={styles.error}
            />
          </label>

          <label className={styles.filterLabel}>
            <span>Сar mileage / km</span>
            <Field
              type="number"
              name="maxMileage"
              placeholder="To"
              className={styles.inputField}
            />
            <ErrorMessage
              name="maxMileage"
              component="div"
              className={styles.error}
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterPanelFormik;
