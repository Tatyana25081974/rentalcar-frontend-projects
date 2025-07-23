import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src="/header-logo.svg"
        alt="Rental Car Logo"
        width={104}
        height={16}
        className={styles.logo}
        style={{ cursor: "pointer" }}
      />
    </Link>
  );
};

export default Logo;
