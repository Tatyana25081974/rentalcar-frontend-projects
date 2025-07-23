import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <img
        src="/images/banner.png"
        srcSet="/images/banner.png 1x, /images/banner@2x.png 2x"
        alt="Rental Car Banner"
        className={styles.image}
      />
      <div className={styles.textWrapper}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <NavLink to="/catalog" className={styles.button}>
          View Catalog
        </NavLink>
      </div>
    </section>
  );
};

export default Banner;
