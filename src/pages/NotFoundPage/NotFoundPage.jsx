import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import NotFoundAnimation from "../../components/NotFoundAnimation/NotFoundAnimation";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <NotFoundAnimation />
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.text}>
        The page you are looking for does not exist.
      </p>
      <NavLink className={styles.link} to="/">
        Go to Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
