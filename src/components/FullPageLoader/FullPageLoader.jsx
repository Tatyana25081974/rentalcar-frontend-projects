import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "./FullPageLoader.module.css";

const FullPageLoader = () => {
  return (
    <div className={styles.overlay}>
      <SyncLoader color="#ffffff" />
    </div>
  );
};

export default FullPageLoader;
