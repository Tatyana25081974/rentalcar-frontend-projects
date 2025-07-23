import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
          end
        >
          Home
        </NavLink>

        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
