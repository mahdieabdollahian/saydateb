import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./dashboard.module.scss";

const DashboardLoading = () => {
  return (
    <>
      <div className={styles.header}>
        <Skeleton
          classes={{ root: styles.dashboardRoot }}
          animation="wave"
          variant="rect"
          width="90%"
          height={120}
        />
        <Skeleton
          classes={{ root: styles.dashboardRoot }}
          animation="wave"
          variant="rect"
          width="90%"
          height={120}
        />
      </div>

      <div className={styles.list}>
        <Skeleton width="60%" variant="text" />
        <Skeleton width="90%" />
        <Skeleton width="90%" />
        <Skeleton width="90%" />
      </div>
      <div className={styles.list}>
        <Skeleton width="60%" variant="text" />
        <Skeleton width="90%" />
        <Skeleton width="90%" />
      </div>
    </>
  );
};

export default DashboardLoading;
