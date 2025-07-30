import React from "react";
import styles from "./EmptyState.module.css";

const EmptyState = () => {
  return (
    <div className={styles.wrapper}>
      <img
        src="/images/CarNotFound.png"
        alt="No cars found"
        className={styles.image}
      />
      <p className={styles.text}>Авто не знайдено</p>
    </div>
  );
};

export default EmptyState;
