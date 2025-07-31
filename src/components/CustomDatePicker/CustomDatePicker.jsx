import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CustomDatePicker.module.css";

const CustomDatePicker = ({ selectedDate, onChange }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="dd.MM.yyyy"
      className={styles.input}
      calendarClassName={styles.calendar} // 🧶 кастомні стилі календаря
      dayClassName={() => styles.day} // 🧶 стилізація кожного дня
      wrapperClassName={styles.wrapper} // 🧶 обгортка поля
      popperPlacement="bottom-start"
      showPopperArrow={false}
      placeholderText="Booking date"
    />
  );
};

export default CustomDatePicker;
