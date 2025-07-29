import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { setFilters, resetFilters } from "../../redux/cars/slice";
import { fetchBrands } from "../../redux/brands/operations";
import { selectBrandsList } from "../../redux/brands/selectors";

import FormikSelect from "../FormikSelect/FormikSelect"; // імпорт кастомного селекта
import styles from "./FilterPanel.module.css";

// Схема валідації
const FilterSchema = Yup.object().shape({
  brand: Yup.string(),
  rentalPrice: Yup.string(),
  minMileage: Yup.number().nullable().min(0, "Пробіг не може бути від’ємним"),
  maxMileage: Yup.number()
    .nullable()
    .min(Yup.ref("minMileage"), "Максимальний пробіг має бути більшим"),
});

const FilterPanelFormik = ({ onReset }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrandsList);
  const filters = useSelector((state) => state.cars.filters);

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
      initialValues={filters}
      enableReinitialize
      validationSchema={FilterSchema}
      onSubmit={(values) => {
        dispatch(setFilters(values));
        if (onReset) onReset();
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form className={styles.filterForm}>
          <label className={styles.filterLabel}>
            <span>Brand</span>
            <FormikSelect
              name="brand"
              options={brandOptions}
              placeholder="Choose a brand"
            />
          </label>

          <label className={styles.filterLabel}>
            <span>Price / 1 hour</span>
            <FormikSelect
              name="rentalPrice"
              options={priceOptions}
              placeholder="Choose a price"
            />
          </label>

          <label className={styles.filterLabel}>
            <span>Car mileage / km</span>
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
            <span>Car mileage / km</span>
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

          <button
            type="button"
            className={styles.resetButton}
            onClick={() => {
              dispatch(resetFilters());
              resetForm();
              if (onReset) onReset();
            }}
          >
            Reset filters
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterPanelFormik;
