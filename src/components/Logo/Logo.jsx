import React from "react";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <img
      src="/header-logo.svg"
      alt="Rental Car Logo"
      width={104}
      height={16}
      className={styles.logo}
    />
  );
};

export default Logo;
