import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./pageLoading.module.scss";

const PageLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.logo}>
        <div />
      </div>
      <CircularProgress size={50} className={styles.buttonProgress} />
    </div>
  );
};

export default PageLoading;
