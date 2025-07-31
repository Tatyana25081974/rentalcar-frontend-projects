import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import styles from "./CarBookingForm.module.css";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import FormikSelect from "../FormikSelect/FormikSelect";
import FormikDatePicker from "../FormikDatePicker/FormikDatePicker";

// 👉 Псевдозапит бронювання
const simulateBookingRequest = (values) => {
  return new Promise((resolve) => {
    console.log("Form values:", values);
    setTimeout(() => {
      resolve({ status: 200, message: "Booking successful" });
    }, 1500);
  });
};

// 👉 Обробник форми
const handleSubmit = async (values, { resetForm }) => {
  try {
    const response = await simulateBookingRequest(values);
    toast.success(response.message);
    resetForm();
  } catch {
    toast.error("Something went wrong. Please try again.");
  }
};

// 👉 Yup-схема валідації
const BookingSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  date: Yup.date().required("Date is required"),
  comment: Yup.string().max(300, "Comment must be 300 characters or less"),
});

const CarBookingForm = () => {
  return (
    <div className={styles.CarForm}>
      <h3 className={styles.formTitle}>Book your car now</h3>
      <p className={styles.formTextTitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{ name: "", email: "", date: "", comment: "" }}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.bookingForm}>
            <Field
              className={styles.input}
              type="text"
              name="name"
              placeholder="Name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />

            <Field
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />

            <FormikDatePicker name="date" />
            <ErrorMessage
              name="date"
              component="div"
              className={styles.error}
            />

            <Field
              as="textarea"
              className={styles.textarea}
              name="comment"
              placeholder="Comment"
              rows="4"
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={styles.error}
            />

            <button className={styles.submitBtn} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CarBookingForm;
